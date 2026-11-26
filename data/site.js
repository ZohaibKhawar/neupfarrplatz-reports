/* Rupen-Nordfeta is an invented excavation. Every layer, number, find and
   date in this file is made up for this website. It is built to fit the
   real geology of Regensburg, which is described (with sources) on
   geology.html and sources.html. */
window.SITE = {
  ground: 331.2,      // ground level at Trench 2, metres above sea level (m NHN)
  groundwater: 3.35,  // depth of the water table at Trench 2, metres below ground

  phases: [
    { id: "P0", name: "Natural ground", span: "Late Glacial to c. 650",
      text: "Danube gravels laid down at the end of the last ice age, then brown flood loam from the Holocene river. Nobody lives on this spot yet." },
    { id: "P1", name: "Early medieval", span: "c. 650–1000",
      text: "A sunken-floored weaving hut is dug into the flood loam around 700. After it falls out of use, dark earth builds up for three centuries from rubbish, ash and garden soil." },
    { id: "P2", name: "High medieval", span: "c. 1000–1250",
      text: "The plot becomes a stonemasons' yard. Chips of light limestone and green sandstone pile up while blocks are dressed for the growing city." },
    { id: "P3", name: "Late medieval", span: "1250–1520",
      text: "A flood buries the yard under clean river sand, most likely the Magdalene flood of July 1342. A house rises on the sand, with a timber-lined cesspit dug down to the groundwater." },
    { id: "P4", name: "After the Middle Ages", span: "1520–today",
      text: "The house is pulled down around the 1520s. Garden soil covers the rubble for three centuries, then a modern yard surface seals everything." }
  ],

  /* Lithology codes used by the section drawing and the borehole logs. */
  litho: {
    fill:   { name: "Modern fill",            color: "#8a857c", ink: "#1e1a15" },
    garden: { name: "Garden soil",            color: "#5e4b3b", ink: "#f3eee3" },
    rubble: { name: "Demolition rubble",      color: "#bfb196", ink: "#1e1a15" },
    floors: { name: "Trampled floors",        color: "#7b5b45", ink: "#f3eee3" },
    sand:   { name: "Flood sand and silt",    color: "#d3c79c", ink: "#1e1a15" },
    yard:   { name: "Stone chips in lime",    color: "#e4dece", ink: "#1e1a15" },
    dark:   { name: "Dark earth",             color: "#3d362f", ink: "#f3eee3" },
    loam:   { name: "Flood loam (Auelehm)",   color: "#9c7b54", ink: "#1e1a15" },
    cover:  { name: "Cover loam",             color: "#b0915f", ink: "#1e1a15" },
    gravel: { name: "Danube gravel",          color: "#b6a98c", ink: "#1e1a15" },
    tclay:  { name: "Tertiary clay (Molasse)",color: "#8f9c88", ink: "#1e1a15" },
    tsand:  { name: "Tertiary sand (Molasse)",color: "#c4bf9b", ink: "#1e1a15" },
    kclay:  { name: "Karst clay",             color: "#a65d3e", ink: "#f3eee3" },
    lime:   { name: "Upper Jurassic limestone", color: "#d9d5ca", ink: "#1e1a15" },
    hut:    { name: "Hut fill",               color: "#54443a", ink: "#f3eee3" },
    cess:   { name: "Cesspit fill",           color: "#4a3a22", ink: "#f3eee3" },
    wall:   { name: "Stone wall footing",     color: "#c9c1ae", ink: "#1e1a15" },
    timber: { name: "Oak lining",             color: "#6b4a2b", ink: "#f3eee3" }
  },

  /* Contexts in Trench 2, youngest first. */
  contexts: [
    { id: "2001", kind: "Layer", litho: "fill", phase: "P4", name: "Modern yard surface",
      depth: "0–0.35 m", munsell: "10YR 4/1", texture: "Asphalt over crushed limestone and brick hardcore",
      desc: "Asphalt 6 cm thick on a bed of crushed limestone, broken brick and concrete. Sharp, flat base.",
      interp: "Yard surface laid in the 20th century. Sealed everything below.",
      date: "20th century", finds: "Not kept (modern)", reports: ["RN-03"] },
    { id: "2002", kind: "Layer", litho: "garden", phase: "P4", name: "Garden soil",
      depth: "0.35–0.80 m", munsell: "10YR 3/2", texture: "Sandy silt loam, well mixed",
      desc: "Dark greyish-brown, crumbly, full of earthworm channels. Brick flecks, glazed pottery, clay pipe stems and oyster shell spread evenly through it.",
      interp: "Garden or orchard soil, dug and manured for about three centuries after the house came down.",
      date: "16th–19th century", finds: "214 sherds, 3 clay pipe stems, 1 copper token", reports: ["RN-03", "RN-04", "RN-11"] },
    { id: "2003", kind: "Layer", litho: "rubble", phase: "P4", name: "Demolition rubble",
      depth: "0.80–1.15 m", munsell: "10YR 6/3 with 5GY 5/2 clasts", texture: "Loose rubble in pale silt",
      desc: "Broken blocks of light limestone and greenish sandstone, lumps of lime mortar, roof tile and burnt daub. Many sandstone pieces are crumbling along their bedding.",
      interp: "The late medieval house pulled down and levelled where it stood.",
      date: "c. 1520s", finds: "88 sherds, 41 roof-tile pieces, 1 pfennig of the early 1500s", reports: ["RN-03", "RN-06", "RN-11"] },
    { id: "2015", kind: "Structure", litho: "wall", phase: "P3", name: "Wall footing",
      depth: "0.85–1.66 m", munsell: "–", texture: "Mortared stone",
      desc: "Footing 0.8 m wide of roughly squared limestone and reused green sandstone blocks in hard lime mortar. It is dug through the flood sand and stands on the stone-chip yard below.",
      interp: "East wall of the house built after the flood. Builders went down through the soft sand to reach firmer ground.",
      date: "c. 1400", finds: "Mortar samples M1–M3", reports: ["RN-03", "RN-06"] },
    { id: "2013", kind: "Fill", litho: "cess", phase: "P3", name: "Cesspit fill",
      cut: "2012", depth: "1.25–3.40 m", munsell: "10YR 2/2", texture: "Organic silt with lime bands",
      desc: "Very dark brown, soft and smelly when opened. Thin white lime bands every 10–20 cm. Seeds, fish bone, leather shoe parts and a turned wooden bowl in the waterlogged lower metre.",
      interp: "Household cesspit, limed now and then to keep the smell down, filled over about 120 years.",
      date: "1362 – c. 1480", finds: "Seeds, 2 shoe soles, wooden bowl, 63 sherds, glass beaker base", reports: ["RN-03", "RN-08", "RN-09", "RN-10", "RN-11"] },
    { id: "2014", kind: "Structure", litho: "timber", phase: "P3", name: "Oak lining of the cesspit",
      depth: "2.85–3.40 m", munsell: "–", texture: "Oak planks",
      desc: "Oak planks 4 cm thick set on edge inside the pit. Only the part that sits in or just above the groundwater survives; higher up there is only a brown stain.",
      interp: "A square timber box lining the cesspit shaft.",
      date: "Felled winter 1361/62 (tree rings)", finds: "Dendro samples D1–D4", reports: ["RN-08", "RN-10"] },
    { id: "2012", kind: "Cut", litho: "cess", phase: "P3", name: "Cesspit shaft",
      depth: "1.25–3.40 m", munsell: "–", texture: "–",
      desc: "Square shaft 1.4 m across with near-vertical sides, cut from the house floors down through every older layer and 0.3 m into the gravel.",
      interp: "Dug on purpose below the water table, which is why its contents are so well preserved.",
      date: "1362 or soon after", finds: "–", reports: ["RN-03", "RN-10"] },
    { id: "2004", kind: "Layer", litho: "floors", phase: "P3", name: "House floors",
      depth: "1.15–1.40 m", munsell: "7.5YR 4/2", texture: "Thin bands of trampled loam",
      desc: "Fourteen trampled floors of beaten loam, each 5–20 mm thick, with charcoal, ash and fish bone between them. Two reddened hearth patches.",
      interp: "Inside the house built on the flood sand. Floors were renewed again and again until about 1500.",
      date: "after 1342 – c. 1500", finds: "131 sherds, fish bone, 2 Regensburg pfennigs (14th century type)", reports: ["RN-03", "RN-04", "RN-08", "RN-11"] },
    { id: "2005", kind: "Layer", litho: "sand", phase: "P3", name: "Flood sand",
      depth: "1.40–1.62 m", munsell: "2.5Y 6/3", texture: "Fine sand fining up into silt",
      desc: "Pale olive, clean and laminated. Ripple marks at the base, the grains get finer towards the top. River snail shells, a few worn older sherds, nothing else.",
      interp: "Laid down in one flood that covered the whole plot. Best match: the Magdalene flood of July 1342.",
      date: "14th century, most likely 1342", finds: "6 worn sherds (washed in), river snails", reports: ["RN-04", "RN-05", "RN-08"] },
    { id: "2006", kind: "Layer", litho: "yard", phase: "P2", name: "Stonemasons' yard",
      depth: "1.62–1.95 m", munsell: "10YR 7/2", texture: "Stone chips in lime dust, compacted",
      desc: "Hard pale layer of angular chips of light limestone and green sandstone, 2–60 mm, packed in lime and stone dust. An iron point chisel and a whetstone lay on its surface.",
      interp: "Working floor where stone blocks were dressed. Its surface stayed open until the flood buried it.",
      date: "c. 1050 – 1342", finds: "Iron point chisel, whetstone, 37 sherds, 1,240 stone chips sampled", reports: ["RN-04", "RN-06", "RN-08", "RN-11"] },
    { id: "2007", kind: "Layer", litho: "dark", phase: "P1", name: "Dark earth",
      depth: "1.95–2.55 m", munsell: "10YR 3/1", texture: "Silty loam, no visible layering",
      desc: "Very dark grey, even and soft, 50–60 cm thick. Charcoal, bone, pottery and burnt daub spread all through it, with no layers you can see.",
      interp: "Three centuries of rubbish, ash and garden soil mixed by worms and digging into one dark layer.",
      date: "c. 780 – 1000", finds: "402 sherds, 3.1 kg animal bone, bone comb fragment, glass bead", reports: ["RN-04", "RN-07", "RN-08", "RN-11"] },
    { id: "2011", kind: "Fill", litho: "hut", phase: "P1", name: "Fill of the sunken hut",
      cut: "2010", depth: "2.52–3.00 m", munsell: "10YR 3/3", texture: "Silty loam with charcoal",
      desc: "Dark brown fill with charcoal, burnt daub and a row of eleven clay loom weights lying where they fell along the floor.",
      interp: "A sunken-floored hut used for weaving, burnt or abandoned and then filled in.",
      date: "c. 670–770", finds: "11 loom weights, spindle whorl, 58 sherds, charred barley", reports: ["RN-03", "RN-07", "RN-08", "RN-11"] },
    { id: "2010", kind: "Cut", litho: "hut", phase: "P1", name: "Cut of the sunken hut",
      depth: "2.52–3.00 m", munsell: "–", texture: "–",
      desc: "Flat-floored pit 3.2 m wide in the section with steep sides, dug 0.5 m into the flood loam so its floor sits just above the gravel. Post holes at both ends.",
      interp: "The hollow of a sunken-floored building (Grubenhaus), the earliest human trace on the site.",
      date: "c. 670–770", finds: "–", reports: ["RN-03"] },
    { id: "2008", kind: "Layer", litho: "loam", phase: "P0", name: "Flood loam",
      depth: "2.55–3.10 m", munsell: "10YR 5/4", texture: "Silty clay with rust mottles",
      desc: "Brown, stiff silty clay with rusty orange mottles and black iron-manganese spots. No finds.",
      interp: "Fine mud from Holocene floods that spread over the gravel (Auelehm). The mottles show the water table rising and falling.",
      date: "Holocene, before c. 650", finds: "None", reports: ["RN-02", "RN-04"] },
    { id: "2009", kind: "Layer", litho: "gravel", phase: "P0", name: "Danube gravel",
      depth: "3.10 m and deeper", munsell: "2.5Y 6/2", texture: "Sandy gravel with cobbles",
      desc: "Rounded pebbles and cobbles of quartz, limestone, gneiss, granite and black lydite in coarse sand, cross-bedded. Wet below 3.35 m.",
      interp: "Gravel of the Danube's low terrace, laid down by a braided river at the end of the last ice age.",
      date: "Late Glacial", finds: "None", reports: ["RN-01", "RN-02", "RN-04"] }
  ],

  /* Trench 2 section: tops of each layer (m below ground) at x = 0, 2, 4 ... 12 m. */
  section: {
    width: 12, depth: 3.6,
    xs: [0, 2, 4, 6, 8, 10, 12],
    layers: [
      { id: "2001", tops: [0, 0, 0, 0, 0, 0, 0] },
      { id: "2002", tops: [0.30, 0.32, 0.35, 0.34, 0.33, 0.36, 0.35] },
      { id: "2003", tops: [0.75, 0.80, 0.82, 0.78, 0.85, 0.90, 0.88] },
      { id: "2004", tops: [1.10, 1.12, 1.15, 1.18, 1.20, 1.22, 1.25] },
      { id: "2005", tops: [1.38, 1.40, 1.42, 1.45, 1.48, 1.50, 1.55] },
      { id: "2006", tops: [1.58, 1.60, 1.62, 1.66, 1.70, 1.74, 1.80] },
      { id: "2007", tops: [1.90, 1.92, 1.95, 2.00, 2.05, 2.10, 2.15] },
      { id: "2008", tops: [2.50, 2.52, 2.55, 2.60, 2.62, 2.65, 2.70] },
      { id: "2009", tops: [3.05, 3.08, 3.10, 3.12, 3.15, 3.18, 3.20] }
    ],
    // Hut 2010/2011: cut from the top of the flood loam (2008), sealed by the dark earth.
    hut: { x0: 1.0, x1: 4.2, base: 3.0 },
    // Cesspit 2012/2013 with lining 2014.
    pit: { x0: 8.2, x1: 9.6, top: 1.25, base: 3.40, liningTop: 2.85 },
    // Wall footing 2015.
    wall: { x0: 5.4, x1: 6.2, top: 0.85, base: 1.66 }
  },

  /* Boreholes. x/y are positions on the site plan (metres, 60 x 40 m plot). */
  boreholes: [
    { id: "BH-1", x: 14, y: 6, ground: 330.90, depth: 14.0, gw: 3.30,
      layers: [
        [0, 0.4, "fill", "Asphalt and hardcore"],
        [0.4, 1.3, "rubble", "Rubble and mixed soil"],
        [1.3, 1.6, "sand", "Laminated flood sand"],
        [1.6, 2.3, "dark", "Dark earth"],
        [2.3, 3.0, "loam", "Flood loam, mottled"],
        [3.0, 8.6, "gravel", "Sandy gravel, cobbles to 12 cm"],
        [8.6, 10.9, "tclay", "Stiff grey-green clay and silt"],
        [10.9, 11.6, "tsand", "Fine micaceous sand"],
        [11.6, 12.2, "kclay", "Red-brown karst clay"],
        [12.2, 14.0, "lime", "Light grey limestone, open void 12.9–13.3 m"]
      ] },
    { id: "BH-2", x: 30, y: 20, ground: 331.20, depth: 9.0, gw: 3.35,
      layers: [
        [0, 0.35, "fill", "Asphalt and hardcore"],
        [0.35, 0.8, "garden", "Garden soil"],
        [0.8, 1.15, "rubble", "Demolition rubble"],
        [1.15, 1.4, "floors", "Trampled floors"],
        [1.4, 1.62, "sand", "Laminated flood sand"],
        [1.62, 1.95, "yard", "Stone chips in lime"],
        [1.95, 2.55, "dark", "Dark earth"],
        [2.55, 3.1, "loam", "Flood loam, mottled"],
        [3.1, 9.0, "gravel", "Sandy gravel, base not reached"]
      ] },
    { id: "BH-3", x: 34, y: 36, ground: 331.85, depth: 10.0, gw: 3.95,
      layers: [
        [0, 0.5, "fill", "Hardcore"],
        [0.5, 1.2, "garden", "Garden soil"],
        [1.2, 1.5, "dark", "Dark earth, thin"],
        [1.5, 2.4, "cover", "Yellow-brown cover loam"],
        [2.4, 9.5, "gravel", "Sandy gravel"],
        [9.5, 10.0, "tclay", "Stiff grey-green clay"]
      ] },
    { id: "BH-4", x: 50, y: 10, ground: 331.05, depth: 8.0, gw: 3.25,
      layers: [
        [0, 0.3, "fill", "Asphalt and hardcore"],
        [0.3, 1.1, "garden", "Garden soil"],
        [1.1, 1.42, "sand", "Laminated flood sand, thickest on site"],
        [1.42, 1.7, "yard", "Stone chips in lime, thin"],
        [1.7, 2.35, "dark", "Dark earth"],
        [2.35, 3.05, "loam", "Flood loam"],
        [3.05, 8.0, "gravel", "Sandy gravel"]
      ] },
    { id: "BH-5", x: 6, y: 28, ground: 331.40, depth: 8.0, gw: 3.55,
      layers: [
        [0, 0.4, "fill", "Hardcore"],
        [0.4, 1.0, "garden", "Garden soil"],
        [1.0, 1.25, "floors", "Trampled floors"],
        [1.25, 1.35, "sand", "Flood sand, thin"],
        [1.35, 2.05, "dark", "Dark earth"],
        [2.05, 2.9, "loam", "Flood loam"],
        [2.9, 8.0, "gravel", "Sandy gravel"]
      ] }
  ],

  /* Trenches on the site plan (metres). */
  trenches: [
    { id: "T1", x: 8, y: 4, w: 8, h: 4, note: "North. Thick flood sand, floodplain loam deeper than elsewhere." },
    { id: "T2", x: 24, y: 18, w: 12, h: 4, note: "Main trench. Full sequence from gravel to the modern yard." },
    { id: "T3", x: 40, y: 24, w: 6, h: 6, note: "Corner of the late medieval house: two walls meet." },
    { id: "T4", x: 12, y: 32, w: 10, h: 3, note: "Cellars of the 1800s have cut away the medieval layers." }
  ],

  /* Sediment tests per context (RN-04). */
  sediments: [
    // id, clay, silt, sand, gravel (% by weight), organic % (loss on ignition), carbonate %, phosphate mg P/kg, magnetic susceptibility (10^-8 m3/kg)
    ["2002", 14, 46, 32, 8, 5.8, 9, 1450, 95],
    ["2004", 18, 52, 24, 6, 7.2, 12, 2900, 160],
    ["2005", 4, 31, 65, 0, 0.9, 21, 380, 18],
    ["2006", 6, 18, 38, 38, 1.1, 58, 520, 22],
    ["2007", 17, 55, 22, 6, 8.4, 10, 4100, 140],
    ["2011", 16, 50, 26, 8, 9.6, 8, 3700, 210],
    ["2013", 12, 49, 36, 3, 31.5, 14, 18600, 40],
    ["2008", 31, 58, 11, 0, 2.1, 6, 610, 35],
    ["2009", 2, 5, 33, 60, 0.3, 24, 150, 12]
  ],

  /* Flood sand thickness, north to south (RN-05). */
  flood: [
    { where: "BH-4", m: 0.32 },
    { where: "BH-1", m: 0.30 },
    { where: "T1", m: 0.28 },
    { where: "T2 / BH-2", m: 0.22 },
    { where: "BH-5", m: 0.10 },
    { where: "BH-3", m: 0 }
  ],

  /* Building stone from the masons' yard, by weight (RN-06). */
  stones: [
    { name: "Upper Jurassic limestone", pct: 71, color: "#d9d5ca" },
    { name: "Grünsandstein (green sandstone)", pct: 24, color: "#7d9470" },
    { name: "Other (gravel pebbles, brick)", pct: 5, color: "#a65d3e" }
  ]
};
