# Zindaa

## Current State
Single-page React app with 10 sections: Hero, Learning Modules (5 cards), Age-Based Learning selector, VR Experience, Dashboard Preview, Impact Stats, Subscription Plans, Partners, Contact Form, and Footer. All content is on one scrollable page. Module cards have a "Start" button that does nothing.

## Requested Changes (Diff)

### Add
- **Activity Detail Pages** for each of the 5 learning modules (Morning Routine, School Skills, Play & Social, Shopping Practice, Road Safety). Each page should include:
  - Large emoji/illustration header
  - Module title and short description
  - Step-by-step visual activity list (4-6 steps, each with emoji, step number, title, description)
  - Skill badges earned for completing the module
  - A "Back to Modules" button and a "Start Activity" CTA
  - Child-friendly, colorful, accessible design matching site style
- **Page routing** using React state (no router dependency needed — use conditional rendering with a `currentPage` state)

### Modify
- Module cards' "Start" buttons should now navigate to the corresponding activity detail page
- VR activity cards' "Try Demo" buttons should link to a VR demo page or show a coming-soon modal
- Overall visual polish: more vivid gradients, larger emoji illustrations, smoother animations, better card hover states, improved spacing and typography hierarchy
- Hero section: add a subtle animated gradient background and improve the illustration area
- Section headings: increase visual weight and add decorative underline/accent

### Remove
- Nothing removed

## Implementation Plan
1. Add `currentPage` state to App.tsx (`'home' | 'module-morning' | 'module-school' | 'module-play' | 'module-shopping' | 'module-road'`)
2. Create activity data for each module: steps array with emoji, title, description; skill badges
3. Build `ActivityPage` component rendered when a module page is active
4. Wire module card buttons to set the page state
5. Add "Back" button in ActivityPage to return to `'home'` and scroll to modules section
6. Polish: improve gradients, add glow/shadow effects on cards, refine hero section, add micro-animations
7. Validate and build
