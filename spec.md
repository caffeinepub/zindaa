# Zindaa

## Current State
The app has 5 learning modules (Morning Routine, School Skills, Play & Social Skills, Shopping Practice, Road Safety) each with steps shown in a modal dialog. The backend is an empty Motoko actor. There is no progress tracking or badge system.

## Requested Changes (Diff)

### Add
- Backend: store completed steps per module per user (anonymous principal), and earned badges
- Each step in the module modal gets a large checkmark button children can tap to mark complete
- Visual progress bar inside each module modal showing X/total steps done
- Badge awarded (with celebration animation) when all steps in a module are completed
- Milestone badges: "3 Modules Done" and "All Star" (all 5 modules)
- "My Badges" section on the main page showing earned badges with colorful icons
- Progress ring on each module card showing % completion

### Modify
- Module modal: add step checkboxes and progress bar
- Module cards on homepage: show a circular progress ring overlay
- Nav: add "My Badges" link

### Remove
- Nothing removed

## Implementation Plan
1. Backend: add `markStepDone(moduleId: Text, stepIndex: Nat)`, `getProgress(): [ModuleProgress]`, `getEarnedBadges(): [Badge]` - stored per anonymous caller principal
2. Frontend hook `useProgress` to load/save progress via backend actor
3. Module modal: replace static step list with interactive checkboxes; add progress bar
4. Module cards: add circular progress indicator
5. New `MyBadges` section: display earned module badges + milestone badges with animations
6. Badge celebration modal/toast on completion
