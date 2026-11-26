/* Page logic: report reader, section viewer, home page lists. */
(function () {
  "use strict";
  var S = window.SITE, R = window.REPORTS || [], FIG = window.FIG;
  var CTX = {}, PH = {};
  S.contexts.forEach(function (c) { CTX[c.id] = c; });
  S.phases.forEach(function (p) { PH[p.id] = p; });
  var PHASE_COLOR = { P0: "#b6a98c", P1: "#3d362f", P2: "#c9c1ae", P3: "#a24a26", P4: "#8a857c" };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  /* Report text is written by us (data/reports.js), so it may hold simple HTML. */
  function rich(s) {
    return String(s)
      .replace(/\{\{(RN-\d\d)\}\}/g, '<a href="reports.html#$1">$1</a>')
      .replace(/\[\[(\d{4})\]\]/g, function (m, id) {
        var c = CTX[id];
        return '<a class="ctx-link" href="section.html#' + id + '" title="' + esc(c ? c.name : "") + '">' + id + "</a>";
      })
      .replace(/\[s(\d+)\]/g, '<sup class="cite"><a href="sources.html#s$1" aria-label="Source $1">$1</a></sup>');
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- shared blocks ---------- */
  var LEGENDS = {
    section: ["fill", "garden", "rubble", "wall", "floors", "sand", "yard", "dark", "hut", "loam", "gravel", "cess", "timber"],
    boreholes: ["fill", "garden", "rubble", "floors", "sand", "yard", "dark", "loam", "cover", "gravel", "tclay", "tsand", "kclay", "lime"]
  };
  function figure(name, caption) {
    var legend = LEGENDS[name] ? FIG.lithoLegend(LEGENDS[name]) : "";
    var wide = name !== "stones";
    return '<figure class="fig" data-figname="' + name + '"><div class="fig-scroll">' + FIG[name]() + "</div>" +
      (wide ? '<p class="scroll-hint">Swipe sideways to see the whole drawing.</p>' : "") + legend +
      (caption ? "<figcaption>" + rich(caption) + "</figcaption>" : "") + "</figure>";
  }
  function table(t) {
    var num = t.cols.map(function (c, i) {
      return t.rows.every(function (r) { return /^[\d.,–\s/+±%-]*$/.test(String(r[i])) && String(r[i]).trim() !== ""; });
    });
    return '<div class="table-wrap"><table class="data">' + (t.caption ? "<caption>" + rich(t.caption) + "</caption>" : "") +
      "<thead><tr>" + t.cols.map(function (c, i) { return "<th" + (num[i] ? ' class="num"' : "") + ">" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      t.rows.map(function (r) {
        return "<tr>" + r.map(function (v, i) { return "<td" + (num[i] ? ' class="num"' : "") + ">" + rich(v) + "</td>"; }).join("") + "</tr>";
      }).join("") + "</tbody></table></div>";
  }
  function contextsTable() {
    return table({
      cols: ["Context", "Kind", "Name", "Depth", "Phase", "Date"],
      rows: S.contexts.map(function (c) {
        return ["[[" + c.id + "]]", c.kind, c.name, c.depth, c.phase + " " + PH[c.phase].name, c.date];
      })
    });
  }
  function sedimentTable() {
    return table({
      cols: ["Context", "Clay %", "Silt %", "Sand %", "Gravel %", "Organic %", "CaCO₃ %", "Phosphate mg P/kg", "Mag. susc."],
      rows: S.sediments.map(function (r) {
        return ["[[" + r[0] + "]] " + esc(CTX[r[0]].name)].concat(r.slice(1).map(function (v) { return v.toLocaleString("en-GB"); }));
      })
    });
  }
  function phasesHtml(strip) {
    return '<ol class="phases' + (strip ? " strip" : "") + '">' + S.phases.map(function (p) {
      var ctxs = S.contexts.filter(function (c) { return c.phase === p.id; }).map(function (c) { return c.id; }).sort();
      return '<li style="--ph:' + PHASE_COLOR[p.id] + '"><span class="ph-id">' + p.id + "</span><h3>" + esc(p.name) + '</h3><span class="ph-span">' + esc(p.span) +
        "</span><p>" + esc(p.text) + '</p><div class="ph-ctx">' + ctxs.map(function (id) { return rich("[[" + id + "]]"); }).join("") + "</div></li>";
    }).join("") + "</ol>";
  }
  function block(b) {
    switch (b[0]) {
      case "h": return "<h3>" + esc(b[1]) + "</h3>";
      case "p": return "<p>" + rich(b[1]) + "</p>";
      case "note": return '<aside class="callout">' + rich(b[1]) + "</aside>";
      case "list": return '<ul class="blist">' + b[1].map(function (i) { return "<li>" + rich(i) + "</li>"; }).join("") + "</ul>";
      case "table": return table(b[1]);
      case "fig": return figure(b[1], b[2]);
      case "contexts": return contextsTable();
      case "sediments": return sedimentTable();
      case "phases": return phasesHtml(false);
      default: return "";
    }
  }
  function reportCard(r, base) {
    return '<a class="card rcard" href="' + (base || "") + "#" + r.id + '"><div class="rc-top"><span class="rid">' + r.id + '</span><span class="chip">' + esc(r.type) +
      "</span></div><h3>" + esc(r.title) + "</h3><p>" + esc(r.summary) + '</p><div class="rc-meta">' + esc(r.issued) + " · " + esc(r.by) + "</div></a>";
  }

  /* Figures dropped into static pages with data-fig="name". */
  function mountFigures() {
    $all("[data-fig]").forEach(function (el) {
      el.outerHTML = figure(el.getAttribute("data-fig"), el.getAttribute("data-caption") || "");
    });
  }

  /* In report pages, clicking a layer in a drawing opens it on the section page. */
  document.addEventListener("click", function (e) {
    var g = e.target.closest && e.target.closest(".report .ctx[data-ctx], .static-fig .ctx[data-ctx]");
    if (g) location.href = "section.html#" + g.getAttribute("data-ctx");
  });

  /* ---------- home ---------- */
  function initHome() {
    var grid = $("#report-grid");
    if (grid) grid.innerHTML = R.map(function (r) { return reportCard(r, "reports.html"); }).join("");
    var ph = $("#phase-strip");
    if (ph) ph.innerHTML = phasesHtml(true);
  }

  /* ---------- reports ---------- */
  function initReports() {
    var list = $("#rp-list"), reader = $("#rp-reader"), cards = $("#rp-cards"), count = $("#rp-count");
    var types = ["All"].concat(R.map(function (r) { return r.type; }).filter(function (t, i, a) { return a.indexOf(t) === i; }));
    var state = { type: "All", q: "" };
    var filters = $("#rp-filters");
    filters.innerHTML = types.map(function (t) {
      return '<button type="button" data-type="' + esc(t) + '" aria-pressed="' + (t === "All") + '">' + esc(t) + "</button>";
    }).join("");
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      state.type = b.getAttribute("data-type");
      $all("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      drawList();
    });
    $("#rp-q").addEventListener("input", function (e) { state.q = e.target.value.trim().toLowerCase(); drawList(); });

    function drawList() {
      var shown = R.filter(function (r) {
        if (state.type !== "All" && r.type !== state.type) return false;
        if (!state.q) return true;
        if (!r._hay) r._hay = (r.id + " " + r.title + " " + r.summary + " " + r.type + " " + r.area + " " + JSON.stringify(r.body)).replace(/<[^>]+>/g, " ").toLowerCase();
        var hay = r._hay;
        return state.q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
      });
      cards.innerHTML = shown.length ? shown.map(function (r) { return reportCard(r); }).join("") :
        '<p class="empty">No report matches that. Try a context number like 2005 or a word like “flood”.</p>';
      count.textContent = shown.length + " of " + R.length + " reports";
    }

    function show() {
      var id = decodeURIComponent(location.hash.slice(1)).toUpperCase();
      var r = R.filter(function (x) { return x.id === id; })[0];
      if (!r) {
        reader.hidden = true; reader.innerHTML = ""; list.hidden = false;
        document.title = "Reports · Rupen-Nordfeta";
        drawList();
        return;
      }
      var i = R.indexOf(r), prev = R[i - 1], next = R[i + 1];
      function nav(cls) {
        return '<nav class="rnav ' + cls + '" aria-label="Report navigation"><a href="reports.html">← All reports</a><span>' +
          (prev ? '<a href="#' + prev.id + '">‹ ' + prev.id + "</a>" : "") + (next ? '<a href="#' + next.id + '">' + next.id + " ›</a>" : "") + "</span></nav>";
      }
      var kv = [["Report", r.id], ["Type", r.type], ["Issued", r.issued], ["Prepared by", r.by], ["Area", r.area], ["Status", r.status]];
      reader.innerHTML = '<article class="report">' + nav("") +
        '<header class="report-head"><div class="stamp">Invented<br>report</div><p class="eyebrow">Rupen-Nordfeta · Regensburg · ' + r.id + "</p><h1>" + esc(r.title) +
        '</h1><p class="lede">' + esc(r.summary) + '</p><dl class="kv">' + kv.map(function (p) { return "<div><dt>" + p[0] + "</dt><dd>" + esc(p[1]) + "</dd></div>"; }).join("") +
        '</dl><p><button class="btn" type="button" data-print>Print this report</button></p></header><div class="report-body">' + r.body.map(block).join("") + "</div>" + nav("rnav-bottom") + "</article>";
      list.hidden = true; reader.hidden = false;
      document.title = r.id + " " + r.title + " · Rupen-Nordfeta";
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

  /* ---------- section viewer ---------- */
  function initSection() {
    var host = $("#sec-host"), panel = $("#ctx-panel"), listEl = $("#ctx-list");
    host.innerHTML = '<div class="fig-scroll">' + FIG.section({ interactive: true }) + '</div><p class="scroll-hint">Swipe sideways to see the whole section.</p>' + FIG.lithoLegend(LEGENDS.section);
    $("#bh-host").innerHTML = '<div class="fig-scroll">' + FIG.boreholes() + '</div><p class="scroll-hint">Swipe sideways to see all five holes.</p>' + FIG.lithoLegend(LEGENDS.boreholes);
    listEl.innerHTML = S.contexts.slice().sort(function (a, b) { return a.id < b.id ? -1 : 1; }).map(function (c) {
      return '<button type="button" data-id="' + c.id + '" aria-pressed="false" title="' + esc(c.name) + '"><i style="background:' + S.litho[c.litho].color + '"></i>' + c.id + "</button>";
    }).join("");

    function related(c) {
      var out = [];
      if (c.cut) out.push(["Fill of", c.cut]);
      S.contexts.forEach(function (o) { if (o.cut === c.id) out.push(["Filled by", o.id]); });
      if (c.id === "2014") out.push(["Lines", "2012"]);
      return out;
    }
    function select(id, fromUser) {
      var c = CTX[id];
      if (!c) return;
      $all(".ctx", host).forEach(function (g) { g.classList.toggle("is-sel", g.getAttribute("data-ctx") === id); });
      $all("button", listEl).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-id") === id)); });
      var p = PH[c.phase], l = S.litho[c.litho];
      panel.innerHTML = '<span class="chip">' + esc(c.kind) + '</span><div class="p-id">' + c.id + "</div><h3>" + esc(c.name) + "</h3>" +
        '<div class="swatch-line"><i style="background:' + l.color + '"></i><span class="mono">' + esc(p.id + " · " + p.name + " · " + p.span) + "</span></div>" +
        "<dl><dt>Depth</dt><dd>" + esc(c.depth) + "</dd><dt>Colour</dt><dd>" + esc(c.munsell) + "</dd><dt>Texture</dt><dd>" + esc(c.texture) +
        "</dd><dt>Date</dt><dd>" + esc(c.date) + "</dd><dt>Finds</dt><dd>" + esc(c.finds) + "</dd>" +
        related(c).map(function (r) { return "<dt>" + r[0] + "</dt><dd>" + rich("[[" + r[1] + "]]") + "</dd>"; }).join("") + "</dl>" +
        '<span class="lab">Description</span><p>' + esc(c.desc) + '</p><span class="lab">Interpretation</span><p>' + esc(c.interp) + "</p>" +
        '<span class="lab">In reports</span><p>' + c.reports.map(function (r) { return rich("{{" + r + "}}"); }).join(" · ") + "</p>";
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
    // links inside the panel to other contexts
    panel.addEventListener("click", function (e) {
      var a = e.target.closest("a.ctx-link");
      if (a) { e.preventDefault(); select(a.getAttribute("href").split("#")[1], true); }
    });
    window.addEventListener("hashchange", function () { select(location.hash.slice(1), false); });
    select(CTX[location.hash.slice(1)] ? location.hash.slice(1) : "2005", false);
  }

  document.addEventListener("DOMContentLoaded", function () {
    FIG.ensurePatterns();
    mountFigures();
    var page = document.body.getAttribute("data-page");
    if (page === "home") initHome();
    if (page === "reports") initReports();
    if (page === "section") initSection();
  });
})();
