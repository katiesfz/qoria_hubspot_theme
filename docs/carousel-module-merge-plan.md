# Plan: merge slick-carousel and carousel-swiper into `carousel.module`

Status: plan only, nothing implemented.

## Decisions
- The merged module is called `carousel.module`.
- Centre mode may be an approximation under Swiper (no exact `centerPadding` equivalent).

## Assumptions to confirm
- The Swiper bundle (`q-theme/js/swiper/swiper-bundle.js`) is the full bundle, so the Grid, Controller, Fade and A11y modules are available. How it is loaded (theme-level or per-module) has not been checked; step 1 does.
- `carousel.module` goes in `hubspot/q-theme/modules/` and replaces both old modules.
- Slick's field names are kept as they are, so already-saved content in existing instances stays valid.

## Slick features and Swiper equivalents

| Slick | Swiper | Notes |
|---|---|---|
| dots, arrows, infinite, autoplay | pagination, navigation, `loop`, `autoplay` | Direct match. |
| `adaptiveHeight` | `autoHeight` | Direct match. |
| `fade` | `effect: 'fade'` | Direct match. |
| `focusOnSelect` | `slideToClickedSlide` | Direct match. |
| `slidesToShow` / `slidesToScroll` per breakpoint | `slidesPerView` / `slidesPerGroup` in `breakpoints` | Direct match. |
| `asNavFor` | Controller module | Both instances must exist before linking. |
| `rows` / `slidesPerRow` | Grid module | Different semantics, and awkward with `loop`; test these. |
| `centerMode` + `centerPadding` (%) | `centeredSlides` with fractional `slidesPerView` | Approximation: `slidesPerView = 1 / (1 - 2*pad)`. |
| Slide spacing | `spaceBetween` | Replaces the `.slick-list` margin CSS. |
| Normalise heights | CSS only | Swiper slides stretch by default; `normaliseHeights()` is not needed. |

## Problems in the current carousel-swiper module (do not carry over)
- `creative` effect block in `module.html` contains TypeScript type annotations (`translate: (string | number)[];`), which is a JS syntax error.
- Hardcoded debug values: `spaceBetween: 150`, `initialSlide: 3`, `centeredSlides: true`.
- Breakpoints use `--q-breakpoint-md` / `--q-breakpoint-xl`; slick uses `sm` / `lg`.
- Missing fields compared with slick: `center_mode`, per-breakpoint `center_padding`, `style.slide.*`, `slide.background`, `slide.slide_class`, per-card `shadow`.

## Steps

### 1. Pre-checks (read-only)
- Find where `swiper-bundle.js` and its CSS are loaded, and whether slick JS and jQuery are still needed by anything else.
  - Verify: `Swiper` is defined on a page that uses the existing swiper module.
- List every instance of the two modules in the templates that reference them, and note the options each sets (center mode, rows, nav-for, fade). This is the regression checklist.
  - AU: `events`, `home`, `student-wellbeing-analysis`
  - NZ: `home`, `meet-us`
  - US: `home`, `meet-us`
  - EU: `eu-whitepapers`
- Check child themes for module overrides or copies of either module.

### 2. Create `carousel.module`
- `meta.json`: label "Carousel"; other fields copied from the slick module.
- `fields.json`: start from slick's (the superset) and add:
  - `controls_outside` (from the swiper module)
  - extra `slide_or_fade` choices: flip, cube, cards, coverflow (drop `creative`, which has no usable values)
  - per-slide `custom_interval`, mapped to `data-swiper-autoplay` (exists in both modules, used by neither)
- Keep per-card `shadow`, `slide_class` and the slide background fields; drop `row_classes`.
  - Verify: the fields.json diff against slick's contains only the additions above.

### 3. Port the markup (`module.html`)
- Use slick's card macro and slide structure with Swiper classes (`swiper`, `swiper-wrapper`, `swiper-slide`, `swiper-pagination`, prev/next buttons).
- Keep slick's slide background, spacing, vertical-align and normalise-heights behaviour as CSS. The jQuery dependency and `normaliseHeights()` call go away.
- Unique ids per instance; scope pagination/navigation selectors to the container so several carousels on one page do not collide.

### 4. Write the Swiper init
- Map options as in the table above.
- Breakpoints from the theme's `sm` and `lg` variables, to match slick's layout points.
- Centre mode via `centeredSlides` and the derived `slidesPerView` per breakpoint.
- `spaceBetween` from `slide.spacing`.
- Grid rows for `slides_per_row`, with `loopAddBlankSlides` only when looping.
- Nav-for: initialise all instances first, then link with Controller in both directions.
- Remove the debug values and the TypeScript block.
  - Verify: no JS console errors on a test page.

### 5. Migrate templates
- Swap the module path in each template to `carousel.module`.
- Confirm on one template first that saved content carries over (field names unchanged), then do the rest.

### 6. Verify
- Test each migrated instance at mobile, tablet and desktop widths. Check arrows, dots, autoplay, infinite loop, nav-for pairs, grid rows and centre mode against the step 1 checklist.
- Upload to the sandbox (current git branch is `sandbox`) and check the rendered pages.

### 7. Clean up and document
- Delete `slick-carousel.module` and `carousel-swiper.module` last, once the templates are confirmed good.
- Check whether `js/slick/` and the slick CSS/JS references can be removed (flag only; do not delete unrequested).
- Update the wiki or Notion docs only if requested.

## Risks
- Grid with loop can leave blank or misordered slides; test every instance using rows.
- Nav-for initialisation order can break linked sliders.
- Visual drift: centre mode, and the breakpoint switch from `md`/`xl` to `sm`/`lg`.
