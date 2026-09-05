@AGENTS.md
# TASK: Transform My Existing Profile Website Into a Premium, Immersive Portfolio

Act as a **world-class UI/UX designer, creative developer, motion designer, and frontend architect**.

I already have a working personal profile/portfolio website.

The content, information, projects, certificates, experience, gallery, skills, and contact information are already implemented.

I DO NOT want you to rebuild my website from scratch or replace my existing information.

I want you to **transform the existing website into a highly polished, modern, immersive, professional portfolio experience** while keeping the existing content.

The goal is:

> When someone visits my portfolio, the website should immediately feel carefully designed, technically impressive, smooth, memorable, and professional.

It should feel like a portfolio made by a strong UI/UX-focused frontend developer, not a generic template.

---

# CURRENT WEBSITE SECTIONS

The existing website contains:

* Home
* About
* Skills
* Projects
* Experience
* Gallery
* Certificates
* Contact

The current information in these sections is already useful.

**Preserve the content unless there is a clear UX reason to reorganize how it is presented.**

Your main responsibility is to improve:

* UI
* UX
* visual hierarchy
* layout
* typography
* spacing
* responsive behavior
* motion
* transitions
* section composition
* interactions
* navigation
* storytelling
* visual consistency
* overall polish

---

# FIRST: INSPECT THE EXISTING PROJECT

Before modifying anything:

1. Inspect the complete project structure.
2. Identify the framework and libraries currently being used.
3. Inspect:

   * pages
   * components
   * layouts
   * styles
   * assets
   * images
   * videos
   * fonts
   * icons
   * animations
   * existing responsive logic
4. Understand how the current navigation works.
5. Understand how every section is currently implemented.
6. Check whether an animation library already exists.
7. Check whether Tailwind or another styling system is being used.
8. Check the existing video files inside:

`app/assets/videos`

9. Inspect the existing videos and determine which videos naturally fit which sections.

Do not introduce unnecessary libraries if the project already has suitable tools.

---

# DESIGN DIRECTION

I want the website to feel:

* Modern
* Premium
* Professional
* Creative
* Minimal but visually interesting
* Technically sophisticated
* Smooth
* Immersive
* Personal
* Confident
* Clean
* Responsive

Avoid making it look like:

* a generic developer template
* a corporate dashboard
* an over-designed gaming website
* a collection of random animations
* a template with excessive gradients
* a website where every section looks identical

The design should have a clear visual identity.

---

# IMPORTANT DESIGN PRINCIPLE

Do NOT try to impress the visitor by putting animations everywhere.

Instead:

**Create moments.**

Some sections should be calm.

Some sections should have stronger motion.

Some sections should have subtle interactions.

Some sections should feel cinematic.

The animation should support the content.

The website should feel smooth rather than busy.

---

# HERO / HOME SECTION

The Home section should create a strong first impression.

Redesign it as a premium hero experience.

Consider:

* strong typography
* clear personal identity
* concise introduction
* visually interesting composition
* subtle background movement
* carefully placed CTA buttons
* social/profile links where appropriate
* smooth entrance animation
* depth and layering

Use one of the existing videos from:

`app/assets/videos`

as a background if an appropriate video exists.

The video should:

* be relevant to the content
* play silently
* loop
* cover the background properly
* have a suitable overlay
* not make text difficult to read
* not cause excessive loading
* respect reduced-motion preferences

Do not simply put a video behind everything.

Use it intentionally.

---

# NAVIGATION

Create a professional navigation experience.

The navigation should feel integrated into the design.

Consider:

* transparent/blurred navigation initially
* navigation transformation while scrolling
* active section indicator
* smooth scrolling
* subtle hover interactions
* responsive mobile navigation
* clean mobile menu animation

The navigation should clearly communicate where the visitor currently is.

For desktop, consider a refined sticky navigation.

For mobile, create a clean and touch-friendly navigation experience.

---

# SCROLL EXPERIENCE

