# Known Issues & Backlog

Findings from a full audit of the site on 2026-09-15: dependencies installed, Jest run,
production build run, ESLint run, and every route driven in headless Chrome.

Four items were fixed at the time of the audit (see [Already fixed](#already-fixed) at the
bottom). Everything below is **deliberately deferred** — verified, reproduced, and left for
a later pass.

Each item lists how it was reproduced so nobody has to rediscover it.

---

## 1. Blocking / high impact

### 1.1 `npm test` cannot run — 0 tests execute

```
Test Suites: 4 failed, 4 total
Tests:       0 total
SyntaxError: Cannot use import statement outside a module
```

`@babel/preset-env`, `@babel/preset-react` and `babel-jest` are all in `devDependencies`,
but there is **no `babel.config.js` / `.babelrc`** anywhere in the repo, so `babel-jest` has
no presets to transform with.

The tests themselves are fine. Re-running with a throwaway Babel config gives **93/93
passing**. A single config file fixes it:

```js
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
```

`jest.config.js` also needs `moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' }` for the
`@/` alias.

> **Decision:** intentionally left broken — the team is moving frontend testing to
> Playwright (automated + manual) instead of Jest. If Jest is retired, delete
> `jest.config.js`, `jest.setup.js`, the four `*.test.js` files and the Jest/Babel
> devDependencies so the broken script stops being misleading.

### 1.2 Coverage gate fails by a wide margin

`jest.config.js` enforces 80% global coverage. Actual (once Babel is wired up):

| Metric | Actual | Threshold |
|---|---|---|
| Statements | 6.63% | 80% |
| Branches | 6.80% | 80% |
| Lines | 7.46% | 80% |
| Functions | 4.80% | 80% |

`src/utils/*` is at 100%; almost everything else is 0%. `npm run test:coverage` exits 1.
Either lower the threshold to something honest or scope `collectCoverageFrom` to `src/utils`.

### 1.3 Next.js 16.2.1 carries a critical advisory

`npm audit` reports 10 vulnerabilities (1 critical, 6 high). The critical one is Next.js
itself — including unauthenticated RCE in the Image Optimization API (AVIF), middleware/proxy
bypasses, and cache poisoning. `postcss` and `sharp` are flagged through Next.

Fix is `next@16.3.5`, which is **outside the stated `16.2.1` dependency range**, so it needs
a deliberate bump plus a re-test of all routes. The other 9 findings are dev-only transitives
(`@babel/core`, `brace-expansion`, `js-yaml`, `nanoid`, `browserslist`, `@humanfs/node`).

---

## 2. SEO & performance

### 2.1 Seven of eight routes server-render no content

Every page except `/bmi-calculator2` is a `'use client'` component that hides everything
behind `LoadingScreen` until a fake progress bar finishes. Stripping tags from the
server-rendered HTML of `/`, `/about` and `/contact` gives only:

> `Robust Kitchen — Therapeutic Meals by Dieticians Robust Kitchen Therapeutic Meals by Dieticians 0 %`

Crawlers and the first paint get nothing. Measured time-to-content in headless Chrome:

| Route | Time to content |
|---|---|
| `/`, `/about`, `/products`, `/community`, `/contact`, `/assessment`, `/bmi-calculator` | ~2.6 s |
| `/bmi-calculator2` (no `LoadingScreen`) | **297 ms** |

That ~2.3 s is an artificial delay on every page **and every internal navigation** — it is
not waiting on real work. `/bmi-calculator2` is the proof that the pages render fine without it.

Suggested direction: make the pages Server Components, keep `LoadingScreen` as a brief
client-side overlay that does not gate `children`, or drop it entirely.

### 2.2 All pages share one `<title>` and meta description

Confirmed identical `<title>` on `/`, `/about`, `/products`, `/assessment`. Only
[src/app/layout.js](src/app/layout.js) sets `metadata`. Because every page is `'use client'`,
per-page `metadata` exports are impossible — this is blocked behind 2.1.

### 2.3 LCP image hint on `/products`

React logs: *Image with src `/images/products/watermelon-multivitamin-jam.jpeg` was detected
as the Largest Contentful Paint. Please add the `loading="eager"` property.* Add `priority` to
the first above-the-fold `<Image>` in [src/components/Products.js](src/components/Products.js#L139).

---

## 3. Visual

### 3.1 The body font is Arial, not Outfit

Computed `font-family` on `<body>` across all 8 routes: `Arial, Helvetica, sans-serif`.

[src/app/globals.css:97](src/app/globals.css#L97) sets `body { font-family: Arial, Helvetica, sans-serif; }`
as **unlayered** CSS. In Tailwind v4 all utilities live in `@layer utilities`, and unlayered
CSS always beats layered CSS regardless of specificity — so the `font-outfit` class on
`<body>` never wins. Three Google fonts are downloaded; the base one is never used.

Fix: delete the `font-family` line from the `body` rule and let the `font-outfit` utility in
[src/app/layout.js](src/app/layout.js) apply, or move the rule into `@layer base`.

### 3.2 The assessment page asks for a font that is never loaded

[src/app/assessment/page.js:466](src/app/assessment/page.js#L466) sets
`fontFamily: "'DM Sans', 'Segoe UI', sans-serif"`, but only Cormorant Garamond, Outfit and
JetBrains Mono are loaded in the layout. It silently falls back to Segoe UI / system sans.

The whole page also uses inline styles and its own green brand (`#2D6A2D`), unrelated to the
Tailwind coral/yellow tokens the rest of the site uses.

---

## 4. Accessibility & correctness

### 4.1 `role="radio"` without `aria-checked`

ESLint (`jsx-a11y`) flags 8 warnings across
[src/components/UnitToggle.js](src/components/UnitToggle.js) and
[src/components/GenderSelector.js](src/components/GenderSelector.js):

- `The attribute aria-pressed is not supported by the role radio`
- `Elements with the ARIA role "radio" must have the following attributes defined: aria-checked`

Fix: swap `aria-pressed` for `aria-checked` and wrap each pair in a `role="radiogroup"`
container with a label.

### 4.2 ESLint: 10 errors, 12 warnings

10 errors are all `react/no-unescaped-entities` (apostrophes and quotes) in
[about](src/app/about/page.js#L26), [community](src/app/community/page.js#L26),
[contact](src/app/contact/page.js#L92) and
[Testimonials](src/components/Testimonials.js#L30). All trivially fixable; `--fix` handles 3
of the warnings.

### 4.3 React warning on the assessment page (the dev overlay's "01 Issue")

> Removing a style property during rerender (`margin`) when a conflicting property is set
> (`marginTop`) can lead to styling bugs.

[page.js:468](src/app/assessment/page.js#L468) defines `headerTitle` with `margin: 0`, and
[page.js:572](src/app/assessment/page.js#L572) spreads it with `marginTop: 4` — mixing
shorthand and longhand on the same element across renders. Use `marginBlockStart` or drop
`margin: 0` from the base style.

### 4.4 Progress bar reads 95% on the last question

The final step shows *"Question 22 of 22 — 95% complete"*.
[page.js:337](src/app/assessment/page.js#L337) uses the 0-indexed `currentQ`:

```js
const progressPct = step === "questions" ? Math.round((currentQ / totalQ) * 100) : ...
```

Should be `(currentQ + 1) / totalQ`.

### 4.5 The "ideal max weight" is classified Overweight by the app itself

At 175 cm the calculator reports an ideal range of **56.7 – 76.6 kg**, but 76.6 kg at 175 cm
is BMI 25.01, which the same app labels **Overweight**.

`BMI_BOUNDARIES.HEALTHY_MAX` is `25`, while the comment in
[src/utils/bmiCalculations.js:55](src/utils/bmiCalculations.js#L55) says "BMI 24.9". Using
24.9 for the ideal-range maximum makes the two agree.

Classification itself is correct at every boundary — verified in the browser:

| Input | BMI | Category |
|---|---|---|
| 175 cm / 76 kg | 24.8 | Healthy Weight |
| 175 cm / 77 kg | 25.1 | Overweight |
| 175 cm / 57 kg | 18.6 | Healthy Weight |
| 175 cm / 56 kg | 18.3 | Underweight |

### 4.6 The assessment loses all answers on refresh

22 questions, 5–7 minutes of work, and a browser refresh drops the user back to the intro
screen with empty state. Verified by reloading mid-assessment. Consider persisting `basics`,
`answers` and `currentQ` to `sessionStorage`.

---

## 5. Dead code & duplication

### 5.1 A second, unreachable BMI calculator

`/bmi-calculator2` ([src/app/bmi-calculator2/page.js](src/app/bmi-calculator2/page.js), 470
lines) is **linked from nowhere** — only `/bmi-calculator` is reachable, via the "Check Your
BMI" button in [Hero.js:128](src/components/Hero.js#L128). It is a self-contained rewrite with
a better structure in places (`useMemo`, conversion on unit switch, inline error state) but it
still ships to production and still appears in the build output.

Decide: promote it, or delete it.

### 5.1b `Products.js` is now unused

The products page was rebuilt as a pre-launch page
([src/components/ProductsLaunch.js](src/components/ProductsLaunch.js)), so the old catalogue
component [src/components/Products.js](src/components/Products.js) (315 lines) is no longer
imported anywhere. It was **kept, not deleted**.

All of its real content has since been migrated into `ProductsLaunch.js`: the three product
photos, their descriptions, every tag chip, and the "Our Promise on Every Product" block.
The only things **not** carried over are two development placeholders — the dashed
"VIDEO — Product Range Showcase" box and the "500×400px · WebP" image-spec boxes from the
hidden 4-product grid. Say if you want the video slot back.

The previous "Our Products" hero is likewise preserved in
[src/app/products/page.js](src/app/products/page.js) behind `SHOW_LEGACY_HERO = false`, because
it contains hand-written copy and a JSX comment. Flip the flag to `true` to render it again.

Both are safe to delete once the pre-launch page is signed off — **ask before removing**.

### 5.2 Orphaned assessment files

- `src/app/assessment/page copy.js`
- `src/app/assessment/page copy 2.js`

Neither is a route (only `page.js` routes in the App Router), so they are dead weight.
`page copy.js` is the sole importer of
[src/components/AssessmentForm.js](src/components/AssessmentForm.js) — **913 lines of
completely dead code**.

### 5.3 BMI maths exists in four places

1. [src/utils/bmiCalculations.js](src/utils/bmiCalculations.js) — the tested one
2. [src/app/bmi-calculator2/page.js](src/app/bmi-calculator2/page.js) — own copy
3. `calcBMI` / `getBMIScore` in [src/app/assessment/page.js](src/app/assessment/page.js#L285)
4. The calorie formula in [src/components/Hero.js](src/components/Hero.js#L25)

Note that #3 uses age-adjusted ranges for over-60s (22–27) that #1 does not, so the two tools
can disagree about the same person.

### 5.4 Misplaced test file

[src/app/bmi-calculator/components/GenderSelector.test.js](src/app/bmi-calculator/components/GenderSelector.test.js)
sits in an otherwise-empty directory inside `app/` and reaches back to `../../../components/`.
Move it next to the component.

---

## 6. Content & config

### 6.1 Social handles are assumed, not confirmed

`SOCIAL_LINKS` at the top of [src/components/Footer.js](src/components/Footer.js) currently
points Instagram and Facebook at the `@eatrobust` handle:

- `https://instagram.com/eatrobust`
- `https://facebook.com/eatrobust`

These were **assumed from the brand name, not verified against the live profiles.** Confirm
both resolve to the right accounts. An entry set to an empty string is skipped automatically,
so no dead link can ship.

### 6.2 FormSubmit needs one-time activation

The contact form now posts to FormSubmit. **The first real submission triggers a confirmation
email** to `milandanidhariya777@gmail.com` with an activation link; until someone clicks it, no
mail is delivered.

After activating, FormSubmit issues a masked endpoint (`https://formsubmit.co/ajax/<token>`).
Swap it in so the address is not exposed in the page source, either by editing the constant in
[src/components/ContactForm.js](src/components/ContactForm.js) or by setting
`NEXT_PUBLIC_FORMSUBMIT_ENDPOINT` — the code already prefers the env var when present.

### 6.3 README is stale

[README.md](README.md) describes a single-page app, references `tailwind.config.js` and
`next.config.js` (neither exists — Tailwind v4 is CSS-first via
[globals.css](src/app/globals.css)), lists components that were never built, and claims a
"Lighthouse Score 95+" that the loading-screen gate makes implausible.

### 6.4 The brand palette was renamed in place

[globals.css](src/app/globals.css) comments out the old green palette and replaces the values
with coral/yellow, but keeps the old **names**: `--lime` is now coral `#f0786c` and `--gold` is
yellow `#fce454`. Every `text-lime` / `bg-gold` in the codebase now means something other than
what it says.

There is also a `@media (prefers-color-scheme: dark)` block that overrides only `--background`
and `--foreground`, leaving the rest of the light palette in place — so dark mode is
half-applied rather than designed.

---

## Already fixed

For reference, these were addressed in the same pass and are **not** outstanding:

| Fix | Files |
|---|---|
| Contact form posts to FormSubmit with inline success/error states, honeypot, and no lost leads | [src/app/contact/page.js](src/app/contact/page.js) |
| Unit toggle now converts values instead of swapping in stale defaults (was reporting BMI 23.8 for a 27.8 body) | [src/components/BMICalculator.js](src/components/BMICalculator.js) |
| Enter key calculates from live values, not the initial render's closure (was always 23.9) | [src/components/BMICalculator.js](src/components/BMICalculator.js) |
| Number fields clamp on blur, not per keystroke (typing "150" used to become "400") | [HeightInput.js](src/components/HeightInput.js), [WeightInput.js](src/components/WeightInput.js), [inputHelpers.js](src/utils/inputHelpers.js) |
| `alert()` replaced with an inline, screen-reader-announced message | [src/components/BMICalculator.js](src/components/BMICalculator.js) |
| Hidden CTA removed from the tab order and accessibility tree while invisible | [src/components/CTASection.js](src/components/CTASection.js) |
| All footer links resolve to real routes via `next/link`; dead anchors and `href="#"` gone | [src/components/Footer.js](src/components/Footer.js) |
| Instagram/Facebook restored with brand icons; every Connect link now has an icon | [Footer.js](src/components/Footer.js), [SocialIcons.js](src/components/SocialIcons.js) |
| Home hero spans the full width and is centred, so it no longer looks one-sided with the media slot empty | [src/components/Hero.js](src/components/Hero.js) |
| Contact form extracted, fully validated per field, with deep-link subject/message prefill | [ContactForm.js](src/components/ContactForm.js), [contactSubjects.js](src/utils/contactSubjects.js) |
| Products page rebuilt as a pre-launch / collect-interest page, with all photos, descriptions, tag chips and the Promise block carried over | [ProductsLaunch.js](src/components/ProductsLaunch.js) |
