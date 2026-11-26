/* SVG figures for the site. Each function returns an SVG string.
   Data comes from data/site.js (window.SITE). */
(function () {
  "use strict";
  var S = window.SITE;
  var L = S.litho;
  var CTX = {};
  S.contexts.forEach(function (c) { CTX[c.id] = c; });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function f(n) { return Math.round(n * 10) / 10; }
  function pts(arr) { return arr.map(function (p) { return f(p[0]) + "," + f(p[1]); }).join(" "); }
  function svgOpen(w, h, label) {
    return '<svg class="fig-svg" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(label) + '" xmlns="http://www.w3.org/2000/svg">';
  }

  /* One shared set of fill patterns per page. */
  var PAT = {
    gravel: "pt-gravel", sand: "pt-sand", tsand: "pt-sand", loam: "pt-clay", tclay: "pt-clay",
    kclay: "pt-clay", cover: "pt-clay", lime: "pt-lime", dark: "pt-dark", hut: "pt-dark",
    cess: "pt-dark", fill: "pt-fill", yard: "pt-chips", rubble: "pt-chips", floors: "pt-floors",
    garden: "pt-dark"
  };
  function ensurePatterns() {
    if (document.getElementById("rn-patterns")) return;
    var ink = "rgba(30,26,21,.42)", pale = "rgba(243,238,227,.32)";
    var defs =
      '<svg id="rn-patterns" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs>' +
      '<pattern id="pt-gravel" width="16" height="13" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="2.8" fill="none" stroke="' + ink + '"/><circle cx="12" cy="10" r="1.9" fill="none" stroke="' + ink + '"/></pattern>' +
      '<pattern id="pt-sand" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" fill="' + ink + '"/><circle cx="6" cy="6" r=".9" fill="' + ink + '"/></pattern>' +
      '<pattern id="pt-clay" width="16" height="7" patternUnits="userSpaceOnUse"><path d="M1 3.5h8" stroke="' + ink + '"/></pattern>' +
      '<pattern id="pt-lime" width="24" height="12" patternUnits="userSpaceOnUse"><path d="M0 .5h24M0 6.5h24M6 .5v6M18 6.5v6" stroke="' + ink + '" fill="none"/></pattern>' +
      '<pattern id="pt-dark" width="11" height="11" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r=".9" fill="' + pale + '"/><circle cx="8.5" cy="7.5" r=".7" fill="' + pale + '"/></pattern>' +
      '<pattern id="pt-fill" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10L10 0" stroke="' + ink + '"/></pattern>' +
      '<pattern id="pt-chips" width="18" height="12" patternUnits="userSpaceOnUse"><path d="M2 9l3-5 3 5zM11 5l2.5-3.5L16 5z" fill="none" stroke="' + ink + '"/></pattern>' +
      '<pattern id="pt-floors" width="20" height="5" patternUnits="userSpaceOnUse"><path d="M0 2.5h20" stroke="' + pale + '"/></pattern>' +
      '<pattern id="pt-cross" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M6 3v6M3 6h6" stroke="' + ink + '"/></pattern>' +
      "</defs></svg>";
    document.body.insertAdjacentHTML("afterbegin", defs);
  }

  function block(d, code, extra) {
    var l = L[code];
    var p = PAT[code];
    return '<path d="' + d + '" fill="' + l.color + '" stroke="rgba(30,26,21,.55)" stroke-width="1" ' + (extra || "") + "/>" +
      (p ? '<path d="' + d + '" fill="url(#' + p + ')" stroke="none" pointer-events="none"/>' : "");
  }

  /* ---------- Trench 2 section ---------- */
  function interp(xs, ys, x) {
    for (var i = 0; i < xs.length - 1; i++) {
      if (x <= xs[i + 1]) {
        var t = (x - xs[i]) / (xs[i + 1] - xs[i]);
        return ys[i] + t * (ys[i + 1] - ys[i]);
      }
    }
    return ys[ys.length - 1];
  }
  function topAt(i, x) {
    var sec = S.section;
    if (i >= sec.layers.length) return sec.depth;
    if (i === 0) return 0;
    var base = interp(sec.xs, sec.layers[i].tops, x);
    return base + 0.012 * Math.sin(x * 2.1 + i * 1.7) + 0.006 * Math.sin(x * 5.3 + i);
  }
  function layerIndex(id) {
    for (var i = 0; i < S.section.layers.length; i++) if (S.section.layers[i].id === id) return i;
    return -1;
  }
  function ctxGroup(id, inner, interactive) {
    var c = CTX[id];
    var label = "Context " + id + ", " + c.name;
    var a = interactive ? ' tabindex="0" role="button" aria-label="' + esc(label) + '"' : "";
    return '<g class="ctx" data-ctx="' + id + '"' + a + "><title>" + esc(label) + "</title>" + inner + "</g>";
  }

  function section(opts) {
    opts = opts || {};
    ensurePatterns();
    var sec = S.section;
    var W = 820, M = { l: 62, r: 24, t: 40, b: 56 };
    var sx = (W - M.l - M.r) / sec.width, sy = 120;
    var H = M.t + sec.depth * sy + M.b;
    function X(x) { return M.l + x * sx; }
    function Y(d) { return M.t + d * sy; }
    var steps = [];
    for (var x = 0; x <= sec.width + 1e-6; x += 0.25) steps.push(x);
    var n = sec.layers.length;
    var out = svgOpen(W, H, "Trench 2 east-facing section with fifteen contexts");
    out += '<g class="sec-layers">';

    sec.layers.forEach(function (lay, i) {
      var top = steps.map(function (x) { return [X(x), Y(topAt(i, x))]; });
      var bot = steps.slice().reverse().map(function (x) { return [X(x), Y(i + 1 < n ? topAt(i + 1, x) : sec.depth)]; });
      var d = "M" + pts(top).replace(/ /g, "L") + "L" + pts(bot).replace(/ /g, "L") + "Z";
      out += ctxGroup(lay.id, block(d, CTX[lay.id].litho), opts.interactive);
    });

    // Sunken hut: top edge follows the top of the flood loam (2008).
    var i8 = layerIndex("2008");
    var h = sec.hut, hs = [];
    for (var hx = h.x0; hx <= h.x1 + 1e-6; hx += 0.2) hs.push(hx);
    var hutTop = hs.map(function (x) { return [X(x), Y(topAt(i8, x))]; });
    var hutD = "M" + pts(hutTop).replace(/ /g, "L") + "L" + f(X(h.x1 - 0.15)) + "," + f(Y(h.base)) + "L" + f(X(h.x0 + 0.15)) + "," + f(Y(h.base)) + "Z";
    out += ctxGroup("2011", block(hutD, "hut"), opts.interactive);
    var cutD = "M" + f(X(h.x0)) + "," + f(Y(topAt(i8, h.x0))) + "L" + f(X(h.x0 + 0.15)) + "," + f(Y(h.base)) +
      "L" + f(X(h.x1 - 0.15)) + "," + f(Y(h.base)) + "L" + f(X(h.x1)) + "," + f(Y(topAt(i8, h.x1)));
    var posts = [h.x0 + 0.3, h.x1 - 0.48].map(function (px) {
      return '<rect x="' + f(X(px)) + '" y="' + f(Y(h.base)) + '" width="' + f(0.18 * sx) + '" height="' + f(0.2 * sy) + '" fill="' + L.hut.color + '" stroke="#1e1a15" stroke-width="1.4"/>';
    }).join("");
    out += ctxGroup("2010", posts + '<path d="' + cutD + '" fill="none" stroke="transparent" stroke-width="12" pointer-events="stroke"/><path d="' + cutD + '" fill="none" stroke="#1e1a15" stroke-width="1.8"/>', opts.interactive);

    // Wall footing 2015, drawn as courses of blocks.
    var w = sec.wall, wallInner = '<rect x="' + f(X(w.x0)) + '" y="' + f(Y(w.top)) + '" width="' + f((w.x1 - w.x0) * sx) + '" height="' + f((w.base - w.top) * sy) + '" fill="' + L.wall.color + '" stroke="#1e1a15" stroke-width="1.4"/>';
    var row = 0;
    for (var wy = w.top; wy < w.base - 0.01; wy += 0.16, row++) {
      var hh = Math.min(0.16, w.base - wy);
      for (var wx = w.x0 - (row % 2 ? 0.14 : 0); wx < w.x1 - 0.01; wx += 0.28) {
        var a0 = Math.max(wx, w.x0), a1 = Math.min(wx + 0.28, w.x1);
        var shade = (row * 7 + Math.round(wx * 10)) % 3 === 0 ? "#8ea083" : L.wall.color;
        wallInner += '<rect x="' + f(X(a0) + 1) + '" y="' + f(Y(wy) + 1) + '" width="' + f((a1 - a0) * sx - 2) + '" height="' + f(hh * sy - 2) + '" rx="2" fill="' + shade + '" stroke="rgba(30,26,21,.5)"/>';
      }
    }
    out += ctxGroup("2015", wallInner, opts.interactive);

    // Cesspit 2012 / 2013 / 2014.
    var p = sec.pit;
    var pitD = "M" + f(X(p.x0)) + "," + f(Y(p.top)) + "L" + f(X(p.x1)) + "," + f(Y(p.top)) + "L" + f(X(p.x1)) + "," + f(Y(p.base)) + "L" + f(X(p.x0)) + "," + f(Y(p.base)) + "Z";
    var bands = "";
    for (var by = p.top + 0.18; by < p.base - 0.1; by += 0.16) {
      bands += '<path d="M' + f(X(p.x0 + 0.1)) + "," + f(Y(by)) + "L" + f(X(p.x1 - 0.1)) + "," + f(Y(by + 0.02)) + '" stroke="rgba(243,238,227,.55)" stroke-width="1.4" pointer-events="none"/>';
    }
    out += ctxGroup("2013", block(pitD, "cess") + bands, opts.interactive);
    var lt = p.liningTop, lw = 0.08;
    var lining = [p.x0, p.x1 - lw].map(function (lx) {
      return '<rect x="' + f(X(lx)) + '" y="' + f(Y(lt)) + '" width="' + f(lw * sx) + '" height="' + f((p.base - lt) * sy) + '" fill="' + L.timber.color + '" stroke="#1e1a15"/>';
    }).join("") + '<rect x="' + f(X(p.x0)) + '" y="' + f(Y(p.base - 0.05)) + '" width="' + f((p.x1 - p.x0) * sx) + '" height="' + f(0.05 * sy) + '" fill="' + L.timber.color + '" stroke="#1e1a15"/>';
    out += ctxGroup("2014", lining, opts.interactive);
    var pcut = "M" + f(X(p.x0)) + "," + f(Y(p.top)) + "L" + f(X(p.x0)) + "," + f(Y(p.base)) + "L" + f(X(p.x1)) + "," + f(Y(p.base)) + "L" + f(X(p.x1)) + "," + f(Y(p.top));
    out += ctxGroup("2012", '<path d="' + pcut + '" fill="none" stroke="transparent" stroke-width="12" pointer-events="stroke"/><path d="' + pcut + '" fill="none" stroke="#1e1a15" stroke-width="1.8"/>', opts.interactive);
    out += "</g>";

    // Ground line and water table.
    out += '<path d="M' + f(X(0)) + "," + f(Y(0)) + "H" + f(X(sec.width)) + '" stroke="#1e1a15" stroke-width="2.2"/>';
    var gw = Y(S.groundwater);
    out += '<g pointer-events="none"><path d="M' + f(X(0)) + "," + f(gw) + "H" + f(X(sec.width)) + '" stroke="#1d4f73" stroke-width="1.6" stroke-dasharray="7 5"/>' +
      '<path d="M' + f(X(0.25)) + "," + f(gw - 11) + "l6,9 6,-9z" + '" fill="#1d4f73"/>' +
      '<text x="' + f(X(0.25) + 16) + '" y="' + f(gw - 4) + '" class="fig-t" fill="#1d4f73" font-weight="600">water table ' + S.groundwater.toFixed(2) + " m</text></g>";

    // Labels.
    var lab = '<g class="sec-labels" pointer-events="none">';
    sec.layers.forEach(function (lay, i) {
      var lx = 10.9, mid = (topAt(i, lx) + (i + 1 < n ? topAt(i + 1, lx) : sec.depth)) / 2;
      lab += '<text x="' + f(X(lx)) + '" y="' + f(Y(mid) + 4) + '" text-anchor="middle" class="fig-t fig-num" fill="' + L[CTX[lay.id].litho].ink + '">' + lay.id + "</text>";
    });
    lab += '<text x="' + f(X((h.x0 + h.x1) / 2)) + '" y="' + f(Y((topAt(i8, 2.6) + h.base) / 2) + 4) + '" text-anchor="middle" class="fig-t fig-num" fill="#f3eee3">2011</text>';
    lab += '<text x="' + f(X(h.x0 + 0.42)) + '" y="' + f(Y(h.base) - 6) + '" class="fig-t fig-sm" fill="#f3eee3">2010</text>';
    lab += '<text x="' + f(X((p.x0 + p.x1) / 2)) + '" y="' + f(Y(2.3)) + '" text-anchor="middle" class="fig-t fig-num" fill="#f3eee3">2013</text>';
    lab += '<text x="' + f(X((p.x0 + p.x1) / 2)) + '" y="' + f(Y(p.top + 0.17)) + '" text-anchor="middle" class="fig-t fig-sm" fill="#f3eee3">2012</text>';
    lab += '<text x="' + f(X((p.x0 + p.x1) / 2)) + '" y="' + f(Y(3.18)) + '" text-anchor="middle" class="fig-t fig-sm" fill="#f3eee3">2014</text>';
    lab += '<rect x="' + f(X((w.x0 + w.x1) / 2) - 19) + '" y="' + f(Y((w.top + w.base) / 2) - 10) + '" width="38" height="18" rx="3" fill="rgba(243,238,227,.9)"/>';
    lab += '<text x="' + f(X((w.x0 + w.x1) / 2)) + '" y="' + f(Y((w.top + w.base) / 2) + 4) + '" text-anchor="middle" class="fig-t fig-num" fill="#1e1a15">2015</text>';
    lab += "</g>";
    out += lab;

    // Axes.
    var ax = '<g class="fig-axis">';
    for (var dd = 0; dd <= 3.5 + 1e-6; dd += 0.5) {
      ax += '<path d="M' + f(X(0) - 6) + "," + f(Y(dd)) + "H" + f(X(0)) + '"/>';
      ax += '<text x="' + f(X(0) - 10) + '" y="' + f(Y(dd) + 4) + '" text-anchor="end">' + dd.toFixed(1) + "</text>";
    }
    ax += '<text transform="translate(16,' + f(Y(1.8)) + ') rotate(-90)" text-anchor="middle">Depth below ground (m)</text>';
    for (var xx = 0; xx <= sec.width; xx += 2) {
      ax += '<path d="M' + f(X(xx)) + "," + f(Y(sec.depth)) + "v6" + '"/>';
      ax += '<text x="' + f(X(xx)) + '" y="' + f(Y(sec.depth) + 20) + '" text-anchor="middle">' + xx + (xx === 0 ? " m" : "") + "</text>";
    }
    ax += '<text x="' + f(X(0)) + '" y="' + (M.t - 14) + '" font-weight="600">S</text>';
    ax += '<text x="' + f(X(sec.width)) + '" y="' + (M.t - 14) + '" text-anchor="end" font-weight="600">N</text>';
    ax += '<text x="' + f(X(sec.width / 2)) + '" y="' + (M.t - 14) + '" text-anchor="middle">Ground at ' + S.ground.toFixed(2) + " m above sea level · vertical scale ×2</text>";
    ax += '<text x="' + f(X(sec.width / 2)) + '" y="' + f(Y(sec.depth) + 42) + '" text-anchor="middle">Distance along the trench (m)</text>';
    ax += "</g>";
    out += ax + "</svg>";
    return out;
  }

  /* ---------- Borehole logs ---------- */
  function boreholes() {
    ensurePatterns();
    var holes = S.boreholes.slice().sort(function (a, b) { return a.y - b.y; });
    var W = 820, M = { l: 74, r: 20, t: 58, b: 34 }, top = 332, bottom = 316.5, sy = 27;
    var H = M.t + (top - bottom) * sy + M.b;
    function Y(z) { return M.t + (top - z) * sy; }
    var colW = 58, gap = (W - M.l - M.r - colW * holes.length) / (holes.length - 1);
    var out = svgOpen(W, H, "Borehole logs BH-1 to BH-5 drawn by height above sea level");
    var ax = '<g class="fig-axis">';
    for (var z = 332; z >= 317; z -= 1) {
      ax += '<path d="M' + (M.l - 14) + "," + f(Y(z)) + "h6" + '"/>';
      if (z % 2 === 0) ax += '<text x="' + (M.l - 18) + '" y="' + f(Y(z) + 4) + '" text-anchor="end">' + z + "</text>";
    }
    ax += '<text transform="translate(16,' + f(Y(324)) + ') rotate(-90)" text-anchor="middle">Height above sea level (m NHN)</text></g>';
    out += ax;
    var gwPts = [];
    holes.forEach(function (bh, k) {
      var x = M.l + k * (colW + gap);
      out += '<text x="' + f(x + colW / 2) + '" y="' + (M.t - 30) + '" text-anchor="middle" class="fig-t fig-num" fill="var(--ink)">' + bh.id + "</text>";
      out += '<text x="' + f(x + colW / 2) + '" y="' + (M.t - 14) + '" text-anchor="middle" class="fig-t fig-sm" fill="var(--ink-2)">' + bh.ground.toFixed(2) + " m</text>";
      bh.layers.forEach(function (ly) {
        var y0 = Y(bh.ground - ly[0]), y1 = Y(bh.ground - ly[1]);
        var d = "M" + f(x) + "," + f(y0) + "H" + f(x + colW) + "V" + f(y1) + "H" + f(x) + "Z";
        out += "<g><title>" + esc(bh.id + "  " + ly[0].toFixed(2) + "–" + ly[1].toFixed(2) + " m: " + ly[3]) + "</title>" + block(d, ly[2]) + "</g>";
      });
      if (bh.id === "BH-1") {
        // open karst void 12.9–13.3 m
        var vy0 = Y(bh.ground - 12.9), vy1 = Y(bh.ground - 13.3);
        out += '<rect x="' + f(x + 1) + '" y="' + f(vy0) + '" width="' + (colW - 2) + '" height="' + f(vy1 - vy0) + '" fill="var(--paper)" stroke="#1e1a15" stroke-dasharray="3 2"><title>Open karst void 12.9–13.3 m</title></rect>';
        out += '<text x="' + f(x + colW + 6) + '" y="' + f((vy0 + vy1) / 2 + 4) + '" class="fig-t fig-sm" fill="var(--ink-2)">void</text>';
      }
      var yb = Y(bh.ground - bh.depth);
      out += '<text x="' + f(x + colW / 2) + '" y="' + f(yb + 16) + '" text-anchor="middle" class="fig-t fig-sm" fill="var(--ink-2)">end ' + bh.depth.toFixed(1) + " m</text>";
      var gy = Y(bh.ground - bh.gw);
      gwPts.push([x + colW / 2, gy]);
      out += '<g><title>' + esc(bh.id + " water table " + bh.gw.toFixed(2) + " m below ground (" + (bh.ground - bh.gw).toFixed(2) + " m NHN)") + '</title><path d="M' + f(x - 12) + "," + f(gy - 9) + "l6,9 6,-9z" + '" fill="#2f74a6"/><path d="M' + f(x - 4) + "," + f(gy) + "h" + (colW + 8) + '" stroke="#2f74a6" stroke-width="2"/></g>';
    });
    out += '<path d="M' + pts(gwPts).replace(/ /g, "L") + '" fill="none" stroke="#2f74a6" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/>';
    out += '<text x="' + (W - M.r) + '" y="' + (H - 8) + '" text-anchor="end" class="fig-t fig-sm" fill="var(--ink-2)">north (river side) ← → south</text>';
    out += "</svg>";
    return out;
  }

  function lithoLegend(codes) {
    ensurePatterns();
    return '<ul class="legend">' + codes.map(function (c) {
      var p = PAT[c];
      return '<li><svg width="22" height="16" aria-hidden="true"><rect width="22" height="16" fill="' + L[c].color + '" stroke="rgba(30,26,21,.5)"/>' +
        (p ? '<rect width="22" height="16" fill="url(#' + p + ')"/>' : "") + "</svg>" + esc(L[c].name) + "</li>";
    }).join("") + "</ul>";
  }

  /* ---------- Grain size bars ---------- */
  function grain() {
    var rows = S.sediments, W = 820, M = { l: 196, r: 20, t: 50, b: 30 }, rh = 30;
    var H = M.t + rows.length * rh + M.b, bw = W - M.l - M.r;
    var parts = [
      { k: "Clay", i: 1, c: "#5b4030", t: "#f3eee3" },
      { k: "Silt", i: 2, c: "#8f6c4a", t: "#f3eee3" },
      { k: "Sand", i: 3, c: "#d3b98a", t: "#1e1a15" },
      { k: "Gravel", i: 4, c: "#8d8b84", t: "#1e1a15" }
    ];
    var out = svgOpen(W, H, "Grain size of nine contexts as stacked bars");
    var lx = M.l;
    parts.forEach(function (p) {
      out += '<rect x="' + lx + '" y="12" width="14" height="14" fill="' + p.c + '"/><text x="' + (lx + 20) + '" y="24" class="fig-t" fill="var(--ink)">' + p.k + "</text>";
      lx += 96;
    });
    rows.forEach(function (r, k) {
      var y = M.t + k * rh;
      out += '<text x="' + (M.l - 10) + '" y="' + (y + 19) + '" text-anchor="end" class="fig-t" fill="var(--ink)"><tspan font-weight="600">' + r[0] + "</tspan> " + esc(CTX[r[0]].name) + "</text>";
      var x = M.l;
      parts.forEach(function (p) {
        var v = r[p.i], w = bw * v / 100;
        if (w > 0) {
          out += '<rect x="' + f(x) + '" y="' + (y + 4) + '" width="' + f(w) + '" height="' + (rh - 8) + '" fill="' + p.c + '"><title>' + r[0] + " " + p.k + " " + v + "%</title></rect>";
          if (v >= 8) out += '<text x="' + f(x + w / 2) + '" y="' + (y + 19) + '" text-anchor="middle" class="fig-t fig-sm" fill="' + p.t + '">' + v + "%</text>";
        }
        x += w;
      });
    });
    var ax = '<g class="fig-axis">';
    [0, 25, 50, 75, 100].forEach(function (v) {
      var x = M.l + bw * v / 100;
      ax += '<path d="M' + f(x) + "," + (M.t + rows.length * rh) + "v6" + '"/><text x="' + f(x) + '" y="' + (M.t + rows.length * rh + 20) + '" text-anchor="middle">' + v + "%</text>";
    });
    return out + ax + "</g></svg>";
  }

  /* ---------- Harris matrix ---------- */
  function matrix() {
    var W = 760, bw = 196, bh = 26, rh = 36, t = 14;
    var C = 380, A = 268, B = 492;
    var nodes = {
      "2001": [C, 0], "2002": [C, 1], "2003": [C, 2], "2015": [A, 3], "2013": [B, 3], "2014": [B, 4], "2012": [B, 5],
      "2004": [C, 6], "2005": [C, 7], "2006": [C, 8], "2007": [C, 9], "2011": [C, 10], "2010": [C, 11], "2008": [C, 12], "2009": [C, 13]
    };
    var links = [["2001", "2002"], ["2002", "2003"], ["2003", "2015"], ["2003", "2013"], ["2013", "2014"], ["2014", "2012"], ["2015", "2004"], ["2012", "2004"],
      ["2004", "2005"], ["2005", "2006"], ["2006", "2007"], ["2007", "2011"], ["2011", "2010"], ["2010", "2008"], ["2008", "2009"]];
    var H = t + 14 * rh + 10;
    var out = svgOpen(W, H, "Harris matrix of Trench 2");
    function cy(id) { return t + nodes[id][1] * rh; }
    links.forEach(function (lk) {
      var a = nodes[lk[0]], b = nodes[lk[1]];
      var y0 = cy(lk[0]) + bh, y1 = cy(lk[1]), ym = (y0 + y1) / 2;
      out += '<path d="M' + a[0] + "," + y0 + "V" + ym + "H" + b[0] + "V" + y1 + '" fill="none" stroke="var(--ink-2)" stroke-width="1.4"/>';
    });
    Object.keys(nodes).forEach(function (id) {
      var nd = nodes[id], c = CTX[id], y = cy(id);
      out += '<a href="section.html#' + id + '"><g class="mx-node"><title>' + esc(id + " " + c.name + " (" + c.kind + ")") + "</title>" +
        '<rect x="' + (nd[0] - bw / 2) + '" y="' + y + '" width="' + bw + '" height="' + bh + '" rx="4" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="1.2"/>' +
        '<rect x="' + (nd[0] - bw / 2) + '" y="' + y + '" width="8" height="' + bh + '" rx="2" fill="' + L[c.litho].color + '"/>' +
        '<text x="' + (nd[0] - bw / 2 + 16) + '" y="' + (y + 17) + '" class="fig-t" fill="var(--ink)"><tspan font-weight="700">' + id + "</tspan> " + esc(c.name.length > 20 ? c.name.slice(0, 19) + "…" : c.name) + "</text></g></a>";
    });
    var ph = [["P4", 0, 2], ["P3", 3, 7], ["P2", 8, 8], ["P1", 9, 11], ["P0", 12, 13]];
    ph.forEach(function (p) {
      var y0 = t + p[1] * rh - 4, y1 = t + p[2] * rh + bh + 4;
      out += '<path d="M' + (W - 60) + "," + y0 + "V" + y1 + '" stroke="var(--accent)" stroke-width="3"/>' +
        '<text x="' + (W - 50) + '" y="' + ((y0 + y1) / 2 + 4) + '" class="fig-t" fill="var(--accent)" font-weight="700">' + p[0] + "</text>";
    });
    out += '<text x="20" y="' + (t + 12) + '" class="fig-t fig-sm" fill="var(--ink-2)">latest</text><text x="20" y="' + (H - 16) + '" class="fig-t fig-sm" fill="var(--ink-2)">earliest</text>';
    out += '<path d="M40,' + (t + 20) + "V" + (H - 30) + '" stroke="var(--ink-2)" marker-end="url(#mx-arrow)"/>';
    out += '<defs><marker id="mx-arrow" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto"><path d="M0,0 L8,0 L4,7z" fill="var(--ink-2)"/></marker></defs>';
    return out + "</svg>";
  }

  /* ---------- Flood sand thickness ---------- */
  function flood() {
    var rows = S.flood, W = 820, M = { l: 120, r: 30, t: 16, b: 40 }, rh = 34, max = 0.35;
    var H = M.t + rows.length * rh + M.b, bw = W - M.l - M.r;
    var out = svgOpen(W, H, "Flood sand thickness across the plot");
    rows.forEach(function (r, k) {
      var y = M.t + k * rh;
      out += '<text x="' + (M.l - 12) + '" y="' + (y + 21) + '" text-anchor="end" class="fig-t" fill="var(--ink)">' + esc(r.where) + "</text>";
      if (r.m > 0) {
        var w = bw * r.m / max;
        out += '<rect x="' + M.l + '" y="' + (y + 6) + '" width="' + f(w) + '" height="' + (rh - 12) + '" fill="' + L.sand.color + '" stroke="rgba(30,26,21,.5)"/>' +
          '<rect x="' + M.l + '" y="' + (y + 6) + '" width="' + f(w) + '" height="' + (rh - 12) + '" fill="url(#pt-sand)"/>' +
          '<text x="' + f(M.l + w + 8) + '" y="' + (y + 21) + '" class="fig-t" fill="var(--ink)">' + r.m.toFixed(2) + " m</text>";
      } else {
        out += '<text x="' + (M.l + 4) + '" y="' + (y + 21) + '" class="fig-t" fill="var(--ink-2)" font-style="italic">no flood sand: ground stood higher</text>';
      }
    });
    var ax = '<g class="fig-axis">';
    [0, 0.1, 0.2, 0.3].forEach(function (v) {
      var x = M.l + bw * v / max;
      ax += '<path d="M' + f(x) + "," + (M.t + rows.length * rh) + "v6" + '"/><text x="' + f(x) + '" y="' + (M.t + rows.length * rh + 20) + '" text-anchor="middle">' + v.toFixed(1) + " m</text>";
    });
    ax += '<text x="' + (M.l - 12) + '" y="' + (M.t - 2) + '" text-anchor="end" font-weight="600">north</text>';
    ax += '<text x="' + (M.l - 34) + '" y="' + (M.t + rows.length * rh + 20) + '" text-anchor="end" font-weight="600">south</text>';
    return out + ax + "</g></svg>";
  }

  /* ---------- Stone counts ---------- */
  function stones() {
    var W = 820, M = { l: 20, r: 20 }, H = 64, bw = W - M.l - M.r, x = M.l;
    var out = svgOpen(W, H, "Stone chips by weight: 71 percent limestone, 24 percent Grünsandstein, 5 percent other");
    S.stones.forEach(function (s) {
      var w = bw * s.pct / 100;
      out += '<rect x="' + f(x) + '" y="8" width="' + f(w) + '" height="44" fill="' + s.color + '" stroke="var(--paper)" stroke-width="2"><title>' + esc(s.name + " " + s.pct + "%") + "</title></rect>";
      if (s.pct >= 10) out += '<text x="' + f(x + 12) + '" y="36" class="fig-t fig-num" fill="#1e1a15">' + s.pct + "% " + esc(s.name.split(" (")[0]) + "</text>";
      x += w;
    });
    return out + "</svg>" + '<ul class="legend">' + S.stones.map(function (s) {
      return '<li><span class="sw" style="background:' + s.color + '"></span>' + s.pct + "% " + esc(s.name) + "</li>";
    }).join("") + "</ul>";
  }

  /* ---------- Dates ---------- */
  function dates() {
    var rows = [
      ["Pfennig, rubble 2003", 1500, 1530, "coin"],
      ["Oak lining 2014 (tree rings)", 1361, 1362, "dendro"],
      ["Pfennigs, floors 2004", 1300, 1400, "coin"],
      ["RNF-5 rye, floors 2004", 1310, 1410, "c14"],
      ["OSL, flood sand 2005", 1299, 1389, "osl"],
      ["RNF-4 charcoal, yard 2006", 1035, 1160, "c14"],
      ["RNF-3 dark earth 2007, upper", 895, 1015, "c14"],
      ["RNF-2 dark earth 2007, lower", 772, 890, "c14"],
      ["RNF-1 barley, hut 2011", 664, 774, "c14"]
    ];
    var W = 820, M = { l: 230, r: 24, t: 34, b: 40 }, rh = 28, a = 600, b = 1600;
    var H = M.t + rows.length * rh + M.b, bw = W - M.l - M.r;
    function X(yr) { return M.l + (yr - a) / (b - a) * bw; }
    var col = { c14: "var(--accent)", osl: "#c49a3a", dendro: "var(--accent-2)", coin: "#8a7a5a" };
    var out = svgOpen(W, H, "Date ranges for Trench 2 in stratigraphic order");
    var ax = '<g class="fig-axis">';
    for (var yr = a; yr <= b; yr += 100) {
      ax += '<path d="M' + f(X(yr)) + "," + M.t + "V" + (M.t + rows.length * rh) + '" stroke-dasharray="2 4" opacity=".5"/>' +
        '<text x="' + f(X(yr)) + '" y="' + (M.t + rows.length * rh + 20) + '" text-anchor="middle">' + yr + "</text>";
    }
    ax += '<text x="' + f(X(1100)) + '" y="' + (M.t + rows.length * rh + 36) + '" text-anchor="middle">Year AD</text></g>';
    out += ax;
    out += '<path d="M' + f(X(1342)) + "," + (M.t - 10) + "V" + (M.t + rows.length * rh) + '" stroke="var(--accent-2)" stroke-width="1.6"/>' +
      '<text x="' + f(X(1342) - 6) + '" y="' + (M.t - 14) + '" text-anchor="end" class="fig-t fig-sm" fill="var(--accent-2)" font-weight="700">July 1342 flood</text>';
    rows.forEach(function (r, k) {
      var y = M.t + k * rh;
      out += '<text x="' + (M.l - 12) + '" y="' + (y + 18) + '" text-anchor="end" class="fig-t" fill="var(--ink)">' + esc(r[0]) + "</text>";
      if (r[3] === "dendro") {
        var cx = X(1361.5);
        out += '<path d="M' + f(cx) + "," + (y + 5) + "l8,9 -8,9 -8,-9z" + '" fill="' + col.dendro + '"><title>Felled winter 1361/62</title></path>' +
          '<text x="' + f(cx + 14) + '" y="' + (y + 18) + '" class="fig-t fig-sm" fill="var(--ink)">winter 1361/62</text>';
      } else {
        out += '<rect x="' + f(X(r[1])) + '" y="' + (y + 7) + '" width="' + f(Math.max(4, X(r[2]) - X(r[1]))) + '" height="14" rx="3" fill="' + col[r[3]] + '"' + (r[3] === "coin" ? ' opacity=".6"' : "") + "><title>" + esc(r[0] + ": " + r[1] + "–" + r[2]) + "</title></rect>";
      }
    });
    return out + "</svg>";
  }

  /* ---------- Site plan ---------- */
  function plan() {
    var W = 820, sc = 11, ox = 70, oy = 52, pw = 60 * sc, ph = 40 * sc, H = oy + ph + 56;
    var out = svgOpen(W, H, "Site plan of the plot with four trenches and five boreholes");
    out += '<path d="M' + ox + "," + (oy - 30) + " q40,-10 80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0 t80,0" + '" fill="none" stroke="#2f74a6" stroke-width="2.5" opacity=".8"/>';
    out += '<text x="' + (ox + pw / 2) + '" y="' + (oy - 38) + '" text-anchor="middle" class="fig-t" fill="var(--ink-2)">towards the Danube</text>';
    out += '<rect x="' + ox + '" y="' + oy + '" width="' + pw + '" height="' + ph + '" fill="var(--paper-2)" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="8 4"/>';
    for (var gx = 10; gx < 60; gx += 10) out += '<path d="M' + (ox + gx * sc) + "," + oy + "v" + ph + '" stroke="var(--rule)"/>';
    for (var gy = 10; gy < 40; gy += 10) out += '<path d="M' + ox + "," + (oy + gy * sc) + "h" + pw + '" stroke="var(--rule)"/>';
    S.trenches.forEach(function (t) {
      var main = t.id === "T2";
      var r = '<rect x="' + (ox + t.x * sc) + '" y="' + (oy + t.y * sc) + '" width="' + t.w * sc + '" height="' + t.h * sc + '" fill="' + (main ? "var(--accent)" : "var(--paper)") + '" fill-opacity="' + (main ? ".85" : "1") + '" stroke="var(--ink)" stroke-width="1.5"/>' +
        '<text x="' + (ox + (t.x + t.w / 2) * sc) + '" y="' + (oy + (t.y + t.h / 2) * sc + 5) + '" text-anchor="middle" class="fig-t fig-num" fill="' + (main ? "var(--paper)" : "var(--ink)") + '">' + t.id + "</text>";
      out += (main ? '<a href="section.html">' : "") + '<g class="plan-trench"><title>' + esc(t.id + ": " + t.note) + "</title>" + r + "</g>" + (main ? "</a>" : "");
    });
    S.boreholes.forEach(function (b) {
      out += '<g><title>' + esc(b.id + ": " + b.depth.toFixed(1) + " m deep, water at " + b.gw.toFixed(2) + " m") + '</title><circle cx="' + (ox + b.x * sc) + '" cy="' + (oy + b.y * sc) + '" r="6.5" fill="var(--accent-2)" stroke="var(--paper)" stroke-width="2"/>' +
        '<text x="' + (ox + b.x * sc + 10) + '" y="' + (oy + b.y * sc - 8) + '" class="fig-t fig-sm" fill="var(--ink)" font-weight="700">' + b.id + "</text></g>";
    });
    var nx = ox + pw + 36, ny = oy + 30;
    out += '<path d="M' + nx + "," + (ny + 30) + "L" + nx + "," + ny + '" stroke="var(--ink)" stroke-width="2"/><path d="M' + (nx - 7) + "," + (ny + 10) + "L" + nx + "," + (ny - 4) + "L" + (nx + 7) + "," + (ny + 10) + 'z" fill="var(--ink)"/><text x="' + nx + '" y="' + (ny + 48) + '" text-anchor="middle" class="fig-t" font-weight="700" fill="var(--ink)">N</text>';
    var sy = oy + ph + 30;
    out += '<path d="M' + ox + "," + sy + "h" + 10 * sc + "M" + ox + "," + (sy - 5) + "v10M" + (ox + 10 * sc) + "," + (sy - 5) + "v10" + '" stroke="var(--ink)" stroke-width="1.5"/><text x="' + (ox + 10 * sc + 8) + '" y="' + (sy + 4) + '" class="fig-t fig-sm" fill="var(--ink-2)">10 m</text>';
    out += '<text x="' + (ox + pw) + '" y="' + (sy + 4) + '" text-anchor="end" class="fig-t fig-sm" fill="var(--ink-2)">Plot 60 × 40 m · trench T2 opens the section</text>';
    return out + "</svg>";
  }

  /* ---------- Schematic cross-section of the Regensburg area ---------- */
  function xsec() {
    ensurePatterns();
    var W = 820, H = 372;
    function line(p) { return p.map(function (q) { return q[0] + "," + q[1]; }).join(" L"); }
    var ground = [[0, 128], [60, 120], [130, 116], [220, 126], [300, 146], [350, 166], [400, 172], [560, 170], [600, 168]];
    var right = [[600, 168], [618, 128], [660, 98], [720, 74], [770, 66], [820, 78]];
    function faultX(y) { return 600 + (y - 168) * 0.14; }
    function gAt(x) {
      for (var i = 0; i < ground.length - 1; i++) if (x <= ground[i + 1][0]) {
        var t = (x - ground[i][0]) / (ground[i + 1][0] - ground[i][0]);
        return ground[i][1] + t * (ground[i + 1][1] - ground[i][1]);
      }
      return 168;
    }
    function fillAbove(base, x0, x1) {
      var top = ground.filter(function (p) { return p[0] > x0 && p[0] < x1; });
      var pts2 = [[x0, gAt(x0)]].concat(top).concat([[x1, gAt(x1)]]);
      return "M" + line(pts2.concat(base.slice().reverse())) + "Z";
    }
    var jurBase = [[0, 318], [faultX(292), 292]];
    var creBase = [[200, 248.7], [faultX(222), 222]];
    var molBase = [[0, 258], [200, 246], [400, 206], [480, 171]];
    var grvBase = [[330, 160], [380, 194], [560, 197], [faultX(192), 192]];
    function ss(d, c, p) {
      return '<path d="' + d + '" fill="' + c + '" stroke="rgba(30,26,21,.5)"/>' + (p ? '<path d="' + d + '" fill="url(#' + p + ')"/>' : "");
    }
    var out = svgOpen(W, H, "Schematic geological cross-section of the Regensburg area from south-west to north-east");
    out += ss("M" + line(ground.concat(right)) + " L820," + H + " L0," + H + "Z", "#c9b3ab", "pt-cross");
    out += ss(fillAbove(jurBase, 0, 600) , "#dcd8cc", "pt-lime");
    out += ss(fillAbove(creBase, 200, 600), "#93a985", "pt-sand");
    out += ss(fillAbove(molBase, 0, 480), "#dcc78e", "pt-clay");
    out += ss(fillAbove(grvBase, 330, 600), "#c2b494", "pt-gravel");
    // loess skin on the southern slopes
    var lo = ground.filter(function (p) { return p[0] >= 60 && p[0] <= 300; });
    out += '<path d="M' + line(lo) + " L" + line(lo.slice().reverse().map(function (p) { return [p[0], p[1] + 9]; })) + 'Z" fill="#e2c27e" stroke="rgba(30,26,21,.5)"/>';
    // Danube channel
    out += '<path d="M440,' + f(gAt(440)) + " Q470," + f(gAt(470) + 12) + " 500," + f(gAt(500)) + 'Z" fill="#4f86ad"/>';
    // fault
    out += '<path d="M600,168 L' + f(faultX(H)) + "," + H + '" stroke="#7a1f12" stroke-width="3"/>';
    out += '<path d="M' + f(faultX(250) - 14) + ",250 l0,-16 M" + f(faultX(250) + 14) + ",250 l0,16" + '" stroke="#7a1f12" stroke-width="2" marker-end="url(#xs-arr)"/>';
    out += '<defs><marker id="xs-arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#7a1f12"/></marker></defs>';
    // labels
    var T = function (x, y, s, o) { return '<text x="' + x + '" y="' + y + '" class="fig-t' + (o && o.sm ? " fig-sm" : "") + '" fill="' + ((o && o.c) || "#1e1a15") + '"' + (o && o.a ? ' text-anchor="' + o.a + '"' : "") + (o && o.b ? ' font-weight="700"' : "") + ">" + s + "</text>"; };
    out += T(40, 300, "Upper Jurassic limestone (karst)");
    out += T(70, 205, "Tertiary Molasse");
    out += T(424, 219, "Cretaceous (Grünsandstein)", { sm: 1, b: 1 });
    out += T(520, 188, "Danube gravels", { sm: 1, a: "middle" });
    out += T(690, 200, "Crystalline basement", { a: "middle", b: 1 });
    out += T(690, 218, "gneiss and granite", { a: "middle", sm: 1 });
    out += T(700, 52, "Bavarian Forest", { a: "middle", c: "var(--ink)", b: 1 });
    out += T(150, 100, "loess", { a: "middle", c: "var(--ink-2)", sm: 1 });
    out += '<path d="M150,104 L150,113" stroke="var(--ink-2)"/>';
    out += T(470, 150, "Danube", { a: "middle", c: "#2f74a6", b: 1 });
    out += '<path d="M420,166 V138 M420,138 h-6 v-10 h12 v10z" stroke="var(--ink)" fill="var(--ink)"/>';
    out += T(408, 124, "Regensburg", { a: "end", c: "var(--ink)", b: 1 });
    out += T(636, 290, "Danube boundary fault", { sm: 1, c: "#5b130a", b: 1 });
    out += T(636, 304, "(Donaurandbruch)", { sm: 1, c: "#5b130a" });
    out += T(12, 22, "SW", { c: "var(--ink-2)", b: 1 });
    out += T(808, 22, "NE", { c: "var(--ink-2)", b: 1, a: "end" });
    out += T(410, 22, "Schematic, not to scale", { c: "var(--ink-2)", a: "middle", sm: 1 });
    return out + "</svg>";
  }

  window.FIG = {
    section: section, boreholes: boreholes, grain: grain, matrix: matrix, flood: flood,
    stones: stones, dates: dates, plan: plan, xsec: xsec, lithoLegend: lithoLegend,
    ensurePatterns: ensurePatterns
  };
})();
