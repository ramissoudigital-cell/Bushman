# BUSHMAN Immersive Art Museum - Design Guidelines

## Design Approach

**Aesthetic Direction:** Modern glassmorphism with dark, immersive atmosphere inspired by premium digital art platforms (Behance, Artstation) combined with luxury ticketing experiences (Lincoln Center, MoMA).

**Core Principle:** Create depth through layered translucent surfaces, strategic blur effects, and glowing sky blue accents that evoke digital art immersion.

## Typography System

**Font Selection (Google Fonts):**
- Primary: "Space Grotesk" - Modern, geometric headings
- Secondary: "Inter" - Clean, readable body text

**Hierarchy:**
- Hero Titles: text-6xl md:text-7xl lg:text-8xl, font-bold, tracking-tight
- Section Headers: text-4xl md:text-5xl, font-semibold
- Subheadings: text-xl md:text-2xl, font-medium
- Body: text-base md:text-lg, leading-relaxed
- Captions: text-sm, tracking-wide, uppercase

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 24, 32
- Container padding: px-6 md:px-12 lg:px-16
- Section spacing: py-24 md:py-32
- Component gaps: gap-6 md:gap-8
- Card padding: p-6 md:p-8

**Grid Structure:**
- Max-width container: max-w-7xl mx-auto
- Gallery grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Feature sections: grid-cols-1 lg:grid-cols-2

## Glassmorphism Implementation

**Glass Card Styling:**
- Background: Semi-transparent dark with backdrop-blur-xl
- Borders: 1px border with reduced opacity
- Rounded corners: rounded-2xl to rounded-3xl
- Shadow: Subtle dark shadows with colored glow effects (sky blue)

**Layering Strategy:**
- Background layer: Deep gradient overlays
- Mid layer: Frosted glass cards
- Foreground: Crisp white/sky blue text and icons

## Component Library

### Navigation
Full-width glassmorphic header with backdrop-blur, sticky positioning. Logo left, menu center (Desktop: flex row, Mobile: hamburger), CTA button right with blurred background.

### Hero Section (Homepage)
Full viewport (min-h-screen) with large background image showing immersive art installation. Glassmorphic overlay card centered containing: museum name (massive typography), tagline, dual CTAs (primary: "Réserver", secondary: "Explorer"). Buttons have blurred backgrounds with sky blue accent glow.

### Exhibition Cards (Gallery)
3-column grid (responsive) with image thumbnails. Each card: glassmorphic frame, exhibition image, title overlay with blur effect, hover state lifts card with enhanced glow.

### Ticketing Interface
Split layout: Left - ticket selection cards with glassmorphic styling, quantity selectors, date/time picker. Right - sticky summary panel with frosted glass effect, total calculation, checkout button with sky blue glow.

### Information Sections
Alternating 2-column layouts mixing text blocks with floating glassmorphic info cards. Include: museum hours, location map (embedded), visitor guidelines, accessibility info.

### Footer
Multi-column (4 columns desktop, stacked mobile) glassmorphic footer: Navigation links, contact info, social media icons, newsletter signup with frosted input field.

## Iconography

**Library:** Heroicons (outline style for consistency)
- Navigation: menu, close, chevron-down
- Features: ticket, calendar, clock, location-marker
- Social: brand icons as needed

## Images Section

**Hero Image (Homepage):**
Large, atmospheric photo of an immersive digital art installation (projection mapping, LED displays, or interactive light art). Dark environment with vibrant colors. Positioned: full background with gradient overlay transitioning from transparent to dark at bottom.

**Gallery Images:**
12-15 thumbnail images of various exhibitions:
- Contemporary digital art installations
- Light sculptures and projections
- Interactive art pieces
- Museum interior shots
Mix of portrait and landscape orientations showing diversity of exhibits.

**Ticketing Page:**
Background: Subtle abstract art pattern (blurred, low opacity)

**About/Info Sections:**
2-3 architectural shots of museum spaces, treated with dark overlays to maintain consistency.

All images should be high-quality, professionally shot, emphasizing the immersive, modern nature of the museum.

## Special Effects

**Glow Treatment:**
Sky blue glow (box-shadow with sky blue at low opacity) on: Primary buttons, active navigation items, focused form inputs, featured exhibition cards.

**Blur Hierarchy:**
- Navigation: backdrop-blur-md
- Cards: backdrop-blur-xl
- Modals/overlays: backdrop-blur-2xl
- Button backgrounds on images: backdrop-blur-lg

**Transitions:**
Smooth transitions (300-400ms) on hover states for cards and buttons. Minimal animation elsewhere to maintain sophisticated atmosphere.