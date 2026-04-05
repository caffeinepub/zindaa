import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Step = {
    moduleId : Nat;
    stepNumber : Nat;
    completed : Bool;
  };

  type Badge = {
    name : Text;
    description : Text;
    earned : Bool;
  };

  type UserProgress = {
    steps : [Step];
    badges : [Badge];
  };

  let userProgressMap = Map.empty<Principal, UserProgress>();

  func getOrCreateProgress(userId : Principal) : UserProgress {
    switch (userProgressMap.get(userId)) {
      case (?progress) { progress };
      case (null) {
        let initialSteps = Array.tabulate(25, func(i) { { moduleId = i / 5; stepNumber = i % 5; completed = false } });
        let initialBadges = [
          { name = "Module 1 Complete"; description = "Complete all steps in Module 1"; earned = false },
          { name = "Module 2 Complete"; description = "Complete all steps in Module 2"; earned = false },
          { name = "Module 3 Complete"; description = "Complete all steps in Module 3"; earned = false },
          { name = "Module 4 Complete"; description = "Complete all steps in Module 4"; earned = false },
          { name = "Module 5 Complete"; description = "Complete all steps in Module 5"; earned = false },
          { name = "Milestone 3"; description = "Complete 3 modules"; earned = false },
          { name = "Milestone 5"; description = "Complete all 5 modules"; earned = false },
        ];
        { steps = initialSteps; badges = initialBadges };
      };
    };
  };

  public shared ({ caller }) func markStepComplete(moduleId : Nat, stepNumber : Nat) : async () {
    let progress = getOrCreateProgress(caller);
    let updatedSteps = progress.steps.map(
      func(step) {
        if (step.moduleId == moduleId and step.stepNumber == stepNumber) {
          { step with completed = true };
        } else {
          step;
        };
      }
    );

    var updatedBadges = progress.badges;
    if (Array.tabulate<Bool>(5, func(i) { updatedSteps[(moduleId * 5) + i].completed }).foldLeft(true, func(acc, curr) { acc and curr })) {
      updatedBadges := progress.badges.map(
        func(badge) {
          if (badge.name == ("Module " # moduleId.toText())) {
            { badge with earned = true };
          } else {
            badge;
          };
        }
      );
    };

    let earnedModules = Array.tabulate(5, func(i) {
      Array.tabulate(5, func(j) { updatedSteps[(i * 5) + j].completed }).foldLeft(true, func(acc, curr) { acc and curr });
    });

    let completedCount = earnedModules.foldLeft(0, func(acc, completed) { if (completed) { acc + 1 } else { acc } });

    if (completedCount >= 3) {
      updatedBadges := updatedBadges.map(
        func(badge) {
          if (badge.name == "Milestone 3") {
            { badge with earned = true };
          } else {
            badge;
          };
        }
      );
    };

    if (completedCount == 5) {
      updatedBadges := updatedBadges.map(
        func(badge) {
          if (badge.name == "Milestone 5") {
            { badge with earned = true };
          } else {
            badge;
          };
        }
      );
    };

    let newProgress = {
      steps = updatedSteps;
      badges = updatedBadges;
    };

    userProgressMap.add(caller, newProgress);
  };

  public query ({ caller }) func getProgress() : async UserProgress {
    getOrCreateProgress(caller);
  };

  public query ({ caller }) func getBadges() : async [Badge] {
    getOrCreateProgress(caller).badges;
  };
};
