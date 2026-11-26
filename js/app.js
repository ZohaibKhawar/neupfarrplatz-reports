/* Page logic: report reader, layers viewer, home page lists. */
(function () {
  "use strict";
  var R = window.REPORTS || [], LY = window.LAYERS || [], FIG = window.FIG;
  var LAYER = {};
  LY.forEach(function (l) { LAYER[l.id] = l; });
  var COMPILED = "26 Nov 2026";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  /* Report text is written by us (data/reports.js), so it may hold simple HTML. */
  function rich(s) {
    return String(s)
      .replace(/\{\{(NP-\d\d)\}\}/g, '<a href="reports.html#$1">$1</a>')
      .replace(/\[\[([A-Z0-9]+)\]\]/g, function (m, id) {
        var l = LAYER[id];
        return '<a class="ctx-link" href="layers.html#' + id + '" title="' + esc(l ? l.name : "") + '">' + (l ? esc(l.name) : id) + "</a>";
      })
      .replace(/\[s(\d+)\]/g, '<sup class="cite"><a href="sources.html#s$1" aria-label="Source $1">$1</a></sup>');
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function sourceCount(r) {
    var seen = {};
    (JSON.stringify(r.body).match(/\[s\d+\]/g) || []).forEach(function (m) { seen[m] = 1; });
    return Object.keys(seen).length;
  }

  /* ---------- shared blocks ---------- */
  function figure(name, caption, opts) {
    return '<figure class="fig" data-figname="' + name + '"><div class="fig-scroll">' + FIG[name](opts) + "</div>" +
      '<p class="scroll-hint">Swipe sideways to see the whole drawing.</p>' +
      (caption ? "<figcaption>" + rich(caption) + "</figcaption>" : "") + "</figure>";
  }
  function table(t) {
    return '<div class="table-wrap"><table class="data">' + (t.caption ? "<caption>" + rich(t.caption) + "</caption>" : "") +
      "<thead><tr>" + t.cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      t.rows.map(function (r) { return "<tr>" + r.map(function (v) { return "<td>" + rich(v) + "</td>"; }).join("") + "</tr>"; }).join("") +
      "</tbody></table></div>";
  }
  function layersTable() {
    return table({
      cols: ["Layer", "When", "Depth", "What is there"],
      rows: LY.map(function (l) { return ["[[" + l.id + "]]", l.span, l.depth, l.found + " " + l.cites]; })
    });
  }
  function block(b) {
    switch (b[0]) {
      case "h": return "<h3>" + esc(b[1]) + "</h3>";
      case "p": return "<p>" + rich(b[1]) + "</p>";
      case "note": return '<aside class="callout">' + rich(b[1]) + "</aside>";
      case "gap": return '<aside class="notice gap"><span class="tag gap">Not published online</span><p>' + rich(b[1]) + "</p></aside>";
      case "list": return '<ul class="blist">' + b[1].map(function (i) { return "<li>" + rich(i) + "</li>"; }).join("") + "</ul>";
      case "table": return table(b[1]);
      case "fig": return figure(b[1], b[2]);
      case "layers": return layersTable();
      default: return "";
    }
  }
  function reportCard(r, base) {
    return '<a class="card rcard" href="' + (base || "") + "#" + r.id + '"><div class="rc-top"><span class="rid">' + r.id + '</span><span class="chip">' + esc(r.topic) +
      "</span></div><h3>" + esc(r.title) + "</h3><p>" + esc(r.summary) + '</p><div class="rc-meta">' + esc(r.period) + " · " + sourceCount(r) + " sources</div></a>";
  }

  /* Figures dropped into static pages with data-fig="name". */
  function mountFigures() {
    $all("[data-fig]").forEach(function (el) {
      el.outerHTML = figure(el.getAttribute("data-fig"), el.getAttribute("data-caption") || "");
    });
  }

  /* Outside the Layers page, clicking a layer in a drawing opens it there. */
  document.addEventListener("click", function (e) {
    if (document.body.getAttribute("data-page") === "layers") return;
    var g = e.target.closest && e.target.closest(".ctx[data-ctx]");
    if (g) location.href = "layers.html#" + g.getAttribute("data-ctx");
  });

  /* ---------- home ---------- */
  function initHome() {
    var grid = $("#report-grid");
    if (grid) grid.innerHTML = R.map(function (r) { return reportCard(r, "reports.html"); }).join("");
  }

  /* ---------- reports ---------- */
  function initReports() {
    var list = $("#rp-list"), reader = $("#rp-reader"), cards = $("#rp-cards"), count = $("#rp-count");
    var topics = ["All"].concat(R.map(function (r) { return r.topic; }).filter(function (t, i, a) { return a.indexOf(t) === i; }));
    var state = { topic: "All", q: "" };
    var filters = $("#rp-filters");
    filters.innerHTML = topics.map(function (t) {
      return '<button type="button" data-topic="' + esc(t) + '" aria-pressed="' + (t === "All") + '">' + esc(t) + "</button>";
    }).join("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      state.topic = b.getAttribute("data-topic");
      $all("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      drawList();
    });
    $("#rp-q").addEventListener("input", function (e) { state.q = e.target.value.trim().toLowerCase(); drawList(); });

    function drawList() {
      var shown = R.filter(function (r) {
        if (state.topic !== "All" && r.topic !== state.topic) return false;
        if (!state.q) return true;
        if (!r._hay) r._hay = (r.id + " " + r.title + " " + r.summary + " " + r.topic + " " + r.period + " " + JSON.stringify(r.body)).replace(/<[^>]+>/g, " ").toLowerCase();
        return state.q.split(/\s+/).every(function (w) { return r._hay.indexOf(w) !== -1; });
      });
      cards.innerHTML = shown.length ? shown.map(function (r) { return reportCard(r); }).join("") :
        '<p class="empty">No report matches that. Try a word like “synagogue”, “bunker” or “1519”.</p>';
      count.textContent = shown.length + " of " + R.length + " reports";
    }

    function show() {
      var id = decodeURIComponent(location.hash.slice(1)).toUpperCase();
      var r = R.filter(function (x) { return x.id === id; })[0];
      if (!r) {
        reader.hidden = true; reader.innerHTML = ""; list.hidden = false;
        document.title = "Reports · Neupfarrplatz";
        drawList();
        return;
      }
      var i = R.indexOf(r), prev = R[i - 1], next = R[i + 1];
      function nav(cls) {
        return '<nav class="rnav ' + cls + '" aria-label="Report navigation"><a href="reports.html">← All reports</a><span>' +
          (prev ? '<a href="#' + prev.id + '">‹ ' + prev.id + "</a>" : "") + (next ? '<a href="#' + next.id + '">' + next.id + " ›</a>" : "") + "</span></nav>";
      }
      var kv = [["Report", r.id], ["Topic", r.topic], ["Period", r.period], ["Compiled", COMPILED], ["Sources cited", String(sourceCount(r))], ["Type", "Study summary"]];
      reader.innerHTML = '<article class="report">' + nav("") +
        '<header class="report-head"><div class="stamp real">Study<br>summary</div><p class="eyebrow">Neupfarrplatz · Regensburg · ' + r.id + "</p><h1>" + esc(r.title) +
        '</h1><p class="lede">' + esc(r.summary) + '</p><dl class="kv">' + kv.map(function (p) { return "<div><dt>" + p[0] + "</dt><dd>" + esc(p[1]) + "</dd></div>"; }).join("") +
        '</dl><p><button class="btn" type="button" data-print>Print this report</button></p></header><div class="report-body">' + r.body.map(block).join("") + "</div>" + nav("rnav-bottom") + "</article>";
      list.hidden = true; reader.hidden = false;
      document.title = r.id + " " + r.title + " · Neupfarrplatz";
      window.scrollTo(0, 0);
      var h = $("h1", reader);
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }
    reader.addEventListener("click", function (e) {
      if (e.target.closest("[data-print]")) window.print();
    });
    window.addEventListener("hashchange", show);
    show();
  }

  /* ---------- layers viewer ---------- */
  function initLayers() {
    var host = $("#ly-host"), panel = $("#ly-panel"), listEl = $("#ly-list");
    host.innerHTML = '<div class="fig-scroll">' + FIG.layers({ interactive: true }) + '</div><p class="scroll-hint">Swipe sideways to see the whole drawing.</p>';
    listEl.innerHTML = LY.map(function (l) {
      return '<button type="button" data-id="' + l.id + '" aria-pressed="false"><i style="background:' + l.color + '"></i>' + esc(l.name) + "</button>";
    }).join("");

    function select(id, fromUser) {
      var l = LAYER[id];
      if (!l) return;
      $all(".ctx", host).forEach(function (g) { g.classList.toggle("is-sel", g.getAttribute("data-ctx") === id); });
      $all("button", listEl).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-id") === id)); });
      panel.innerHTML = (l.gap ? '<span class="tag gap">Gap in the record</span>' : '<span class="chip">Layer</span>') +
        "<h3>" + esc(l.name) + '</h3><div class="swatch-line"><i style="background:' + l.color + '"></i><span class="mono">' + esc(l.span) + "</span></div>" +
        "<dl><dt>Depth</dt><dd>" + esc(l.depth) + "</dd></dl>" +
        '<span class="lab">What is there</span><p>' + rich(l.found + " " + l.cites) + "</p>" +
        '<span class="lab">Read more</span><p>' + l.reports.map(function (r) { return rich("{{" + r + "}}"); }).join(" · ") + "</p>";
      if (fromUser) {
        history.replaceState(null, "", "#" + id);
        if (window.innerWidth < 1020) panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
    host.addEventListener("click", function (e) {
      var g = e.target.closest(".ctx[data-ctx]");
      if (g) select(g.getAttribute("data-ctx"), true);
    });
    host.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var g = e.target.closest(".ctx[data-ctx]");
      if (g) { e.preventDefault(); select(g.getAttribute("data-ctx"), true); }
    });
    listEl.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (b) select(b.getAttribute("data-id"), true);
    });
    window.addEventListener("hashchange", function () { select(location.hash.slice(1), false); });
    select(LAYER[location.hash.slice(1)] ? location.hash.slice(1) : "L4", false);
  }

  document.addEventListener("DOMContentLoaded", function () {
    FIG.ensurePatterns();
    mountFigures();
    var page = document.body.getAttribute("data-page");
    if (page === "home") initHome();
    if (page === "reports") initReports();
    if (page === "layers") initLayers();
  });
})();