The website should have a **smooth, intentional scrolling experience**.

Implement:

* smooth anchor scrolling
* scroll-triggered animations
* subtle parallax where appropriate
* section reveal animations
* progressive content appearance
* subtle movement of background elements
* elegant transitions between sections

Do NOT make scrolling excessively slow.

The user should still feel in control.

If using smooth scrolling, make it natural rather than artificially sluggish.

---

# SECTION TRANSITIONS

The sections should not feel like:

`Section → blank space → Section → blank space`

Instead, create a visual story.

Use:

* overlapping elements
* subtle background changes
* typography transitions
* visual separators
* gradient/lighting transitions
* video transitions
* cards
* horizontal compositions
* controlled spacing

The visitor should naturally understand that they are moving through different chapters of my profile.

---

# ABOUT SECTION

Improve the About section so it feels personal rather than just a block of text.

Consider:

* strong introduction
* profile image if already available
* animated typography
* timeline-style information
* subtle visual elements
* statistics/highlights if the existing content supports them

Do not invent achievements or information.

Only use information that already exists in the project.

---

# SKILLS SECTION

Do not display skills as a boring list of boxes.

Create a more engaging skill presentation.

Depending on the existing information, consider:

* categorized skills
* interactive skill cards
* animated progress/indicators only where meaningful
* technology icons
* hover interactions
* subtle motion
* visual grouping

The section should communicate competence without feeling like a résumé dump.

---

# PROJECTS SECTION

This should be one of the strongest sections.

Projects should feel like **case studies**, not just cards.

Create strong visual hierarchy.

Consider:

* large project previews
* image/video previews
* project category
* technology used
* short description
* role/contribution
* interactive hover states
* project details
* smooth transitions
* expandable/project detail interaction if appropriate

If project images or videos already exist, use them.

Do not invent project screenshots.

Make the project section visually memorable.

---

# EXPERIENCE SECTION

Transform the Experience section into a professional story.

Consider:

* vertical timeline
* animated timeline progression
* role
* organization
* duration
* responsibilities
* important achievements already present in the data

The timeline should animate naturally as the visitor scrolls.

Do not exaggerate or invent experience.

---

# GALLERY SECTION

Make the Gallery feel like a curated visual collection.

Avoid a simple uniform grid if the existing content allows something more interesting.

Consider:

* masonry-style arrangement
* varied image sizes
* hover previews
* lightbox
* smooth image transitions
* subtle scale effects
* category filtering if appropriate
* keyboard accessibility

The layout must remain responsive.

---

# CERTIFICATES SECTION

Make certificates look trustworthy and professional.

Consider:

* elegant certificate cards
* institution
* certificate title
* date
* credential information if available
* subtle hover interaction
* modal/preview
* clean document presentation

Avoid excessive animation here.

This section should feel credible.

---

# CONTACT SECTION

The Contact section should feel like a natural conclusion to the website.

Create a strong closing experience.

Consider:

* clear invitation to contact
* contact form if already available
* email
* phone/social links if already provided
* subtle background visual
* strong typography
* polished CTA

If an existing video is appropriate, consider using it as a subtle background.

---

# VIDEO SYSTEM

There are videos inside:

`app/assets/videos`

You MUST inspect these videos before deciding where to use them.

Do not randomly assign videos.

For each video, determine:

* subject
* visual mood
* orientation
* duration
* quality
* relevance
* whether it works as a background

Then assign videos where they make sense.

Possible uses:

* Hero background
* Project background
* About visual
* Experience transition
* Gallery section
* Contact closing section

Use only videos that actually support the content.

---

# VIDEO PERFORMANCE

Video backgrounds should not destroy performance.

Implement sensible:

* lazy loading where appropriate
* preload strategy
* poster images where appropriate
* muted playback
* looping
* autoplay only where appropriate
* mobile considerations
* responsive sizing
* fallback background
* reduced-motion handling

