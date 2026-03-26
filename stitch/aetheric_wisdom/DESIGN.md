# Design System: The Celestial Archive

## 1. Overview & Creative North Star: "The Cosmic Oracle"
The design system is built upon the "Cosmic Oracle" North Star—an editorial approach to Vedic astrology that balances the weight of ancient wisdom with the lightness of modern digital luxury. 

To break the "template" look, we move away from rigid, centered grids in favor of **Intentional Asymmetry**. Imagine a celestial map: elements should feel as if they are orbiting a focal point rather than being trapped in a box. We utilize overlapping typography, mandalas that bleed off the edges of the viewport, and deep tonal layering to create a sense of infinite space. This is not a website; it is a digital sanctuary.

---

## 2. Colors: Tonal Depth & Radiant Accents
Our palette mimics the transition from the deep void of the cosmos to the radiant glow of a rising sun.

*   **Primary (`#e6c364`) & Tertiary (`#f0c040`):** These are our "Light-Bringers." Use them sparingly for high-impact CTAs and sacred geometry accents.
*   **Surface Hierarchy:** We define depth through the `surface-container` scale. Never use flat black.
    *   **Background (`#200436`):** The foundation of the void.
    *   **Surface-Container-Lowest (`#1a0030`):** Used for "sunken" areas or deep background sections.
    *   **Surface-Container-Highest (`#442959`):** Used for "raised" interactive elements like cards.

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for sectioning. Boundaries between sections must be defined solely through background color shifts (e.g., a `surface-container-low` section transitioning into `surface-dim`). 

### The "Glass & Gradient" Rule
To achieve a premium feel, floating overlays must use **Glassmorphism**. Apply `surface-variant` at 40% opacity with a `backdrop-blur` of 20px. For main CTAs, use a linear gradient transitioning from `primary` (`#e6c364`) to `primary-container` (`#c9a84c`) at a 135-degree angle to simulate the shimmer of real gold.

---

## 3. Typography: Editorial Authority
The type scale is a dialogue between the divine (Serif) and the human (Sans-Serif).

*   **Display & Headline (Noto Serif):** These are your "Golden Hooks." At `display-lg` (3.5rem), the letter-spacing should be slightly tightened (-0.02em) to feel like a high-end fashion masthead. These should almost always be rendered in `primary` (Gold).
*   **Body & Labels (Manrope):** The "Human Guide." Use `on-surface-variant` (`#d0c5b2`) for body text to reduce harsh contrast against the deep purple. This creates an inviting, readable experience that feels like reading an old parchment under candlelight.
*   **Visual Weight:** Pair a `headline-lg` with a `label-sm` in all-caps (20% letter spacing) to create a sophisticated, tiered hierarchy common in luxury editorial design.

---

## 4. Elevation & Depth: Tonal Layering
In this design system, shadows are light, and surfaces are physical.

*   **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-highest` card on a `surface` background. This creates a soft, natural lift.
*   **Ambient Shadows:** For floating elements (Modals/Dropdowns), use an extra-diffused shadow: `0px 20px 40px rgba(13, 0, 24, 0.6)`. The shadow color is a tinted version of `surface-container-lowest`, making it feel like a natural occlusion of light rather than a "drop shadow."
*   **The "Ghost Border":** If a border is required for button or card definition, use the `outline-variant` token at **15% opacity**. High-contrast, 100% opaque borders are strictly forbidden as they "trap" the cosmic energy of the layout.

---

## 5. Components: Sacred Geometry in UI
Every component should feel like a ritual tool.

*   **Buttons:**
    *   **Primary:** Golden-filled (`primary` to `primary-container` gradient). Pill-shaped (`rounded-full`). Text is `on-primary` (dark purple) for maximum legibility.
    *   **Secondary:** Ghost Border style. Outline-variant at 20% opacity with `primary` text.
*   **Golden Bordered Cards:** Use `surface-container-high` as the base. Apply a 1px "Ghost Border" using the `primary` token at 10% opacity. On hover, the border opacity should pulse to 40% using a Framer Motion transition.
*   **Shimmering Marquee Strips:** Use a slow-moving marquee for zodiac symbols or Sanskrit mantras. The text should be `surface-variant` with a low-opacity `primary` glow.
*   **Pill-Shaped Badges:** Used for "Zodiac Signs" or "Planetary States." Background: `secondary-container`. Text: `on-secondary-container`.
*   **Input Fields:** Minimalist. No bottom line. Use `surface-container-low` with a subtle `primary` glow on focus. Labels should float and utilize the `label-md` scale.
*   **Cards & Lists:** **No Dividers.** Use the Spacing Scale (specifically `spacing-8` or `spacing-10`) to create "Active Negative Space." Separation is achieved through rhythm, not lines.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts where gold mandalas bleed off the page.
*   **Do** apply a subtle "Floating Particle" overlay (using Framer Motion) to hero sections to mimic cosmic dust.
*   **Do** use `notoSerif` for numbers (dates/times) to make them feel like ancient coordinates.
*   **Do** use "Soft Entry" animations (fade-in + 20px slide up) for all page transitions.

### Don't:
*   **Don't** use pure white (`#FFFFFF`). Always use `off-white` or `on-surface-variant`.
*   **Don't** use standard 4px or 8px border radii. Use the `rounded-md` (1.5rem) or `rounded-full` scales for a softer, more organic feel.
*   **Don't** use "Snap-to-Grid" thinking for imagery. Overlap images with text to create depth.
*   **Don't** use harsh, fast animations. Everything must feel rhythmic and "pulled by gravity."