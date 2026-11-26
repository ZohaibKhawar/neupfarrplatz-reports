# Rupen-Nordfeta: geological reports from medieval Regensburg

A static website with twelve geological and geoarchaeological reports from one excavation in Regensburg, plus pages on the city's real geology and history.

**Rupen-Nordfeta is an invented site.** No source mentions an excavation by that name, so its plot, layers, measurements, dates, finds and reports are made up. They are built to fit Regensburg's real geology. Every page says which parts are invented, and every real fact carries a numbered source (see `sources.html`).

## Pages

| Page | What it holds | Real or invented |
| --- | --- | --- |
| `index.html` | Overview, site plan, phases, report list | Invented site |
| `geology.html` | Regensburg's rocks, faults, terraces, building stones, the 1342 flood | Real, sourced |
| `reports.html` | Reports RN-01 to RN-12 with tables and drawings; filter and search | Invented, real facts sourced |
| `section.html` | Clickable Trench 2 section (15 contexts) and five borehole logs | Invented |
| `timeline.html` | Real Regensburg events beside the invented site's phases | Both, clearly marked |
| `glossary.html` | Plain-language meanings of the terms | General |
| `sources.html` | Eleven sources and what each was used for | Real |

## Run it

No build step. Serve the folder and open http://localhost:5400:

```
python -m http.server 5400
```

## Files

- `data/site.js`: phases, contexts, section geometry, boreholes, test results
- `data/reports.js`: the report texts
- `js/figures.js`: SVG drawings (section, boreholes, charts, plan, cross-section)
- `js/app.js`: report reader, section viewer, home page
- `css/style.css`: styles, light and dark
