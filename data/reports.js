/* Study reports on the 1995–1998 Neupfarrplatz excavation in Regensburg.
   These are summaries of the published record, not the excavators' own
   reports. Every fact carries a source number that links to sources.html.

   Inline marks used in the text:
     [[L4]]    link to a layer on the Layers page
     {{NP-05}} link to another report
     [s12]     footnote to source 12 on sources.html
     ((gap))   start of a "not published online" note (block type "gap") */
window.REPORTS = [
  {
    id: "NP-01", topic: "Ground", period: "Roman times to today",
    title: "The square and the ground beneath it",
    summary: "What lies under Neupfarrplatz: about six metres of ground made by people, with the Roman camp at the bottom, and what the sources do not say about the natural ground below.",
    body: [
      ["gap", "No soil, sediment or geological report from the 1995–1998 dig is published online. This report gathers what the public sources say about the ground, and links to the real regional geology."],
      ["h", "Where it is"],
      ["p", "Neupfarrplatz lies in the centre of Regensburg's old town, a little south of the cathedral.[s12] The city stands at the Danube's northernmost point, where the Naab and the Regen join it.[s10]"],
      ["h", "Ground made by people"],
      ["p", "The remains of the Roman legionary camp lie about 6 m below today's square, with fragments of the synagogue destroyed in 1519 above them.[s18] The square has been lived on for about 2,000 years.[s18] So the top six metres are not natural soil but walls, floors, cellars, rubble and fill left by people."],
      ["table", {
        cols: ["Depth", "What is there", "Source"],
        rows: [
          ["Surface", "Paving, the Misrach floor relief, the museum stairs", "[s12][s16]"],
          ["About 1.5 m", "Roof of the 1939/40 ring bunker, which runs at the level of the medieval cellars", "[s21]"],
          ["About 6 m", "Remains of the Roman camp Castra Regina", "[s18]"],
          ["Deeper", "Natural ground: not described in the online sources", "–"]
        ] }],
      ["fig", "layers", "The layers in order, youngest at the top. Schematic, not to scale: the sources give only the two depths marked. Click a layer on the Layers page for details."],
      ["h", "Lines in the paving"],
      ["p", "Wahlenstraße follows the line of Castra Regina's west wall. The wall crossed today's square, where it is marked in the paving, and ran about 300 m further south to today's St.-Peters-Weg.[s12] After 900 Duke Arnulf I had this west wall pulled down and built a new town wall about 500 m further west.[s12]"],
      ["h", "The natural ground"],
      ["p", "None of the online sources describes the natural ground under the Roman layer at this spot. The Geology page sets out what lies under Regensburg in general: the Danube's gravel terraces, the Tertiary Molasse south of the river and the Upper Jurassic limestone below.[s1][s2][s4]"],
      ["p", "Full story of the layers in {{NP-03}}."]
    ]
  },

  {
    id: "NP-02", topic: "Excavation", period: "1995–1998",
    title: "The excavation, 1995–1998",
    summary: "How a routine dig during the square's redesign became the largest excavation in Regensburg's old town, and found the synagogue where nobody expected it.",
    body: [
      ["table", {
        cols: ["Item", "What the sources say"],
        rows: [
          ["Dates", "1995–1998[s11][s17][s20]; the main work on the Jewish quarter ran from summer 1995 to early 1997[s16]"],
          ["Carried out by", "Bavarian State Office for Monument Protection (BLfD)[s20]"],
          ["Area", "About 3,000 m², the largest excavation in the city's core[s11][s16]"],
          ["Deepest remains", "Roman camp, about 6 m below the square[s18]"],
          ["Main results", "Synagogue and its predecessor, vaulted cellars of the Jewish quarter, a gold hoard, the community's seal ring[s11][s12][s16]"]
        ] }],
      ["h", "Why it started"],
      ["p", "In the 1990s the square was calmed of traffic and redesigned.[s12] The dig began in summer 1995 as a routine measure before that work.[s16]"],
      ["h", "A surprise"],
      ["p", "For centuries the synagogue was thought to lie under the Neupfarrkirche. The dig found it west of the church instead.[s13][s22] The foundations of its three central columns matched Albrecht Altdorfer's etching of 1519, so there was no doubt which building it was.[s13]"],
      ["h", "A contested dig"],
      ["p", "Local political arguments about the excavation drew strong civic engagement, and that shaped how much was dug and how.[s12] Archaeologist Silvia Codreanu-Windauer published an early account of the results in English in 1999.[s13]"],
      ["h", "After the dig"],
      ["p", "Part of the excavated area was kept open underground and became the museum document Neupfarrplatz.[s17] In 2019 a project at LMU Munich led by Bernd Päffgen, funded by the German Research Foundation (DFG) and the city, began a full scientific analysis of the dig, including a digital 3D reconstruction of the excavated and built remains.[s20]"],
      ["h", "Where the sources disagree"],
      ["table", {
        cols: ["Question", "One answer", "Another answer"],
        rows: [
          ["When did the dig run?", "1995–1997[s12][s13]", "1995–1998[s11][s17][s20]"],
          ["How many houses stood in the quarter?", "39 houses[s12]", "40 houses or dwellings[s15][s19]"],
          ["When was Misrach unveiled?", "13 July 2005[s12]", "2004[s14][s16]"]
        ] }]
    ]
  },

  {
    id: "NP-03", topic: "Layers", period: "Roman times to today",
    title: "Two thousand years in layers",
    summary: "From Roman officers' houses to a Second World War bunker: the order of what lies under the square, and the gaps in what we know.",
    body: [
      ["p", "The city describes the dig as showing the layers of the town's growth almost like a textbook: from Roman officers' quarters, through the medieval Jewish quarter and its synagogue, to an air-raid bunker of the Second World War.[s17]"],
      ["fig", "layers", "Schematic order of the layers, youngest at the top. Not to scale. Dashed layers are ones the sources do not describe."],
      ["h", "Layer by layer"],
      ["layers"],
      ["h", "How the layers were made"],
      ["list", [
        "<b>Building up.</b> Each period built on the remains of the one before, so the ground rose. The Roman remains now lie about 6 m down.[s18]",
        "<b>Filling in.</b> When the Jewish quarter was destroyed in 1519, the massive cellar walls were not removed: the cellars were filled in and the square was levelled.[s21] That is why so many survived for the archaeologists.[s16]",
        "<b>Cutting through.</b> The 1939/40 ring bunker was dug at the same level as those cellars and runs straight through them.[s21]"
      ]],
      ["note", "Only two depths are given in the sources: about 1.5 m to the roof of the bunker[s21] and about 6 m to the Roman remains.[s18] Everything else in the drawing shows order, not depth."]
    ]
  },

  {
    id: "NP-04", topic: "Roman", period: "179 – late antiquity",
    title: "Castra Regina under the square",
    summary: "The deepest layer: officers' residences inside the Roman legionary camp, about six metres down, and the camp wall that still shapes a street.",
    body: [
      ["p", "The Roman fortress Castra Regina was built in AD 179 for Legio III Italica under Emperor Marcus Aurelius.[s10] Neupfarrplatz lies inside it."],
      ["table", {
        cols: ["What", "Detail", "Source"],
        rows: [
          ["Use of the ground", "Roman officers' residences in antiquity and late antiquity", "[s19]"],
          ["Depth", "About 6 m below today's square", "[s18]"],
          ["Camp wall", "Remains of the legionary camp wall can be seen in the museum", "[s12][s19]"],
          ["Find", "A small bronze statuette of a god from the fortress period", "[s16]"]
        ] }],
      ["h", "A wall you can still follow"],
      ["p", "The camp's west wall ran across today's square, where it is marked in the paving. Wahlenstraße follows its line, and the wall carried on about 300 m south to St.-Peters-Weg before turning east to the south gate.[s12] After 900 Duke Arnulf I had the west wall pulled down to enlarge the town.[s12]"],
      ["gap", "The plan and building phases of the Roman houses under the square are not published online."]
    ]
  },

  {
    id: "NP-05", topic: "Jewish quarter", period: "c. 1000 – 1519",
    title: "The medieval Jewish quarter",
    summary: "One of the most important Jewish communities in medieval Germany lived here for about 500 years. The dig uncovered its cellars, many almost perfectly preserved.",
    body: [
      ["h", "The community"],
      ["p", "There is evidence of a Jewish community in Regensburg from 981.[s12][s19] The Jewish quarter on today's square is first documented in 1020.[s16] By about 1000 the community had a synagogue, a school, a court and a cemetery,[s15] and by 1050 Jewish merchants from Regensburg traded with Russia and Hungary.[s15]"],
      ["p", "After 1215 Jews were only allowed to live inside the walled area of today's Neupfarrplatz.[s15] The quarter held the synagogue, a ritual bath (mikveh), the yeshiva (Talmud school), the rabbinical court, a hospital, a butcher's shop, a communal fountain, a wedding house and a large warehouse.[s16]"],
      ["h", "How big was it?"],
      ["table", {
        cols: ["Measure", "Figure", "Source"],
        rows: [
          ["Houses", "39 houses on about 14,000 m² (after Wittmer 2001)", "[s12]"],
          ["Houses", "40 houses or dwellings", "[s15][s19]"],
          ["People in 1519", "About 500 members of the community, plus 80 yeshiva students", "[s16]"]
        ] }],
      ["h", "What the dig found"],
      ["p", "Many almost perfectly preserved cellars with Romanesque and Gothic vaults were dug out and recorded.[s16] Three of them are now part of the museum.[s12][s16] The cellars survived because they were filled in, not dug out, when the quarter was destroyed in 1519 ({{NP-08}}).[s21]"],
      ["gap", "A house-by-house plan of the quarter and a count of the excavated cellars are not published online. The LMU project ({{NP-02}}) is working on a reconstruction.[s20]"]
    ]
  },

  {
    id: "NP-06", topic: "Synagogue", period: "11th century – 1519",
    title: "The synagogue",
    summary: "Found west of the church, not under it. Its foundations match Albrecht Altdorfer's etching of 1519 so closely that the identification is certain.",
    body: [
      ["h", "Two buildings"],
      ["p", "The first synagogue was built around the middle of the 11th century and badly damaged by fire in the next century.[s22] LMU dates the original building to the 11th century.[s20] The synagogue Altdorfer drew is late Romanesque to early Gothic, dated to the early 13th century, and replaced a smaller building of the late 11th century.[s13] One source gives its completion as 1227, which would make it only the fifth synagogue in the Empire after Cologne, Trier, Speyer and Worms, with builders from the cathedral workshop at Reims.[s15] It seated more than 300 people.[s15]"],
      ["h", "Measurements"],
      ["table", {
        cols: ["Part", "Size", "Source"],
        rows: [
          ["Long walls (north and south)", "16.20 m", "[s13]"],
          ["West wall", "6.30 m", "[s13]"],
          ["East wall, with the Torah shrine", "9.20 m", "[s13]"],
          ["Bima (reading platform)", "3.50 × 3.25 m", "[s13]"]
        ] }],
      ["fig", "synagogue", "Schematic plan drawn from the published measurements. Wall lengths and bima size are from source 13; the exact shape, the spacing of the three columns and the bima's position on the middle column are approximate."],
      ["h", "The room"],
      ["p", "A two-naved hall divided by three columns. The bima stood in the middle, raised by three steps around the middle column, and the Torah shrine stood against the east wall. There were doors on the north and south sides; the south door was later walled up.[s13] The Regensburg synagogue became the model for later synagogues in Prague and Vienna.[s13]"],
      ["h", "Altdorfer's etchings"],
      ["p", "It is the only medieval Ashkenazi synagogue whose interior is known from a picture.[s13] The painter Albrecht Altdorfer drew it in the days before it was torn down and made two etchings: the entrance hall, captioned as demolished on 21 February 1519, and the interior.[s13] His wish to draw it briefly delayed the demolition.[s22]"],
      ["h", "What survives"],
      ["list", [
        "The foundations, including those of the three central columns.[s13]",
        "Pieces of the bima found around 1940: two parts of its parapet, a small column with a bud capital and part of an arch, now in the city museum.[s13]",
        "Its plan, traced on the square by Dani Karavan's memorial Misrach ({{NP-11}})."
      ]]
    ]
  },

  {
    id: "NP-07", topic: "Finds", period: "Roman times – 1519",
    title: "The finds",
    summary: "624 gold coins hidden in two clay pots, the community's seal ring, a bronze figure of Aaron and a Roman statuette: the best-known finds and where they are now.",
    body: [
      ["table", {
        cols: ["Find", "What it is", "Date", "Source"],
        rows: [
          ["Gold hoard", "624 gold coins buried in two clay pots in one of the cellars; now in the Historisches Museum", "Around 1388[s16]; end of the 14th century[s11][s19]", "[s11][s12][s16]"],
          ["Seal ring", "Finger ring with the seal of the Jewish community: a star and a crescent moon", "Medieval", "[s12][s16][s19]"],
          ["Aaron figure", "Rare bronze figure of the High Priest Aaron", "15th century", "[s16]"],
          ["Roman statuette", "Small bronze figure of a god", "Roman fortress period", "[s16]"],
          ["Bima fragments", "Parapet pieces, a small column with a bud capital, part of an arch; in the city museum", "Found around 1940", "[s13]"]
        ] }],
      ["h", "Why a hoard?"],
      ["p", "Coins buried in pots in a cellar were hidden on purpose and never recovered by their owner. The sources consulted do not say who hid them or why."],
      ["gap", "A full catalogue of the finds is not online. See {{NP-12}} for the published work."]
    ]
  },

  {
    id: "NP-08", topic: "History", period: "1519",
    title: "1519: expulsion and destruction",
    summary: "How the city expelled about 500 people within days, tore down their synagogue and houses, and desecrated their cemetery.",
    body: [
      ["h", "Before 1519"],
      ["p", "Religious hatred, invented ritual murder charges and the economic interests of townspeople, merchants and craftsmen led the city to ask the emperor for leave to expel its Jews. Emperor Maximilian I, who was paid as their protector, refused.[s12] The cathedral preacher Balthasar Hubmaier stirred up hostility.[s12]"],
      ["h", "February 1519"],
      ["table", {
        cols: ["Date", "Event", "Source"],
        rows: [
          ["12 January", "Emperor Maximilian I dies in Wels", "[s13]"],
          ["21 February", "The city council orders the expulsion of the Jewish community", "[s14][s16][s20]"],
          ["21 February", "Demolition of the synagogue's entrance hall begins; the main hall follows the next day", "[s13]"],
          ["by 25 February", "Deadline for all members to leave, by one account; others say within two weeks", "[s13][s15][s22]"]
        ] }],
      ["p", "About 500 members of the community were driven out,[s12][s16] along with about 80 yeshiva students.[s16] Two women who had just given birth died during the expulsion. Some found refuge for a time in Stadtamhof and Sallern, then outside the city.[s15]"],
      ["h", "Destruction"],
      ["p", "The synagogue, the community's buildings and almost all the large houses were destroyed.[s16] Their stones were taken and used as building material.[s12] The Jewish cemetery, with over 4,000 gravestones by one archivist's count, was desecrated and its stones stolen;[s14] many were built into Regensburg houses.[s22]"],
      ["h", "A pilgrimage on the ruins"],
      ["p", "In April 1519 a wooden chapel was consecrated on the site, and a pilgrimage to the \"Schöne Maria\" grew up within months, justified by a made-up miracle said to have happened while the synagogue was torn down. It was one of 16 similar cases where a church to Mary was built as anti-Jewish victory architecture.[s14]"]
    ]
  },

  {
    id: "NP-09", topic: "Building stone", period: "1519 – 1860",
    title: "Stone and rubble: building on the ruins",
    summary: "The new church was built with stones from the destroyed houses and gravestones from the cemetery, and stands on a foundation of their rubble.",
    body: [
      ["h", "Reused stone"],
      ["p", "On 19 September 1519 the foundation stone of a stone pilgrimage church was laid, to plans by the Augsburg master builder Hans Hieber. Rubble stones from the demolished Jewish houses and gravestones from the plundered Jewish cemetery went into it.[s14]"],
      ["h", "A foundation of rubble"],
      ["p", "The church stands on a plinth foundation made from the rubble of the destroyed houses.[s14] Below the square the old cellar walls were left in place, the cellars filled and the ground levelled,[s21] which is the rubble layer [[L3]] on the Layers page. The museum shows foundations of the Neupfarrkirche.[s12]"],
      ["h", "An unfinished church"],
      ["table", {
        cols: ["Year", "What happened", "Source"],
        rows: [
          ["1519", "Building starts after the destruction of the quarter", "[s12][s14]"],
          ["1528", "Work stops for lack of money; only the two towers and the choir are finished", "[s12][s14]"],
          ["1540", "The unfinished church, closed off on the west by a makeshift wall, is consecrated", "[s14]"],
          ["1542", "The city turns Lutheran and makes it its first Protestant parish church, the Neupfarrkirche", "[s12][s14]"],
          ["1860", "A new west choir by Ludwig Foltz finally closes the building", "[s12]"]
        ] }],
      ["p", "The planned nave would have reached west beyond the site of the synagogue.[s14]"],
      ["gap", "The online sources do not say which kinds of rock the reused stones were. For the building stones used across medieval Regensburg (light Jurassic limestone and green Cretaceous Grünsandstein) see the Geology page."]
    ]
  },

  {
    id: "NP-10", topic: "Modern", period: "1939 – 1970s",
    title: "Bunker, cistern and department store",
    summary: "In 1939/40 a concrete escape gallery was driven through the medieval cellars, and in the 1970s 22 old houses on the square were pulled down.",
    body: [
      ["h", "The ring bunker"],
      ["table", {
        cols: ["Feature", "Detail"],
        rows: [
          ["Built", "1939/40[s12][s21]"],
          ["Material", "Unreinforced tamped concrete[s21]"],
          ["Cover", "About 1.5 m of ground above it[s21]"],
          ["Shape", "A gallery about 2.5 m wide running under the square as an irregular pentagon, with three exits to the square at first[s21]"],
          ["Purpose", "Not a public shelter but an escape gallery joining the cellars of the surrounding houses, so people could get out if their houses were destroyed[s21]"]
        ] }],
      ["p", "The city knew the gallery would be built into the area of the former Jewish quarter.[s21] It runs at the same level as the cellars of the houses torn down in 1519, straight through them.[s21] Together with a fire-water cistern under the north-east of the square, it badly damaged many of the surviving foundations, and the gallery was linked by tunnels to medieval cellars turned into air-raid cellars.[s12]"],
      ["h", "The department store"],
      ["p", "In the early 1970s, three years before Bavaria's monument protection law came into force, 22 old houses on the east and south sides of the square were demolished for a department store. Only the facade of the former main guardhouse was kept.[s12]"],
      ["p", "Part of the ring bunker is now inside the museum.[s12][s19]"]
    ]
  },

  {
    id: "NP-11", topic: "Museum", period: "Today",
    title: "Seeing it today",
    summary: "Three cellars, Roman walls, church foundations and part of the bunker underground, and the synagogue's plan on the square above.",
    body: [
      ["h", "document Neupfarrplatz"],
      ["p", "The information centre was designed by the Regensburg architects Lydia Lehner and Franz Robold and presents the 2,000-year history of the square in multimedia.[s12] Its underground rooms show walls of the Roman camp, three cellars of the medieval Jewish quarter, foundations of the Neupfarrkirche and part of the 1940 ring bunker, and a film takes visitors through the periods.[s12] Visits are by guided tour only.[s18]"],
      ["h", "Misrach"],
      ["p", "The Israeli artist Dani Karavan traced the synagogue's floor plan on the square as a walkable relief of white concrete.[s12] Misrach is Hebrew for east.[s22] Sources date its unveiling to 13 July 2005[s12] or to 2004.[s16]"],
      ["h", "Elsewhere in the city"],
      ["list", [
        "The gold hoard: Historisches Museum Regensburg.[s12]",
        "Pieces of the bima: the city museum.[s13]"
      ]]
    ]
  },

  {
    id: "NP-12", topic: "Further reading", period: "Open questions",
    title: "What is still unknown, and where to read more",
    summary: "What the public record leaves open, and the published work that goes further than this site.",
    body: [
      ["h", "Gaps in the online record"],
      ["list", [
        "The excavators' full scientific report, with plans and sections.",
        "Any soil, sediment or geological study of the ground under the square.",
        "The natural ground below the Roman layer.",
        "What happened on the spot between Roman times and the first Jewish houses.",
        "A house-by-house plan of the quarter and a count of the cellars.",
        "The full finds catalogue."
      ]],
      ["p", "The LMU project funded by the DFG ({{NP-02}}) is the most likely place for these to appear.[s20]"],
      ["h", "Published work"],
      ["list", [
        "Codreanu-Windauer, S. (1999). The Medieval Jewish Quarter of Regensburg and its Synagogue: Archaeological Research 1995–1997. In T. Insoll (ed.), <i>Case Studies in Archaeology and World Religion</i>. Oxford, 139–152.[s13]",
        "Haverkamp, E., Codreanu-Windauer, S., Müller-Reinholz, P. and Päffgen, B. (2016). Juden im mittelalterlichen Regensburg. Die Ausgrabungen am Neupfarrplatz. <i>Bayerische Archäologie</i> 1, 26–33.[s23]",
        "Codreanu-Windauer, S., Müller-Reinholz, P. and Päffgen, B. (2018). Das jüdische Viertel im mittelalterlichen Regensburg und die Ausgrabungen am Neupfarrplatz. In K. Himmelstein (ed.), <i>Jüdische Lebenswelten in Regensburg</i>. Regensburg, 14–21.[s22]",
        "Codreanu-Windauer, S. (2007). 21. Februar 1519: Die Vertreibung der Juden aus Regensburg. In A. Schmid and K. Weigand (eds.), <i>Bayern nach Jahr und Tag</i>. Munich, 193–215.[s13]",
        "Dallmeier, M., Hage, H. and Reidel, H. (eds.) (2002). <i>Der Neupfarrplatz. Brennpunkt – Zeugnis – Denkmal</i>. Regensburg.[s12]",
        "Brekle, H. E. (1997). <i>Das Regensburger Ghetto. Foto-Impressionen von den Ausgrabungen</i>. Regensburg.[s12]",
        "Noll, T. (2009). Albrecht Altdorfers Radierungen der Synagoge in Regensburg. In L. Grenzmann et al. (eds.), <i>Wechselseitige Wahrnehmung der Religionen im Spätmittelalter und in der Frühen Neuzeit</i>, vol. 1. Berlin, 189–230.[s13]"
      ]]
    ]
  }
];