Do not load every video on the page immediately.

---

# MOTION DESIGN

I want **high-quality motion design**, not random animations.

Use motion for:

### Page entrance

* staggered typography
* subtle fade/slide
* controlled scale
* visual reveal

### Scroll

* reveal content as it enters viewport
* subtle parallax
* progressive movement
* section transitions

### Hover

* card elevation
* image zoom
* text movement
* icon movement
* border/lighting effects

### Navigation

* active indicator
* menu transition
* scroll-state transition

### Project interaction

* image movement
* content reveal
* cursor interaction where appropriate

Keep animations elegant.

---

# ANIMATION TIMING

Avoid everything happening immediately.

Use different timing for different elements.

For example:

* small UI elements: quick
* content reveals: moderate
* hero transitions: slightly slower
* major visual transitions: cinematic but controlled

Do not make animations so slow that the user has to wait for content.

---

# MICRO-INTERACTIONS

Add small details that make the site feel polished.

Examples:

* magnetic/subtle CTA interaction
* button hover movement
* icon movement
* image scale
* animated underline
* cursor-following effects where appropriate
* active navigation indicator
* card tilt only if it genuinely improves the design

Do NOT overuse cursor effects.

They should never interfere with usability.

---

# COLOR THEME

Create a cohesive modern color system.

Do not randomly use many colors.

Choose:

* primary color
* secondary/accent color
* background color
* surface color
* text color
* muted text color
* border color

The theme should complement the existing profile content.

Aim for a sophisticated developer/creative portfolio aesthetic.

The colors should maintain:

* strong contrast
* accessibility
* readability
* visual hierarchy

---

# TYPOGRAPHY

Typography should feel premium.

Improve:

* heading hierarchy
* font sizes
* line height
* letter spacing
* paragraph width
* section titles
* responsive typography

Use large typography strategically.

Do not make everything huge.

Create a clear visual hierarchy between:

* hero
* section heading
* subheading
* body
* metadata
* CTA

---

# RESPONSIVE DESIGN

This is extremely important.

Do NOT design desktop first and simply shrink it for mobile.

Design intentionally for:

* large desktop
* laptop
* tablet
* mobile

Check:

* navigation
* typography
* video backgrounds
* grids
* cards
* timelines
* gallery
* modals
* buttons
* spacing
* touch targets

Nothing should:

* overflow horizontally
* become unreadable
* overlap incorrectly
* require awkward scrolling
* become unusable on small screens

---

# MOBILE EXPERIENCE

The mobile version should feel like a deliberately designed experience.

Not:

`Desktop website squeezed into mobile.`

Use:

* appropriate spacing
* simplified layouts
* touch-friendly controls
* optimized animations
* appropriate video behavior
* clean navigation
* readable typography

Reduce complex animations on low-powered/mobile devices when necessary.

---

# ACCESSIBILITY

Maintain good accessibility.

Ensure:

* keyboard navigation
* visible focus states
* semantic HTML
* appropriate ARIA labels
* sufficient color contrast
* alt text
* accessible buttons
* accessible mobile menu
* reduced motion support

Respect:

`prefers-reduced-motion`

When reduced motion is enabled, significantly reduce or disable non-essential animation.

---

# PERFORMANCE

The site must remain fast.

After implementing the visual improvements:

Check:

* unnecessary re-renders
* oversized images
* video loading
* animation performance
* layout shifts
* excessive JavaScript
* unnecessary dependencies

Prefer GPU-friendly animations such as:

* transform
* opacity

Avoid expensive animations that continuously trigger layout recalculation.

---

# COMPONENT ARCHITECTURE

Keep the existing component architecture where possible.

If components have become too large, refactor them into logical reusable components.

For example:

* Navbar
* SectionHeader
* AnimatedText
* Reveal
* ProjectCard
* ExperienceTimeline
* CertificateCard
* GalleryItem
* VideoBackground
* CTAButton

