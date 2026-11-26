/* SVG figures for the site. Each function returns an SVG string.
   Layer data comes from data/layers.js (window.LAYERS). */
(function () {
  "use strict";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function f(n) { return Math.round(n * 10) / 10; }
  function svgOpen(w, h, label) {
    return '<svg class="fig-svg" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(label) + '" xmlns="http://www.w3.org/2000/svg">';
  }

  /* One shared set of fill patterns per page. */
  function ensurePatterns() {
    if (document.getElementById("rn-patterns")) return;
    var ink = "rgba(30,26,21,.42)", pale = "rgba(243,238,227,.32)";
    var defs =
      '<svg id="rn-patterns" width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs>' +
      '<pattern id="pt-gravel" width="16" height="13" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="2.8" fill="none" stroke="' + ink + '"/><circle cx="12" cy="10" r="1.9" fill="none" stroke="' + ink + '"/></pattern>' +
      '<pattern id="pt-sand" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".9" fill="' + ink + '"/><circle cx="6" cy="6" r=".9" fill="' + ink + '"/></pattern>' +
      '<pattern id="pt-clay" width="16" height="7" patternUnits="userSpaceOnUse"><path d="M1 3.5h8" stroke="' + ink + '"/></pattern>' +
      '<pattern id="pt-lime" width="24" height="12" patternUnits="userSpaceOnUse"><path d="M0 .5h24M0 6.5h24M6 .5v6M18 6.5v6" stroke="' + ink + '" fill="none"/></pattern>' +
      '<pattern id="pt-fill" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 10L10 0" stroke="' + ink + '"/></pattern>' +
      '<pattern id="pt-chips" width="18" height="12" patternUnits="userSpaceOnUse"><path d="M2 9l3-5 3 5zM11 5l2.5-3.5L16 5z" fill="none" stroke="' + ink + '"/></pattern>' +
      '<pattern id="pt-floors" width="20" height="5" patternUnits="userSpaceOnUse"><path d="M0 2.5h20" stroke="' + pale + '"/></pattern>' +
      '<pattern id="pt-cross" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M6 3v6M3 6h6" stroke="' + ink + '"/></pattern>' +
      "</defs></svg>";
    document.body.insertAdjacentHTML("afterbegin", defs);
  }

  /* ---------- The layers under the square (schematic column) ---------- */
  function layers(opts) {
    opts = opts || {};
    ensurePatterns();
    var LY = window.LAYERS;
    var H_BAND = { L1: 34, L2: 64, L3: 64, L4: 122, GAP: 46, L5: 104, NAT: 64 };
    var W = 820, top = 34, x0 = 190, x1 = 500;
    var y = top, pos = {};
    LY.forEach(function (l) { pos[l.id] = { y: y, h: H_BAND[l.id] || 60 }; y += pos[l.id].h; });
    var H = y + 26;
    var out = svgOpen(W, H, "Schematic column of the layers under Neupfarrplatz, youngest at the top");
    LY.forEach(function (l) {
      var p = pos[l.id];
      var a = opts.interactive ? ' tabindex="0" role="button" aria-label="' + esc(l.name + ", " + l.span) + '"' : "";
      var g = '<g class="ctx" data-ctx="' + l.id + '"' + a + "><title>" + esc(l.name + " (" + l.span + ")") + "</title>" +
        '<rect x="' + x0 + '" y="' + p.y + '" width="' + (x1 - x0) + '" height="' + p.h + '" fill="' + l.color + '"' +
        (l.gap ? ' fill-opacity=".55" stroke="rgba(30,26,21,.6)" stroke-dasharray="6 4"' : ' stroke="rgba(30,26,21,.55)"') + "/>" +
        (l.pattern ? '<rect x="' + x0 + '" y="' + p.y + '" width="' + (x1 - x0) + '" height="' + p.h + '" fill="url(#' + l.pattern + ')" pointer-events="none"/>' : "");
      if (l.id === "L4") {
        // vaulted cellars (in their own group so selection styling skips them)
        g += '<g pointer-events="none">';
        [0, 1, 2].forEach(function (k) {
          var cx = x0 + 60 + k * 110, by = p.y + p.h - 14, w = 74, hh = 54;
          g += '<path d="M' + (cx - w / 2) + "," + by + " V" + (by - hh + 26) + " Q" + cx + "," + (by - hh - 16) + " " + (cx + w / 2) + "," + (by - hh + 26) + " V" + by + 'Z" fill="rgba(243,238,227,.16)" stroke="rgba(243,238,227,.75)" stroke-width="1.6" pointer-events="none"/>';
        });
        g += '<text x="' + (x0 + 10) + '" y="' + (p.y + 18) + '" class="fig-t fig-sm" fill="#f3eee3">vaulted cellars, synagogue</text></g>';
      }
      if (l.gap) g += '<text x="' + ((x0 + x1) / 2) + '" y="' + (p.y + p.h / 2 + 5) + '" text-anchor="middle" class="fig-t" fill="#1e1a15" pointer-events="none">not described in the sources</text>';
      g += "</g>";
      out += g;
      // right-hand labels
      out += '<text x="' + (x1 + 16) + '" y="' + (p.y + p.h / 2 - 2) + '" class="fig-t fig-num" fill="var(--ink)">' + esc(l.name) + "</text>" +
        '<text x="' + (x1 + 16) + '" y="' + (p.y + p.h / 2 + 13) + '" class="fig-t fig-sm" fill="var(--ink-2)">' + esc(l.span) + "</text>";
    });
    // The 1939/40 bunker gallery cuts down from the 20th-century layer to the level of the cellars.
    var b2 = pos.L2, b4 = pos.L4, bx = x1 - 118, bw = 78, byTop = b2.y + 26, byBot = b4.y + 70;
    out += '<g class="ctx" data-ctx="L2"' + (opts.interactive ? ' tabindex="-1"' : "") + "><title>Ring bunker 1939/40, at the level of the medieval cellars</title>" +
      '<rect x="' + bx + '" y="' + byTop + '" width="' + bw + '" height="' + (byBot - byTop) + '" fill="#9a958b" stroke="#1e1a15" stroke-width="1.6"/>' +
      '<rect x="' + bx + '" y="' + byTop + '" width="' + bw + '" height="' + (byBot - byTop) + '" fill="url(#pt-cross)" pointer-events="none"/>' +
      '<rect x="' + (bx + 12) + '" y="' + (byBot - 46) + '" width="' + (bw - 24) + '" height="34" fill="#d9d5ca" stroke="#1e1a15"/>' +
      '<text x="' + (bx + bw / 2) + '" y="' + (byTop + 16) + '" text-anchor="middle" class="fig-t fig-sm" fill="#1e1a15" font-weight="700">bunker</text></g>';
    // depth notes on the left
    function note(yy, text1, text2) {
      return '<path d="M' + (x0 - 10) + "," + f(yy) + "H" + (x0 - 2) + '" stroke="var(--ink)" stroke-width="1.6"/>' +
        '<text x="' + (x0 - 16) + '" y="' + f(yy + 1) + '" text-anchor="end" class="fig-t fig-num" fill="var(--ink)">' + text1 + "</text>" +
        (text2 ? '<text x="' + (x0 - 16) + '" y="' + f(yy + 15) + '" text-anchor="end" class="fig-t fig-sm" fill="var(--ink-2)">' + text2 + "</text>" : "");
    }
    out += note(pos.L1.y, "surface", "today's square");
    out += note(byTop, "≈ 1.5 m", "bunker roof [21]");
    out += note(pos.L5.y, "≈ 6 m", "Roman remains [18]");
    out += '<path d="M' + (x0 - 6) + "," + pos.L1.y + "V" + (pos.NAT.y + pos.NAT.h) + '" stroke="var(--ink-2)" stroke-dasharray="2 4"/>';
    out += '<text x="' + x0 + '" y="' + (top - 12) + '" class="fig-t fig-sm" fill="var(--ink-2)">Youngest at the top · schematic, not to scale</text>';
    return out + "</svg>";
  }

  /* ---------- Schematic plan of the synagogue ---------- */
  function synagogue() {
    var W = 820, H = 470, s = 36, cy = 235;
    var axis = Math.sqrt(16.2 * 16.2 - Math.pow((9.2 - 6.3) / 2, 2)); // length along the axis if symmetric
    var xw = 120, xe = xw + axis * s, hw = 6.3 / 2 * s, he = 9.2 / 2 * s;
    var out = svgOpen(W, H, "Schematic plan of the medieval synagogue drawn from its published measurements");
    out += '<path d="M' + f(xw) + "," + f(cy - hw) + " L" + f(xe) + "," + f(cy - he) + " L" + f(xe) + "," + f(cy + he) + " L" + f(xw) + "," + f(cy + hw) + 'Z" fill="var(--paper-3)" stroke="var(--ink)" stroke-width="7" stroke-linejoin="miter"/>';
    // three columns on the axis, bima around the middle one
    var cols = [0.25, 0.5, 0.75].map(function (t) { return xw + axis * s * t; });
    var bl = 3.5 * s, bwid = 3.25 * s;
    out += '<rect x="' + f(cols[1] - bl / 2) + '" y="' + f(cy - bwid / 2) + '" width="' + f(bl) + '" height="' + f(bwid) + '" fill="var(--accent)" fill-opacity=".22" stroke="var(--accent)" stroke-width="2"/>';
    out += '<text x="' + f(cols[1]) + '" y="' + f(cy - bwid / 2 - 8) + '" text-anchor="middle" class="fig-t fig-sm" fill="var(--accent)" font-weight="700">bima 3.50 × 3.25 m</text>';
    cols.forEach(function (cx) { out += '<circle cx="' + f(cx) + '" cy="' + cy + '" r="9" fill="var(--ink)"/>'; });
    out += '<text x="' + f(cols[0]) + '" y="' + (cy + 28) + '" text-anchor="middle" class="fig-t fig-sm" fill="var(--ink-2)">column</text>';
    // Torah shrine on the east wall
    out += '<rect x="' + f(xe - 22) + '" y="' + (cy - 26) + '" width="18" height="52" fill="var(--accent-2)"/>' +
      '<text x="' + f(xe - 30) + '" y="' + (cy + 4) + '" text-anchor="end" class="fig-t fig-sm" fill="var(--accent-2)" font-weight="700">Torah shrine</text>';
    // dimensions
    function dim(x1, y1, x2, y2, label, dx, dy, anchor) {
      return '<path d="M' + f(x1) + "," + f(y1) + "L" + f(x2) + "," + f(y2) + '" stroke="var(--ink-2)" stroke-width="1"/>' +
        '<text x="' + f((x1 + x2) / 2 + dx) + '" y="' + f((y1 + y2) / 2 + dy) + '" text-anchor="' + (anchor || "middle") + '" class="fig-t fig-num" fill="var(--ink)">' + label + "</text>";
    }
    out += dim(xw - 26, cy - hw, xw - 26, cy + hw, "west 6.30 m", -8, 4, "end");
    out += dim(xe + 26, cy - he, xe + 26, cy + he, "east 9.20 m", 8, 4, "start");
    out += dim(xw, cy - hw - 26, xe, cy - he - 26, "long walls 16.20 m", 0, -8);
    out += '<text x="' + f((xw + xe) / 2) + '" y="' + f(cy + he + 30) + '" text-anchor="middle" class="fig-t fig-sm" fill="var(--ink-2)">two naves, divided by three columns · doors on the north and south sides (south later walled up)</text>';
    // north arrow and scale
    out += '<path d="M' + (W - 40) + ",70 V36" + '" stroke="var(--ink)" stroke-width="2"/><path d="M' + (W - 47) + ",46 L" + (W - 40) + ",32 L" + (W - 33) + ',46z" fill="var(--ink)"/><text x="' + (W - 40) + '" y="88" text-anchor="middle" class="fig-t" font-weight="700" fill="var(--ink)">N</text>';
    out += '<path d="M' + xw + "," + (H - 18) + "h" + 5 * s + "M" + xw + "," + (H - 23) + "v10M" + (xw + 5 * s) + "," + (H - 23) + "v10" + '" stroke="var(--ink)" stroke-width="1.5"/><text x="' + (xw + 5 * s + 8) + '" y="' + (H - 14) + '" class="fig-t fig-sm" fill="var(--ink-2)">5 m</text>';
    out += '<text x="' + (W - 20) + '" y="' + (H - 14) + '" text-anchor="end" class="fig-t fig-sm" fill="var(--ink-2)">west on the left, east on the right · schematic</text>';
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

  /* ---------- A medieval churchyard and one grave (schematic) ---------- */
  function churchyard() {
    ensurePatterns();
    var W = 820, H = 400;
    var out = svgOpen(W, H, "Schematic medieval churchyard in plan, and a single grave in section");
    function T(x, y, s, o) {
      o = o || {};
      return '<text x="' + x + '" y="' + y + '" class="fig-t' + (o.sm ? " fig-sm" : "") + '" fill="' + (o.c || "var(--ink)") + '"' +
        (o.a ? ' text-anchor="' + o.a + '"' : "") + (o.b ? ' font-weight="700"' : "") + ">" + s + "</text>";
    }
    // --- left: plan of a churchyard ---
    out += T(24, 26, "Churchyard, seen from above", { b: 1 });
    out += '<rect x="24" y="44" width="430" height="300" rx="40" fill="#cdbf9f" fill-opacity=".45" stroke="var(--ink)" stroke-width="3"/>';
    out += T(40, 336, "consecrated ground inside a wall [24]", { sm: 1, c: "var(--ink-2)" });
    // church: nave + apse to the east
    var cx = 190, cy = 160;
    out += '<rect x="' + cx + '" y="' + (cy - 34) + '" width="140" height="68" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5"/>' +
      '<path d="M' + (cx + 140) + "," + (cy - 26) + " A26,26 0 0 1 " + (cx + 140) + "," + (cy + 26) + '" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5"/>' +
      T(cx + 70, cy - 4, "church", { a: "middle", b: 1 }) + T(cx + 70, cy + 12, "clergy, benefactors", { a: "middle", sm: 1, c: "var(--ink-2)" });
    // graves: west-east rectangles, some cutting older ones
    var graves = [
      [52, 78], [100, 74], [52, 112], [100, 116], [148, 96], [60, 158], [108, 162], [64, 204], [112, 200], [160, 232],
      [220, 230], [268, 236], [316, 226], [210, 266], [262, 276], [314, 270], [200, 86], [250, 80], [300, 88], [370, 96]
    ];
    graves.forEach(function (g, k) {
      var old = k % 5 === 3;
      out += '<rect x="' + g[0] + '" y="' + g[1] + '" width="38" height="13" rx="3" fill="' + (old ? "none" : "#8f7a5a") + '" stroke="#3b3125" stroke-width="1.2"' + (old ? ' stroke-dasharray="3 2"' : "") + "/>";
      if (k % 4 === 0) out += '<path d="M' + (g[0] + 4) + "," + (g[1] - 7) + "v10M" + (g[0] - 0.5) + "," + (g[1] - 3) + "h9" + '" stroke="#5b3d1f" stroke-width="2"/>';
    });
    // charnel house south-east of the church
    out += '<rect x="372" y="236" width="52" height="40" fill="var(--paper)" stroke="var(--accent-2)" stroke-width="2.5"/>' +
      T(398, 260, "Karner", { a: "middle", sm: 1, b: 1, c: "var(--accent-2)" });
    out += T(366, 300, "charnel house [29]", { a: "end", sm: 1, c: "var(--accent-2)" });
    // legend
    out += '<rect x="24" y="360" width="22" height="9" rx="2" fill="#8f7a5a" stroke="#3b3125"/>' + T(52, 369, "grave, head to the west", { sm: 1 });
    out += '<rect x="250" y="360" width="22" height="9" rx="2" fill="none" stroke="#3b3125" stroke-dasharray="3 2"/>' + T(278, 369, "older grave, dug through", { sm: 1 });
    out += '<path d="M28,384 v10 M23,388 h9" stroke="#5b3d1f" stroke-width="2"/>' + T(52, 394, "wooden cross [24]", { sm: 1 });
    out += '<path d="M448,62 V34" stroke="var(--ink)" stroke-width="2"/><path d="M442,42 L448,28 L454,42z" fill="var(--ink)"/>' + T(448, 20, "N", { a: "middle", b: 1 });
    // --- right: one grave in section ---
    var gx = 500, gy = 120;
    out += T(gx, 26, "One grave, seen from the side", { b: 1 });
    out += '<rect x="' + gx + '" y="' + gy + '" width="300" height="200" fill="#b8a27c" fill-opacity=".55"/>' +
      '<rect x="' + gx + '" y="' + gy + '" width="300" height="200" fill="url(#pt-clay)"/>' +
      '<path d="M' + gx + "," + gy + "H" + (gx + 300) + '" stroke="var(--ink)" stroke-width="2.5"/>';
    // wooden cross above the head end (west)
    out += '<path d="M' + (gx + 70) + "," + (gy - 2) + "V" + (gy - 54) + "M" + (gx + 54) + "," + (gy - 40) + "H" + (gx + 86) + '" stroke="#5b3d1f" stroke-width="5" stroke-linecap="round"/>';
    // grave cut and fill
    out += '<path d="M' + (gx + 40) + "," + gy + " L" + (gx + 46) + "," + (gy + 120) + " L" + (gx + 262) + "," + (gy + 120) + " L" + (gx + 268) + "," + gy + 'Z" fill="#9c8562" stroke="#3b3125" stroke-width="1.5" stroke-dasharray="5 3"/>';
    // body in a shroud, extended on the back, head west
    out += '<rect x="' + (gx + 62) + '" y="' + (gy + 92) + '" width="186" height="22" rx="11" fill="#ece6d6" stroke="#3b3125" stroke-width="1.5"/>' +
      '<circle cx="' + (gx + 78) + '" cy="' + (gy + 103) + '" r="10" fill="#ece6d6" stroke="#3b3125" stroke-width="1.5"/>' +
      '<path d="M' + (gx + 100) + "," + (gy + 94) + "v18M" + (gx + 140) + "," + (gy + 94) + "v18M" + (gx + 180) + "," + (gy + 94) + "v18M" + (gx + 220) + "," + (gy + 94) + "v18" + '" stroke="#b8ad95" stroke-width="1"/>';
    out += T(gx + 155, gy + 86, "body in a shroud, on its back [24][27]", { a: "middle", sm: 1, c: "#1e1a15" });
    // older bones below
    [[gx + 70, gy + 150], [gx + 110, gy + 158], [gx + 160, gy + 146], [gx + 200, gy + 160], [gx + 236, gy + 152]].forEach(function (b, k) {
      out += '<path d="M' + b[0] + "," + b[1] + " l" + (k % 2 ? 22 : -18) + "," + (k % 2 ? 6 : -4) + '" stroke="#f1ead8" stroke-width="5" stroke-linecap="round"/>';
    });
    out += T(gx + 150, gy + 186, "bones of an earlier burial", { a: "middle", sm: 1, c: "#1e1a15" });
    out += T(gx, gy + 222, "W · head end", { sm: 1, b: 1 }) + T(gx + 300, gy + 222, "E · face looks east", { sm: 1, b: 1, a: "end" });
    out += T(gx, gy + 244, "After about two generations bones were often", { sm: 1, c: "var(--ink-2)" });
    out += T(gx, gy + 258, "dug up and moved to the charnel house [24]", { sm: 1, c: "var(--ink-2)" });
    out += T(W - 4, H - 4, "schematic", { sm: 1, a: "end", c: "var(--ink-2)" });
    return out + "</svg>";
  }

  window.FIG = { layers: layers, synagogue: synagogue, xsec: xsec, churchyard: churchyard, ensurePatterns: ensurePatterns };
})();
