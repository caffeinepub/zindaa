import { useCallback, useEffect, useRef, useState } from "react";
import type { Badge } from "../backend.d";
import { useActor } from "./useActor";

export function useProgress() {
  const { actor, isFetching } = useActor();
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const prevBadgesRef = useRef<Set<string>>(new Set());
  const [newlyEarnedBadge, setNewlyEarnedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    let mounted = true;
    setIsLoading(true);
    actor
      .getProgress()
      .then((progress) => {
        if (!mounted) return;
        const steps = new Set<string>();
        for (const s of progress.steps) {
          if (s.completed) {
            steps.add(`${Number(s.moduleId)}-${Number(s.stepNumber)}`);
          }
        }
        setCompletedSteps(steps);
        setEarnedBadges(progress.badges);
        const earned = progress.badges.filter((b) => b.earned);
        prevBadgesRef.current = new Set(earned.map((b) => b.name));
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [actor, isFetching]);

  const markDone = useCallback(
    async (moduleId: number, stepIndex: number) => {
      if (!actor) return;
      const key = `${moduleId}-${stepIndex}`;
      if (completedSteps.has(key)) return;

      // Optimistic update
      setCompletedSteps((prev) => new Set([...prev, key]));

      try {
        await actor.markStepComplete(BigInt(moduleId), BigInt(stepIndex));
        // Refresh badges
        const progress = await actor.getProgress();
        const updatedBadges = progress.badges;
        setEarnedBadges(updatedBadges);

        // Detect newly earned badge
        for (const badge of updatedBadges) {
          if (badge.earned && !prevBadgesRef.current.has(badge.name)) {
            setNewlyEarnedBadge(badge);
            prevBadgesRef.current.add(badge.name);
          }
        }

        // Sync completed steps
        const steps = new Set<string>();
        for (const s of progress.steps) {
          if (s.completed) {
            steps.add(`${Number(s.moduleId)}-${Number(s.stepNumber)}`);
          }
        }
        setCompletedSteps(steps);
      } catch {
        // revert optimistic
        setCompletedSteps((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      }
    },
    [actor, completedSteps],
  );

  const clearNewBadge = useCallback(() => setNewlyEarnedBadge(null), []);

  return {
    completedSteps,
    earnedBadges,
    markDone,
    isLoading,
    newlyEarnedBadge,
    clearNewBadge,
  };
}
