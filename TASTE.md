# TASTE.md

Rules for building interfaces. Stack-agnostic and brand-agnostic.
Optimize for one outcome: the result should feel inevitable, as if it was always meant to look this way.

## 0. Operating principles

- Make it fast, consistent, careful, timeless, soulful.
- The last 5% is the work. If the polish is not shipped, it is not shipped.
- Default to less. Add nothing that does not earn its place. Then remove one more thing.
- Design against the trend cycle. It should look right in five years, not this quarter.
- Feeling is a spec. If it feels off, it is off, even when you cannot name why. Fix it.
- Taste is judgment under constraint. When unsure, choose the more restrained option.
- Consistency beats cleverness. The same problem gets the same solution everywhere.

## 1. Typography

- Type carries the interface. Get it right before anything else.
- One neutral, well-built typeface for UI. A monospace for code and data. Resist a third.
- Set a modular scale and only use sizes from it. Do not invent per-component sizes.
- Body line length stays between 45 and 75 characters. Never full-width paragraphs.
- Line-height scales inversely with size. Around 1.5 for body, 1.1 to 1.2 for headings.
- Tighten tracking on large text. Loosen it on small caps and labels.
- Trust optical alignment over mathematical alignment. Align to the baseline, not the bounding box.
- One or two weights cover most UI. Regular and medium. Reserve bold for rare emphasis.
- Use tabular figures for anything that aligns in columns or updates in place.
- Left-align body text. Never justify. Never center long text.

## 2. Color

- Start in grayscale. If it works in black and white, color is enhancement, not a crutch.
- Few colors. One accent. Neutrals do the heavy lifting.
- Define color by role, not by hue: background, surface, border, text, muted, accent, danger.
- Build ramps in a perceptual color space so steps feel evenly spaced.
- Treat WCAG AA as a floor: 4.5:1 for text, 3:1 for large text and UI elements.
- Borders and dividers should be barely there. Low-contrast separation reads as calm.
- Dark mode is not inverted light mode. Re-derive it. Soften white text, lower saturation, rework shadows.
- Never signal state by color alone. Pair it with an icon, text, or shape.

## 3. Space and layout

- All spacing comes from one scale, based on 4 or 8. No arbitrary margins.
- Whitespace is a material. Generous negative space is a feature, not waste.
- Separate with space before reaching for borders or boxes. Proximity groups; lines clutter.
- Align everything to a grid. Optical nudges are allowed, random offsets are not.
- Keep rhythm: the gap between related items is smaller than the gap between groups.
- Match density to the task. Dense for dashboards, airy for marketing. Do not mix the two in one view.
- Pick a small set of corner radii and nest them correctly: inner radius equals outer minus padding.

## 4. Motion

- Motion serves meaning. It shows where something came from or where it went. If it does neither, cut it.
- Most things do not need animation. Default to none, add deliberately.
- Use spring or eased curves. Never linear, except for continuous motion like spinners.
- Keep it fast: 150 to 250ms for UI feedback, up to 400ms for larger transitions. Slower feels broken.
- Animate transform and opacity. Avoid animating layout, width, height, top, or left.
- Enter and exit are not symmetric by default. Things often enter soft and leave fast.
- Animations are interruptible. A new user action redirects motion, it does not queue behind it.
- Animate the property that carries the meaning: position for a drawer, scale and opacity from the trigger for a popover.
- Respect prefers-reduced-motion. Always provide a non-motion path.

## 5. Interaction and state

- Every interactive element has all states designed: default, hover, focus, active, disabled, loading, error.
- Empty states are real screens. Design them. Never leave a blank.
- Prefer optimistic UI and skeletons over spinners. Show structure immediately.
- Focus states are non-negotiable. A visible, high-contrast focus ring for keyboard users.
- Hit targets are at least 44px. Pad the interactive area beyond the visible glyph if needed.
- Acknowledge every action within 100ms, even when the result takes longer.
- Preserve user input and scroll position. Never make someone redo work after an error.
- Disabled is a last resort. Prefer explaining why an action is unavailable over silently graying it out.
- Do not rely on hover for anything essential. Touch has no hover.

## 6. Performance

- Performance is part of the design. A slow interface is an ugly interface.
- Budget the critical path. The first interaction should feel immediate.
- Animate at 60fps or do not animate. Drop the effect before you ship jank.
- Reserve space for async content. No layout shift.
- Lazy-load what is below the fold. Prioritize what the user sees and touches first.
- Debounce and throttle expensive handlers. Input must never feel laggy.

## 7. Copy

- Write the UI like a person wrote it. Plain, direct, short.
- Label buttons with the verb of what happens. "Save changes," not "Submit," not "OK."
- Error messages say what went wrong and what to do next. No codes, no blame.
- Use sentence case almost everywhere. Title Case reads as marketing.
- Cut words. If a sentence works without a word, remove it.
- Tone is calm and competent. No jargon, no cleverness that costs clarity.

## 8. Detail and polish

- Sweat alignment to the pixel. Misalignment is the most common tell of low craft.
- Check every state at every breakpoint. The bug lives at 320px and at 4K.
- Test with real content: the longest name, the empty list, the broken image, the missing avatar.
- Icons share one stroke weight and size, optically centered. A mixed icon set breaks the spell.
- Keep easing, radii, shadows, and spacing identical across the whole product.
- Shadows are soft, layered, low-opacity, from a single light source. Avoid hard dark drop shadows.
- If a choice draws attention to itself, question it. The interface should feel inevitable.

## 9. Accessibility

- Keyboard-operable end to end. Tab order follows visual order.
- Semantic HTML first. Reach for ARIA only when semantics run out.
- Meaningful images get alt text. Decorative images get empty alt.
- Trap focus only in modals, and return focus to the trigger on close.
- Test each surface with a screen reader at least once.

## What not to do

- Do not add a gradient, glow, or blur to make something pop. Fix the hierarchy instead.
- Do not ship five accent colors, three fonts, four radii, and inconsistent spacing.
- Do not animate everything.
- Do not center or justify body text.
- Do not remove the default focus outline and leave nothing in its place.
- Do not chase the current trend. It dates the fastest.