Do not create dozens of tiny components without reason.

Keep the architecture maintainable.

---

# DO NOT CHANGE MY CONTENT

This is important.

Do not:

* invent projects
* invent experience
* invent certificates
* invent skills
* invent clients
* invent achievements
* invent job titles
* invent statistics

Use the information already available in the project.

If content is weak in a particular section, improve the presentation rather than fabricating information.

---

# VISUAL STORYTELLING

Think of the website as a journey:

### 01

Who am I?

### 02

What can I do?

### 03

What have I built?

### 04

What experience do I have?

### 05

What else have I created?

### 06

What have I learned?

### 07

How can someone contact me?

Each section should feel like a continuation of the previous section.

---

# IMPORTANT: DO NOT OVERDESIGN

I want the website to feel impressive because of:

* good design
* excellent spacing
* strong typography
* meaningful animation
* thoughtful interaction
* visual hierarchy
* responsive behavior
* attention to detail

NOT because of:

* excessive gradients
* excessive glow
* random particles
* unnecessary 3D
* constant movement
* dozens of floating objects
* animation on every element

If an animation does not improve the experience, remove it.

---

# CURSOR / INTERACTION DESIGN

If appropriate for desktop, add subtle cursor-based interactions.

Examples:

* cursor-following highlight
* magnetic buttons
* project image movement
* subtle hover lighting

But:

* disable or simplify these on touch devices
* never block clicking
* never create distracting motion
* never make text difficult to read

---

# LOADING EXPERIENCE

Create a polished initial loading experience if the site architecture supports it.

However, do NOT create a long loading screen just for visual effect.

The visitor should see useful content as quickly as possible.

---

# SCROLL PROGRESS

Consider adding a subtle scroll progress indicator if it fits the design.

It should help the visitor understand their position in the portfolio without becoming distracting.

---

# FINAL VISUAL QUALITY CHECK

After implementation, inspect the entire website as if you were a visitor seeing it for the first time.

Ask:

1. Does the Hero immediately communicate who I am?
2. Does the website feel unique?
3. Does each section have a clear purpose?
4. Is the visual hierarchy strong?
5. Are the animations smooth?
6. Are the animations helping the content?
7. Are the videos used intelligently?
8. Does the website feel professional?
9. Does mobile feel equally polished?
10. Are there any awkward spacing issues?
11. Are there any visual inconsistencies?
12. Are there any overflowing elements?
13. Are any animations distracting?
14. Does the site feel too generic?
15. Does the final section leave a strong impression?

Fix anything you identify.

---

# IMPLEMENTATION WORKFLOW

Follow this process:

## PHASE 1

Inspect the entire project.

## PHASE 2

Analyze the current design and identify weaknesses.

## PHASE 3

Inspect all available assets, especially:

`app/assets/videos`

## PHASE 4

Create a design system for:

* colors
* typography
* spacing
* cards
* buttons
* borders
* shadows
* motion

## PHASE 5

Redesign the global layout/navigation.

## PHASE 6

Redesign each section.

## PHASE 7

Implement motion and interactions.

## PHASE 8

Implement responsive behavior.

## PHASE 9

Optimize videos/assets/performance.

## PHASE 10

Test the entire website.

---

# IMPORTANT CODING RULE

Do not blindly replace the existing project.

Before modifying a file, understand:

* what it does
* what depends on it
* what data it receives
* whether it is reused elsewhere

Make changes incrementally.

Keep the website functional throughout the process.

---

# FINAL EXPECTATION

I want the final result to feel like:

**A professional personal portfolio created by a strong UI/UX engineer who cares deeply about frontend quality, interaction design, motion, responsiveness, and visual storytelling.**

The visitor should not just scroll through information.

They should feel like they are **experiencing the portfolio**.

Make the experience memorable, but keep it professional.

Most importantly:

**Do not sacrifice usability for visual effects.**

The content is already there.

Your job is to make the existing content look and feel exceptional.
