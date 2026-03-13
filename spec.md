# Zindaa

## Current State
The site has 11 sections: hero, visual learning modules (5 cards), age-based learning selector (4 groups), VR experience highlights, parent/therapist dashboard mockup, subscription plans (3 cards), impact section, contact form connected to backend. Activity detail pages for each module exist. Previous visual design refinement pass was done.

## Requested Changes (Diff)

### Add
- Founder section: "Meet the Founder" with Shruti More's name, backstory, motivation, and vision
- VR Learning Video Gallery section (section 9): visual gallery with 5 modules (morning routine, kitchen learning, classroom interaction, shopping practice, road safety training), each with a video preview placeholder and short description
- Ensure all 10 sections from the spec are present and complete

### Modify
- Hero section: large illustration of child with VR headset, title "Zindaa – Learning Life Skills Through Play", two buttons: Start Learning + Watch Demo
- Learning modules section: ensure all 5 cards (Morning Routine, School Skills, Play & Social Skills, Shopping Practice, Road Safety) have large colorful icons and link to detail pages
- Age-based learning: 4 groups (3–5, 6–8, 9–12, 13+) with colorful character illustrations and descriptive labels
- VR Experience section: 5 activities with screenshot placeholders and short captions
- Dashboard section: visual mockups of progress charts, learning reports, activity tracking; explain how parents/therapists can monitor and assign activities
- Subscription plans: 3 cards (Free Family, School, Therapy Pro) with feature icons
- Impact section: 4 benefit icons (independence, social skills, real-life learning, confidence)
- Contact section: icons for schools, therapists, NGOs, researchers
- Overall design: bright child-friendly palette, large icons, minimal text, animated transitions

### Remove
- Nothing to remove

## Implementation Plan
1. Add FounderSection component with Shruti More's profile, mission text, and visual portrait placeholder
2. Add VRVideoGallery component with 5 module cards, each showing a video preview (YouTube embed placeholder) and caption
3. Ensure hero has correct title/buttons and an illustration image
4. Polish all existing sections to match the visual spec (large icons, color, minimal text)
5. Wire all sections in App.tsx in correct order: Hero → Modules → AgeSelector → VRExperience → Dashboard → Plans → Impact → Founder → VRGallery → Contact
6. Ensure mobile responsiveness throughout
