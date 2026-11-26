# Neupfarrplatz: excavation reports from medieval Regensburg

A static website of twelve study reports on the 1995–1998 excavation at Neupfarrplatz in Regensburg, with pages on the city's geology, its history, and how ordinary people were buried in the Middle Ages.

Everything is real and sourced. The reports are summaries compiled from published sources (30 of them, listed in `sources.html`), not the excavators' official reports. They add no measurements, dates or finds of their own. Where sources disagree, both answers are given; where the sources are silent, a grey "Not published online" box says so.

## Pages

| Page | What it holds |
| --- | --- |
| `index.html` | Overview, key numbers, the layers, report list |
| `geology.html` | Regensburg's rocks, faults, terraces, building stones, the 1342 flood |
| `reports.html` | Reports NP-01 to NP-12; filter by topic, full-text search, print |
| `layers.html` | Clickable schematic column of the layers under the square, and a schematic plan of the synagogue |
| `burial.html` | How a peasant was buried: eight steps from deathbed to charnel house, a schematic churchyard, and real graves from Burgweinting, St. Emmeram and the Great Cemetery |
| `timeline.html` | Regensburg's history beside the square's |
| `glossary.html` | Plain-language meanings of the terms |
| `sources.html` | The 30 sources and what each was used for |

## Run it

No build step. Serve the folder and open http://localhost:5400:

```
python -m http.server 5400
```

## Files

- `data/layers.js`: the layers under the square
- `data/reports.js`: the report texts
- `js/figures.js`: SVG drawings (layers, synagogue plan, churchyard, regional cross-section)
- `js/app.js`: report reader, layers viewer, home page
- `css/style.css`: styles, light and dark

An earlier version of this site (commit b82bafc) described an invented excavation; it was replaced by this one.
