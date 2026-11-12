# Cinewex — PageSpeed Performance Report

**Website:** https://cinewex.com/  
**Test date:** 12 November 2026  
**Tool:** Google PageSpeed Insights / Lighthouse 13.6.0  
**Test type:** Single-page lab tests; Chrome UX Report field data was unavailable.

## Executive summary

Cinewex scores **60/100 for Performance on both mobile and desktop**. The main issue is exceptionally high **Total Blocking Time (TBT)**: 19.39 seconds on mobile and 13.40 seconds on desktop. The reports also identify oversized images, a 6.1 MB video, unused JavaScript, and third-party scripts as opportunities to improve loading and responsiveness.

The site performs well in several other areas: **Cumulative Layout Shift is 0**, **Best Practices is 100**, and **SEO is 100** on both test profiles. Accessibility scores are 92 on mobile and 91 on desktop.

## 1. Results at a glance

| Metric | Mobile | Desktop |
|---|---:|---:|
| Performance | **60/100** | **60/100** |
| Accessibility | 92/100 | 91/100 |
| Best Practices | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |
| First Contentful Paint (FCP) | 0.9 s | 0.4 s |
| Largest Contentful Paint (LCP) | 2.4 s | 0.7 s |
| Total Blocking Time (TBT) | **19,390 ms** | **13,400 ms** |
| Cumulative Layout Shift (CLS) | 0 | 0 |
| Speed Index | 8.1 s | 4.9 s |

### Test conditions

- **Mobile:** Emulated Moto G Power, 412 × 823 screen, simulated 1.2× CPU slowdown and slow 4G network conditions.
- **Desktop:** Emulated desktop, 1350 × 940 screen, 1× CPU and custom network throttling.
- Both are single-session, initial-page-load lab tests. They are not a measurement of aggregate real-user experience.

## 2. Main findings

### A. Excessive Total Blocking Time — highest priority

| Finding | Mobile | Desktop |
|---|---:|---:|
| Total Blocking Time | 19.39 s | 13.40 s |
| Main-thread work | 41.1 s | 31.6 s |
| Long tasks identified | 20 | 20 |

The high TBT indicates that the browser spends too much time on tasks that prevent it from responding promptly. Lighthouse attributes substantial work to the page's main thread. The mobile report records 37.9 seconds in the “Other” category and 2.0 seconds in script evaluation; the desktop report records 29.9 seconds in “Other” and 1.1 seconds in script evaluation.

The reports identify first-party JavaScript chunks, Facebook tracking, and Google Tag Manager among the resources contributing to JavaScript work and unused code.

### B. Large video and overall network payload

The same ImageKit video is approximately **6,073 KiB (about 6.1 MB)** in both test profiles.

| Finding | Mobile | Desktop |
|---|---:|---:|
| Total network payload | 9,470 KiB | 8,794 KiB |
| ImageKit video | 6,073 KiB | 6,073 KiB |
| Estimated image-delivery savings | 1,911 KiB | 1,205 KiB |

The video is the largest identified network resource. The image audit also flags several images that are larger than their displayed dimensions require. For example, portrait creative images are supplied at roughly 1,667–1,679 px wide while appearing at about 192 px wide in the tested layout.

### C. Image delivery

Lighthouse estimates that image optimization could save:

- **Mobile:** approximately 1,911 KiB.
- **Desktop:** approximately 1,205 KiB.

Use appropriately sized responsive image variants for each display size, retain modern formats such as WebP where suitable, and compress images without visibly degrading quality. Avoid sending very large source dimensions to small cards or thumbnails.

### D. Unused JavaScript and third-party scripts

| Finding | Mobile | Desktop |
|---|---:|---:|
| Estimated unused-JavaScript savings | 224 KiB | 230 KiB |
| JavaScript execution-time diagnostic | 2.2 s | 1.2 s |
| Legacy JavaScript savings | 36 KiB | 37 KiB |

The report identifies opportunities in first-party JavaScript chunks and scripts associated with Facebook and Google Tag Manager. The mobile test records approximately 210 KiB for Facebook resources and 188 KiB for Google Tag Manager; the desktop test records approximately 225 KiB and 188 KiB respectively.

### E. Render-blocking CSS

A first-party CSS chunk is on the critical rendering path.

| Finding | Mobile | Desktop |
|---|---:|---:|
| Estimated render-blocking savings | 240 ms | 410 ms |
| CSS transfer size | about 9.8 KiB | about 9.8 KiB |

This is worth addressing, but the estimated gain is smaller than the potential gains from reducing blocking work and optimizing media.

### F. Caching

Lighthouse estimates repeat-visit savings from more efficient cache lifetimes of:

- **Mobile:** 187 KiB.
- **Desktop:** 201 KiB.

Review cache headers for static assets and use long-lived caching for versioned files where appropriate. Third-party cache policies may be outside the site's direct control.

## 3. Recommended action plan

Prioritize changes in this order:

1. **Investigate long tasks and TBT.** Profile the page in Chrome DevTools Performance. Identify the work behind the long tasks, especially the first-party JavaScript chunks, animations, and any scripts that run during initial load. Break up expensive tasks and defer nonessential work.
2. **Reduce the video cost.** Compress and resize the 6.1 MB video where visual quality allows. Avoid loading it eagerly when it is not immediately needed; consider a lightweight poster and loading or playback on demand, especially on mobile.
3. **Fix image sizing.** Serve responsive image dimensions matched to the rendered size. Prioritize the creative visualizations and storyboard images flagged by Lighthouse.
4. **Audit third-party scripts.** Review Facebook Pixel, Google Tag Manager, and the Meta CAPI helper. Remove unused tags and defer nonessential tracking until after the main content is usable or until consent/interaction where appropriate.
5. **Reduce unused first-party JavaScript.** Inspect the flagged Next.js chunks, split code by route or feature, and avoid shipping components and dependencies that are not needed for the initial view.
6. **Improve caching and CSS delivery.** Set sensible cache lifetimes for versioned static assets and reduce the blocking effect of the small CSS chunk where practical.
7. **Re-test on mobile and desktop.** Run repeat Lighthouse tests after each major change and compare TBT, image payload, total payload, and Performance score.

## 4. Other audit results

- **Layout stability:** CLS is 0 on both profiles; no layout shift issue is indicated by the score.
- **Accessibility:** 92 on mobile and 91 on desktop. Lighthouse lists additional items for manual review, so the scores should not be treated as proof that every accessibility requirement has been checked.
- **Best Practices:** 100 on both profiles.
- **SEO:** 100 on both profiles. The report lists structured data as an item for additional manual validation.
- **Agentic Browsing:** Mobile reports 2/2 checks passed. Desktop reports 1/3; it flags an accessibility tree that is not well-formed and a timed-out fetch of `llms.txt`. This category is described by Lighthouse as under development and should be treated separately from the SEO score.
- **DOM:** 440 total elements, maximum depth 17, and a maximum of 47 children under one element. This is a secondary diagnostic compared with the blocking time and media payload.

## 5. Measurement limitations

The PageSpeed report states that the Chrome User Experience Report does not have sufficient real-world speed data for this page. The results above therefore come from simulated lab tests and a single page session. Actual performance can vary by device, network, cache state, and user location. Use field monitoring once sufficient traffic data becomes available.

---

**Bottom line:** Focus first on reducing long main-thread tasks and TBT, then optimize the 6.1 MB video and oversized images. These are the most substantial issues surfaced by the two Lighthouse runs. The site's CLS, Best Practices, and SEO results are already strong.
