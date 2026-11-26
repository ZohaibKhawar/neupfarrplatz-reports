/* The Rupen-Nordfeta report series. The site, its reports, results and
   dates are invented. Sentences marked with a source number [sN] describe
   real Regensburg geology or history and link to sources.html.

   Inline marks used in the text:
     [[2005]]  link to a context on the section page
     {{RN-05}} link to another report
     [s3]      footnote to source 3 on sources.html */
window.REPORTS = [
  {
    id: "RN-01", type: "Desk study", issued: "12 Feb 2024", by: "Site geologist",
    area: "Whole plot", status: "Final",
    title: "Setting and geological framework",
    summary: "What the ground under the plot should look like before anyone digs: the regional geology of Regensburg, the expected layers, and four questions the work has to answer.",
    body: [
      ["note", "The regional geology in this report is real and every claim carries a source. The Rupen-Nordfeta plot itself is invented."],
      ["h", "Where the plot sits"],
      ["p", "The plot is a 60 × 40 m yard on the south bank of the Danube, at the edge where the river's low terrace drops to the floodplain. Regensburg grew at the Danube's northernmost bend, where the Regen joins it and the Naab comes in just upstream."],
      ["h", "Regional geology"],
      ["p", "Regensburg holds a key place in Bavarian geology: the old crystalline basement of eastern Bavaria, the layered scarplands to the west and the Molasse basin south of the Danube all meet here.[s1]"],
      ["p", "The basement is gneiss and granite. In the hills north-east of the city it is bounded by the Pfahl in the north, the Keilberg fault in the west and the Danube boundary fault (Donaurandbruch) in the south.[s1] The Donaurandbruch is a strong fault zone that separates the Molasse basin from the crystalline basement.[s4]"],
      ["p", "The Jurassic sea first reached the Regensburg bay in the Early Jurassic, and a last wide flooding in the Late Jurassic (Malm), about 160 million years ago, spread far over the basement.[s1] After a long spell as land, the Cenomanian sea pushed in from the south. It withdrew in the Santonian, and the area has been land ever since.[s1] At the Schutzfelsen near Pentling one river slope shows the order: karstified Upper Jurassic massive limestones at the bottom, Regensburger Grünsandstein above them, then Upper Cretaceous sandstones, marls and limestones.[s2]"],
      ["p", "Since the end of the Cretaceous the Bavarian Forest has been pushed up again, and in the Tertiary deep weathering rotted its granites to grit.[s1] South of the city lies the Molasse basin; during one Tertiary flooding its sea reached to just south of Regensburg.[s1] In the last glaciation the Danube left up to three low gravel terraces between Regensburg and Bogen: NT1 from the glacial maximum, NT2 from the early to late glacial and NT3 from the late glacial, with seven Holocene floodplain levels below them.[s4]"],
      ["fig", "xsec", "Schematic cross-section of the Regensburg area, south-west to north-east. Not to scale."],
      ["h", "Expected ground under the plot"],
      ["table", {
        cols: ["Depth (m)", "Expected material", "Why"],
        rows: [
          ["0–3", "Human deposits over flood loam", "Medieval town edge, regular Danube floods"],
          ["3–9", "Sandy Danube gravel (low terrace)", "Low terraces of the last glaciation[s4]"],
          ["9–12", "Tertiary clays and sands", "Molasse basin south of the Danube[s1]"],
          ["below 12", "Karstified Upper Jurassic limestone", "Karst limestone at the river bank near Pentling[s2]"]
        ] }],
      ["h", "Questions for the work"],
      ["list", [
        "<b>Q1.</b> How did the ground form, from the natural gravel to the first people?",
        "<b>Q2.</b> What stone did medieval builders on the plot use, and where did it come from?",
        "<b>Q3.</b> Did the great flood of July 1342 reach the plot, and does it leave a layer we can recognise?",
        "<b>Q4.</b> How well are wood, seeds and leather preserved, and what keeps them that way?"
      ]],
      ["p", "The answers are pulled together in {{RN-12}}."]
    ]
  },

  {
    id: "RN-02", type: "Boreholes", issued: "30 Apr 2024", by: "Site geologist",
    area: "BH-1 to BH-5", status: "Final",
    title: "Borehole survey and groundwater",
    summary: "Five boreholes, one down to bedrock at 14 m. The gravel is 5.5–7 m thick, a karst void sits in the limestone, and the water table lies only 3.3–4.0 m below the yard.",
    body: [
      ["h", "Method"],
      ["p", "Four holes were driven by cable percussion with a 150 mm casing. BH-1 continued with a rotary core barrel into the bedrock. Every metre was logged, bagged and photographed. Groundwater was measured after it settled for 24 hours, then the holes were fitted as monitoring wells (see {{RN-10}})."],
      ["fig", "boreholes", "Borehole logs drawn by height above sea level (m NHN), north on the left. The blue mark is the settled water table."],
      ["h", "Summary of the holes"],
      ["table", {
        cols: ["Hole", "Ground (m NHN)", "Depth (m)", "Top of gravel (m)", "Top of Tertiary (m)", "Top of limestone (m)", "Water table (m below / m NHN)"],
        rows: [
          ["BH-1", "330.90", "14.0", "3.00", "8.60", "12.20", "3.30 / 327.60"],
          ["BH-4", "331.05", "8.0", "3.05", "–", "–", "3.25 / 327.80"],
          ["BH-2", "331.20", "9.0", "3.10", "–", "–", "3.35 / 327.85"],
          ["BH-5", "331.40", "8.0", "2.90", "–", "–", "3.55 / 327.85"],
          ["BH-3", "331.85", "10.0", "2.40", "9.50", "–", "3.95 / 327.90"]
        ] }],
      ["h", "What the cores show"],
      ["list", [
        "<b>Gravel.</b> Rounded pebbles and cobbles in coarse sand, 5.6 m thick in BH-1 and 7.1 m in BH-3. This is the Danube's low terrace ([[2009]]).",
        "<b>Pebble count.</b> 300 pebbles of 2–6 cm from BH-2 at 4–5 m: quartz 38%, Jurassic limestone 27%, gneiss and granite 18%, sandstone 7%, black lydite and radiolarite 6%, other 4%. The river brought them from the Alps, the Franconian Alb and the crystalline uplands to the north.",
        "<b>Tertiary.</b> Stiff grey-green clay and fine micaceous sand under the gravel in BH-1 and BH-3, the Tertiary fill of the Molasse basin.[s1]",
        "<b>Bedrock.</b> Red-brown karst clay from 11.6 m, then light grey limestone from 12.2 m. The core dropped through an open void from 12.9 to 13.3 m, a dissolved karst pocket.",
        "<b>Top layers.</b> Flood loam over the gravel in every hole except BH-3, where a yellow-brown cover loam sits on higher gravel instead."
      ]],
      ["h", "Groundwater"],
      ["p", "The settled water table lies at 327.60–327.90 m NHN and falls gently north towards the river. It sits inside the gravel everywhere, 0.2–0.3 m below the top of the gravel in Trench 2. Anything buried below about 3.3 m stays wet all year, which is why the bottom of the cesspit survived ({{RN-10}})."],
      ["note", "Engineering note: the void in BH-1 shows the limestone is karstified. Deep piles must not be set on the bedrock without checking for more voids."]
    ]
  },

  {
    id: "RN-03", type: "Stratigraphy", issued: "8 Nov 2024", by: "Field team",
    area: "Trench 2 (main), T1, T3, T4", status: "Final",
    title: "Trench 2 stratigraphy and context register",
    summary: "The full sequence from Danube gravel to the modern yard in one 3.6 m section: fifteen contexts in five phases, with the Harris matrix that puts them in order.",
    body: [
      ["h", "Method"],
      ["p", "Trench 2 measured 12 × 4 m. A machine took off the modern surface [[2001]]; everything below was dug by hand, one context at a time, and each was given a number, described and drawn. Below 1.2 m the sides were stepped and shored, and below 3.2 m a pump kept the trench dry. The east-facing section was drawn at 1:20 and is the drawing on the <a href=\"section.html\">Section page</a>."],
      ["fig", "section", "Trench 2, east-facing section. South on the left. Vertical scale doubled. Click a layer on the Section page for its full record."],
      ["h", "Context register"],
      ["contexts"],
      ["h", "Harris matrix"],
      ["p", "The matrix shows which context is later than which. Read it from the top (latest) down. The wall [[2015]] and the cesspit [[2012]] both cut the house floors [[2004]] and are both covered by the demolition rubble [[2003]]."],
      ["fig", "matrix", "Harris matrix for Trench 2. Each line joins a later context (above) to an earlier one."],
      ["h", "The other trenches"],
      ["table", {
        cols: ["Trench", "Size", "What it found"],
        rows: [
          ["T1", "8 × 4 m", "North end of the plot. Flood sand 0.28 m thick and flood loam deeper than elsewhere."],
          ["T3", "6 × 6 m", "Corner of the late medieval house where two footings like [[2015]] meet."],
          ["T4", "10 × 3 m", "Cellars of the 1800s cut away the medieval layers; only the gravel was left untouched."]
        ] }]
    ]
  },

  {
    id: "RN-04", type: "Sediments", issued: "20 Jan 2025", by: "Geoarchaeology lab",
    area: "Trench 2", status: "Final",
    title: "Sediment tests by context",
    summary: "Grain size, organic matter, carbonate, phosphate and magnetic readings for nine contexts. Each layer has its own fingerprint, from clean flood sand to the phosphate-rich cesspit.",
    body: [
      ["h", "Method"],
      ["list", [
        "<b>Grain size:</b> sieving for sand and gravel, pipette for silt and clay, as % by weight.",
        "<b>Organic matter:</b> loss on ignition at 550 °C, as % of dry weight.",
        "<b>Carbonate:</b> gas volume after hydrochloric acid in a Scheibler calcimeter, as % CaCO₃.",
        "<b>Phosphate:</b> total phosphorus in mg per kg. People and animals leave phosphate behind, so high values mark waste, dung and burials.",
        "<b>Magnetic susceptibility:</b> mass-specific, in 10⁻⁸ m³/kg. Burning turns iron in soil into magnetic minerals, so hearths and burnt layers read high."
      ]],
      ["fig", "grain", "Grain size of each tested context, % by weight."],
      ["h", "Results"],
      ["sediments"],
      ["h", "What the numbers say"],
      ["list", [
        "<b>Natural layers</b> ([[2009]], [[2008]]) have very low phosphate and magnetic readings: no people yet.",
        "<b>The flood sand</b> [[2005]] is 65% sand with almost no organic matter. It was laid down quickly by moving water ({{RN-05}}).",
        "<b>The masons' yard</b> [[2006]] is 58% carbonate. That is limestone dust and lime from dressing stone ({{RN-06}}).",
        "<b>The dark earth</b> [[2007]] holds 4,100 mg P/kg, about seven times the natural loam: three centuries of rubbish and dung ({{RN-07}}).",
        "<b>The hut fill</b> [[2011]] and <b>house floors</b> [[2004]] have the highest magnetic readings, from fires and burnt daub.",
        "<b>The cesspit</b> [[2013]] is in a class of its own: 31.5% organic matter and 18,600 mg P/kg."
      ]]
    ]
  },

  {
    id: "RN-05", type: "Sediments", issued: "14 Feb 2025", by: "Geoarchaeology lab",
    area: "Trench 2, T1, all boreholes", status: "Final",
    title: "The flood horizon (context 2005)",
    summary: "A clean, graded sand layer laid down by one flood that covered most of the plot. Everything about it fits the great Magdalene flood of July 1342.",
    body: [
      ["h", "The layer"],
      ["p", "Context [[2005]] is a pale olive sand 18–25 cm thick in Trench 2. Its base is sharp and rippled, it has no worm channels in its lower 15 cm, and its grains get steadily finer upwards. Those are the marks of a single flood: fast water dropped sand first, then silt settled out as the water slowed and stood."],
      ["table", {
        caption: "Five slices from the base upwards (Trench 2).",
        cols: ["Slice", "Height above base", "Median grain size", "Description"],
        rows: [
          ["5 (top)", "17–22 cm", "30 µm", "Silt, faint layering, worm channels"],
          ["4", "12–17 cm", "70 µm", "Very fine sand and silt"],
          ["3", "8–12 cm", "120 µm", "Very fine sand, flat laminae"],
          ["2", "4–8 cm", "170 µm", "Fine sand, ripple laminae"],
          ["1 (base)", "0–4 cm", "210 µm", "Fine to medium sand, ripples, snail shells"]
        ] }],
      ["h", "How far the water reached"],
      ["fig", "flood", "Thickness of the flood sand across the plot, north (river side) to south."],
      ["p", "The sand is thickest near the river (0.32 m in BH-4) and thins to the south. In BH-3, where the old ground stood higher on cover loam, there is no flood sand at all. In Trench 2 the ground surface before the flood lay at about 329.6 m NHN, while at BH-3 it lay at about 330.4 m. So the water rose above 329.6 m on this plot but did not reach 330.4 m: the flood's edge ran across the south of the yard."],
      ["h", "Dating"],
      ["list", [
        "<b>Below:</b> the yard surface [[2006]] has 13th-century pottery on top and charcoal dated cal AD 1035–1160.",
        "<b>The sand itself:</b> optically stimulated luminescence (OSL) gives AD 1299–1389.",
        "<b>Above:</b> the house floors [[2004]] start with rye dated cal AD 1310–1410 and hold two 14th-century Regensburg pfennigs.",
        "<b>Cutting through:</b> the cesspit [[2012]] is lined with oak felled in winter 1361/62.",
        "So the flood came after the 13th century and before 1362. Full results in {{RN-08}}."
      ]],
      ["h", "Which flood?"],
      ["p", "In July 1342, around the feast of St Mary Magdalene on 22 July, a flood struck the Rhine, Main, Danube, Mosel and other rivers. Regensburg is one of the towns whose chronicles record it.[s9] Researchers estimate that about 13 billion tonnes of soil were washed off the land, as much as 2,000 years of normal weather would remove.[s9] A clean sand sheet on a riverside plot is exactly what such a flood leaves behind."],
      ["note", "Our layer fits 1342 on every count, but the dates cannot rule out another big Danube flood in the early 14th century. We call it the 1342 flood as the best match, not as proven."]
    ]
  },

  {
    id: "RN-06", type: "Building stone", issued: "3 Mar 2025", by: "Stone specialist",
    area: "Contexts 2006, 2003, 2015", status: "Final",
    title: "Building stone from the masons' yard",
    summary: "1,240 stone chips from the yard: 71% Upper Jurassic limestone, 24% Grünsandstein. Green sandstone grows from 14% in the lower part of the yard to 33% at the top.",
    body: [
      ["h", "Samples"],
      ["p", "Every chip over 2 mm was sieved out of a 40-litre sample of [[2006]], 12.6 kg in all. Each chip was sorted by eye and with a hand lens, tested with dilute acid, and twelve were cut into thin sections for the microscope. Mortar from the wall [[2015]] and stones from the rubble [[2003]] were checked the same way."],
      ["fig", "stones", "Stone chips from the masons' yard, % by weight."],
      ["table", {
        cols: ["Stone", "Chips", "Weight (kg)", "% weight", "How to tell", "Likely source"],
        rows: [
          ["Upper Jurassic limestone", "880", "8.95", "71", "Light grey to cream, very fine, fizzes hard in acid, sponge remains under the microscope", "Upper Jurassic massive limestones west of the city"],
          ["Grünsandstein", "310", "3.02", "24", "Green to green-brown, sandy, green glauconite grains, shell fragments, calcite cement", "Grünsandstein quarries near Bad Abbach and Ihrlerstein[s5]"],
          ["Other", "50", "0.63", "5", "Gneiss, granite and quartz pebbles from the gravel, brick", "On site"]
        ] }],
      ["h", "Under the microscope"],
      ["p", "The green sandstone chips hold 55–62% quartz, 8–14% glauconite and 20–30% calcite cement with shell fragments. That matches the real Regensburg (Ihrlerstein) Grünsandstein: an Upper Cretaceous (Cenomanian) sandstone held together mostly by carbonate, coloured green by glauconite and carrying fossil fragments.[s7] The limestone chips are fine-grained with sponge and microbial structures, like the Upper Jurassic massive limestones of the region.[s2]"],
      ["h", "A change over time"],
      ["table", {
        cols: ["Part of the yard", "Limestone", "Grünsandstein", "Other"],
        rows: [
          ["Upper 10 cm (13th century)", "62%", "33%", "5%"],
          ["Middle", "73%", "22%", "5%"],
          ["Lower 10 cm (11th century)", "81%", "14%", "5%"]
        ] }],
      ["p", "Regensburg's real buildings use the same two stones. At the cathedral, the oldest surviving parts (remains of the older cathedral's early 11th-century transept) are built only of light, massive limestone, chosen because it was easy to bring in and to work.[s5] From around 1480 Grünsandstein was also used in load-bearing parts of the towers and west front, probably a sign that the old limestone quarries were running out,[s5] and while the main portal was built the stone changed from fine white limestone to coarse Abbach Grünsandstein.[s6] Grünsandstein went into both the cathedral and the Stone Bridge.[s7]"],
      ["p", "The yard's shift towards green sandstone comes centuries before the cathedral's. That is one reason its stone counts are worth comparing with other medieval masons' waste ({{RN-12}})."],
      ["h", "Weathering"],
      ["p", "Many green sandstone blocks in the rubble [[2003]] crumble along their bedding, while the limestone is sound. The real Grünsandstein has a bad name for weathering, partly because the wrong stone was picked in the quarry.[s7] Air pollution adds to the damage: sulphur compounds from smoke form crusts that break down the cathedral's stones.[s5] For the Stone Bridge restoration that began in 2010, a suitable sandstone was eventually found in an abandoned quarry near Ihrlerstein.[s8]"],
      ["h", "Mortar"],
      ["p", "Mortar from the wall [[2015]] is lime with a Danube sand aggregate, about one part lime to three parts sand. Small limestone chips in it suggest the lime was burnt from the same limestone the masons were dressing."]
    ]
  },

  {
    id: "RN-07", type: "Sediments", issued: "27 Mar 2025", by: "Geoarchaeology lab",
    area: "Contexts 2007, 2011", status: "Final",
    title: "Dark earth: how a black layer formed",
    summary: "Thin sections and pollen show the dark earth is not a natural soil and not floors, but three centuries of middens and gardens churned together by worms.",
    body: [
      ["h", "Why it matters"],
      ["p", "Dark earth is the archaeologists' name for thick, even, dark layers found in many European towns. It looks like plain soil, so it is easy to dig straight through without asking how it formed. At Rupen-Nordfeta it is 50–60 cm thick and covers the early medieval hut."],
      ["h", "Thin sections"],
      ["p", "Four blocks were cut from [[2007]], set in resin and ground to 30 µm slices."],
      ["table", {
        cols: ["What we looked for", "What we found", "Meaning"],
        rows: [
          ["Charcoal", "6–9% of the slide area, small rounded pieces", "Hearth waste, moved and broken up many times"],
          ["Bone and burnt daub", "1–2%, scattered", "Household rubbish"],
          ["Ash and plant silica (phytoliths)", "Common, often in worm droppings", "Ash and straw spread on the ground"],
          ["Fabric", "Mostly earthworm droppings, no crusts", "Ground left open and churned by worms, not trampled floors"],
          ["Layering", "None", "Mixed as it grew, so it could not keep layers"]
        ] }],
      ["h", "Pollen"],
      ["p", "Pollen from the middle of the layer is 12% cereals, with ribwort plantain and other weeds of trodden ground. The natural flood loam [[2008]] below has alder, oak, hazel and willow instead: floodplain woodland. Between the two the woods were cleared and fields came close."],
      ["h", "Interpretation"],
      ["p", "The dark earth formed as rubbish heaps, ash and manured garden beds at the edge of a settlement, from about 780 to 1000 ({{RN-08}}). Phosphate seven times the natural value ({{RN-04}}) fits that picture. The hut [[2011]] below it is older and was already filled in when the dark earth began."]
    ]
  },

  {
    id: "RN-08", type: "Dating", issued: "9 May 2025", by: "Dating lab",
    area: "Trench 2", status: "Final",
    title: "Dating results",
    summary: "Five radiocarbon dates, one OSL date, four tree-ring samples and three coins. They agree with the order of the layers and pin the flood between the 13th century and 1362.",
    body: [
      ["h", "Radiocarbon"],
      ["p", "Only short-lived material (grain, twigs, nutshell) was dated, so the date is close to when the plant died. Ages were calibrated with the IntCal20 curve and are given at 95% probability."],
      ["table", {
        cols: ["Code", "Context", "Material", "Age (years BP)", "Calibrated date"],
        rows: [
          ["RNF-5", "[[2004]] lowest floor", "Charred rye grains", "590 ± 20", "cal AD 1310–1410"],
          ["RNF-4", "[[2006]] yard", "Hazel charcoal", "935 ± 20", "cal AD 1035–1160"],
          ["RNF-3", "[[2007]] upper part", "Oak twig charcoal", "1090 ± 22", "cal AD 895–1015"],
          ["RNF-2", "[[2007]] lower part", "Hazelnut shell", "1190 ± 24", "cal AD 772–890"],
          ["RNF-1", "[[2011]] hut fill", "Charred barley", "1305 ± 22", "cal AD 664–774"]
        ] }],
      ["h", "Luminescence (OSL)"],
      ["p", "Quartz sand from the middle of the flood sand [[2005]] was sampled in a light-proof tube. OSL measures when the grains last saw daylight. Result: 680 ± 45 years before 2024, which is AD 1299–1389. OSL cannot give a single year, but it puts the flood in the 14th century."],
      ["h", "Tree rings"],
      ["table", {
        cols: ["Sample", "Rings", "Sapwood", "Last ring", "Felling date"],
        rows: [
          ["D1", "64", "8", "1354", "after 1354"],
          ["D2", "74", "21, bark edge", "1361", "winter 1361/62"],
          ["D3", "58", "none", "1339", "after c. 1350"],
          ["D4", "61", "12", "1358", "after 1358"]
        ] }],
      ["p", "All four oak planks of the cesspit lining [[2014]] match each other. D2 keeps its bark edge, so its tree was cut in the winter of 1361/62. Oak was used green in the Middle Ages, so the pit was most likely dug in 1362."],
      ["h", "Coins"],
      ["list", [
        "Two Regensburg pfennigs of a 14th-century type in the house floors [[2004]].",
        "One pfennig of the early 1500s in the demolition rubble [[2003]]."
      ]],
      ["h", "Putting it together"],
      ["fig", "dates", "Date ranges in the order of the layers. Every range fits below the one above it."]
    ]
  },

  {
    id: "RN-09", type: "Environment", issued: "2 Jun 2025", by: "Environmental lab",
    area: "Contexts 2013, 2004", status: "Final",
    title: "What people ate: the cesspit",
    summary: "Sixty litres of waterlogged cesspit fill: rye bread, millet porridge, local grapes, imported figs, wild strawberries, river and sea fish, and the worm eggs that came with them.",
    body: [
      ["h", "Samples"],
      ["p", "Six 10-litre samples from the waterlogged lower metre of [[2013]] were washed through sieves of 2, 1 and 0.25 mm and sorted under a microscope. Nothing was burnt: seeds kept their skins because they never dried out."],
      ["table", {
        cols: ["Plant", "Part found", "Per 10 litres", "Notes"],
        rows: [
          ["Wild strawberry", "Seeds", "520", "Gathered at woodland edges"],
          ["Fig", "Seeds", "310", "Imported, most likely as dried fruit"],
          ["Raspberry / blackberry", "Seeds", "260", "Gathered or grown in gardens"],
          ["Grape", "Pips", "140", "Fresh grapes, raisins or wine pressings"],
          ["Elder", "Seeds", "95", "Berries for juice or medicine"],
          ["Rye", "Bran fragments", "common", "Rye bread"],
          ["Millet", "Husks", "common", "Porridge"],
          ["Bread wheat, oats", "Bran", "present", "Bread and porridge"],
          ["Plum, cherry", "Stones", "18", "Orchard fruit"],
          ["Flax", "Seeds", "12", "Oil or linen"],
          ["Walnut", "Shell pieces", "present", "Nuts"]
        ] }],
      ["h", "Animals and parasites"],
      ["list", [
        "<b>Fish:</b> bones of carp-family fish, pike and perch from the river, and herring, which came salted from the sea. Fish bone also lies between the house floors [[2004]].",
        "<b>Parasites:</b> whipworm (about 2,100 eggs per gram) and roundworm (about 600 per gram). Normal for a medieval town where water and food were easily dirtied."
      ]],
      ["h", "What it tells us"],
      ["p", "The household ate rye bread and millet porridge, fruit from gardens and woods, river fish and some traded foods: figs from the Mediterranean and herring from the sea. That points to a family of some means living in the house built after the flood."]
    ]
  },

  {
    id: "RN-10", type: "Management", issued: "15 Jul 2025", by: "Site geologist",
    area: "Whole plot", status: "Final",
    title: "Groundwater and preservation",
    summary: "Wood, seeds and leather survive only below about 2.9 m, where the ground stays wet and free of oxygen. Lowering the water table even half a metre would destroy them.",
    body: [
      ["h", "Twelve months of readings"],
      ["p", "BH-1, BH-2 and BH-4 were fitted as monitoring wells and read every week for a year. In Trench 2's well (BH-2) the water stood between 3.05 and 3.70 m below ground. It rose up to 0.4 m within days of high water on the Danube in spring and fell slowly through late summer."],
      ["table", {
        cols: ["Well", "Highest (m below)", "Lowest (m below)", "Range (m)"],
        rows: [
          ["BH-1", "2.95", "3.62", "0.67"],
          ["BH-4", "2.98", "3.58", "0.60"],
          ["BH-2", "3.05", "3.70", "0.65"]
        ] }],
      ["h", "Where things survive"],
      ["p", "Redox readings in the base of the cesspit [[2013]] were −120 mV, meaning no free oxygen: wood and seeds do not rot there. Above about 2.9 m the readings turn positive and only bone, pottery, metal and stone survive. That is exactly where the oak lining [[2014]] stops and turns into a brown stain."],
      ["h", "Risks"],
      ["table", {
        cols: ["Risk", "Cause", "Effect", "Measure"],
        rows: [
          ["Drying out", "Pumping for a new basement", "Wood and seeds rot within years", "No pumping below 3.0 m; build on piles, not a deep basement"],
          ["Pile damage", "Piles driven through the cesspit area", "Destroys the best-preserved deposit", "Keep piles out of a 3 m zone around [[2012]]"],
          ["Karst voids", "Dissolved pockets in the limestone (BH-1)", "Piles lose support", "Probe each pile position before driving"],
          ["Flooding", "Danube high water", "Water table rises up to 0.7 m", "No action needed: wetting is harmless to the remains"]
        ] }],
      ["note", "Two of the four lining planks were lifted for tree-ring dating ({{RN-08}}). The other two and the lowest 0.4 m of the cesspit fill were left in place, under the water table."]
    ]
  },

  {
    id: "RN-11", type: "Finds", issued: "21 Aug 2025", by: "Finds team",
    area: "Trench 2", status: "Final",
    title: "Finds register",
    summary: "1,033 sherds, 3.9 kg of animal bone, iron tools, coins, loom weights, leather and wood. The finds back up the dates and show what each phase was used for.",
    body: [
      ["h", "Finds by context"],
      ["table", {
        cols: ["Context", "Pottery (sherds)", "Animal bone (kg)", "Metal", "Other"],
        rows: [
          ["[[2002]] garden soil", "214", "0.31", "1 copper token", "3 clay pipe stems, oyster shell"],
          ["[[2003]] rubble", "88", "0.05", "1 pfennig, nails", "41 roof-tile pieces"],
          ["[[2013]] cesspit", "63", "0.22", "–", "2 shoe soles, wooden bowl, glass beaker base"],
          ["[[2004]] floors", "131", "0.18", "2 pfennigs, knife blade", "Fish bone"],
          ["[[2005]] flood sand", "6", "–", "–", "River snails"],
          ["[[2006]] yard", "37", "0.04", "Point chisel", "Whetstone"],
          ["[[2007]] dark earth", "402", "3.10", "Iron buckle", "Bone comb fragment, glass bead"],
          ["[[2011]] hut fill", "58", "0.02", "–", "11 loom weights, spindle whorl"],
          ["Total", "999 + 34 unstratified", "3.92", "", ""]
        ] }],
      ["h", "Selected finds"],
      ["list", [
        "<b>Find 2011/03–13.</b> Eleven loom weights of fired clay, ring-shaped, 9–11 cm across, in a line along the hut floor. They hung from an upright loom that stood against the wall.",
        "<b>Find 2006/01.</b> Iron point chisel, 19 cm, its tip mushroomed from hammering. Found lying on the yard surface.",
        "<b>Find 2004/22.</b> Regensburg pfennig, silver, 14th-century type, from between the third and fourth floors.",
        "<b>Find 2013/40.</b> Turned wooden bowl of maple, 16 cm across, from the waterlogged base of the cesspit.",
        "<b>Find 2013/41–42.</b> Two leather shoe soles, a child's and an adult's, turn-shoe construction.",
        "<b>Find 2007/88.</b> Fragment of a double-sided bone comb with iron rivets."
      ]],
      ["h", "Pottery and dating"],
      ["p", "The hut fill and lower dark earth have hand-built and early wheel-thrown wares. Hard grey wares come in with the yard, and glazed red wares and stove tiles only in the garden soil. The sequence fits the radiocarbon and coin dates in {{RN-08}}."]
    ]
  },

  {
    id: "RN-12", type: "Synthesis", issued: "1 Oct 2025", by: "Project lead",
    area: "Whole plot", status: "Final",
    title: "Synthesis: 1,400 years in 3.6 metres",
    summary: "The whole story of the plot from the ice age gravel to the modern yard, and the answers to the four questions set in RN-01.",
    body: [
      ["h", "The story of the plot"],
      ["phases"],
      ["h", "Answers to the questions"],
      ["table", {
        cols: ["Question", "Answer", "Main evidence"],
        rows: [
          ["Q1. How did the ground form?", "Late Glacial Danube gravel, then Holocene flood loam, then the first people around 700.", "{{RN-02}}, {{RN-03}}, {{RN-04}}"],
          ["Q2. What stone did builders use?", "Upper Jurassic limestone first, then more and more Grünsandstein. The city's real buildings use both, with the cathedral's switch coming later.", "{{RN-06}}"],
          ["Q3. Did the 1342 flood reach the plot?", "Very likely. A single flood sand dated between the 13th century and 1362 covers most of the yard, and its edge runs across the south.", "{{RN-05}}, {{RN-08}}"],
          ["Q4. What keeps organic remains?", "Permanent groundwater below about 2.9–3.3 m. Lowering it would destroy them.", "{{RN-10}}"]
        ] }],
      ["h", "What should happen next"],
      ["list", [
        "Keep the groundwater wells running for at least five more years.",
        "Any new building on the plot should stand on piles with no pumping below 3.0 m.",
        "Compare the flood sand with other dated 14th-century flood layers along the Danube.",
        "Publish the stone counts so they can be compared with other medieval masons' waste in the region."
      ]]
    ]
  }
];
