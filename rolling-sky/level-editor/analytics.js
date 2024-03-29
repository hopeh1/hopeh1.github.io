PopupManager.setupPopup();
var firstselectobj,
  a,
  trgt,
  tbi,
  browserName = Browser._Get();
Browser.Firefox, navigator.userAgent.indexOf("Android");
const params = new URLSearchParams(window.location.search);
var maxtile = RollingSky.maxtile,
  allowdraw = !1,
  allowscroll = !0,
  canvas = document.getElementById("canvas"),
  canvasAlt = document.getElementById("canvasAlt"),
  line = canvas.innerHTML,
  levellengthinput = document.getElementById("length"),
  isUsingTempEraser = !1;
function autostart() {
  askToLoadOverwrite() &&
    (loadnumber(parseInt(levellengthinput.value)),
    start(levellengthinput.value));
}
function loadDebugLevel() {
  start(128);
}
function scrollpos(e) {
  (document.documentElement.style.scrollBehavior = "revert !important"),
    (document.body.scrollTop = e),
    (document.documentElement.scrollTop = e),
    window.scrollTo(0, e),
    (document.documentElement.style.scrollBehavior = "smooth !important");
}
function askToLoadOverwrite() {
  return (
    !loadlevelcollection("lastleveldata", !0, !0) ||
    (!!confirm(Lang.resolve("webeditor.alerts.overwritesessionlevel.one")) &&
      (!!confirm(Lang.resolve("webeditor.alerts.overwritesessionlevel.two")) ||
        void 0))
  );
}
function start(e) {
  console.log("Creating a new level with " + e + " rows...");
  try {
    if (e >= 1) {
      canvas.innerHTML = line;
      var t = line;
      for (let l = 1; l < e; l++) t += line;
      (canvas.innerHTML = t),
        (document.getElementById("startmenu").style.display = "none"),
        (document.getElementById("level").style.visibility = "visible"),
        scrollpos(document.getElementById("doc").scrollHeight);
    }
  } catch {
    console.error("Creating new level with " + e + " rows failed.");
  }
}
var tileselectinput = document.getElementById("input"),
  tileselectval = 0;
function changeval() {
  tileselectval = parseInt(tileselectinput.value);
}
function detectLeftButton(e) {
  return "buttons" in (e = e || window.event)
    ? 1 == e.buttons
    : 1 == (e.which || e.button);
}
function detectRightButton(e) {
  return "buttons" in (e = e || window.event)
    ? 2 == e.buttons
    : 1 == (e.which || e.button);
}
(document.onmousemove = function (e) {
  (evt = e = e || window.event), mobiledragdraw(e, e.target, !0);
}),
  (document.onmousedown = function (e) {
    (evt = e = e || window.event), mobiledragdraw(e, e.target, !0);
  }),
  (document.onmouseup = function (e) {
    evt = e = e || window.event;
  });
const queryString = window.location.search,
  urlParams = new URLSearchParams(queryString),
  leveldata = urlParams.get("l");
function tryloadfromurl() {
  null != leveldata &&
    ((a = leveldata.replaceAll("-", "\n")), delay(10).then(() => load001(a)));
}
function load001(e) {
  load(e), window.history.replaceState(null, null, window.location.pathname);
}
function delay(e) {
  return new Promise((t) => setTimeout(t, e));
}
function loadtourl() {
  document.getElementById("copyout");
  var e =
    window.location.href.split("?")[0] +
    "?l=" +
    generate(!0).replaceAll("\n", "-");
  (copyout.value = e),
    copyout.select(),
    copyout.setSelectionRange(0, 99999),
    navigator.clipboard.writeText(copyout.value);
}
var touchHasMoved = !1;
function mobiledrawsv(e) {
  mobiledragdraw(e);
}
document.addEventListener(
  "touchstart",
  (e) => {
    mobiledragdraw(e, null, !1, !0), (touchHasMoved = !1);
  },
  !1
),
  document.addEventListener(
    "touchmove",
    (e) => {
      (touchHasMoved = !0),
        "C-TILE" == e.target.tagName && mobiledragdraw(e, null, !1, !0),
        1 !== e.scale && e.preventDefault();
    },
    !1
  ),
  document.addEventListener(
    "touchend",
    (e) => {
      touchHasMoved || mobiledragdraw(e, null, !1, !1);
    },
    !1
  );
var isGeoStartBrush = !1,
  isGeoEndBrush = !1;
function mobiledragdraw(e, t = null, l = !1, n = !1) {
  try {
    (t = document.elementsFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    )[0]),
      e.preventDefault();
  } catch {
    t = e.target;
  }
  if (l) {
    if (1 == detectLeftButton(e)) {
      if ("C-TILEPREV" == t.tagName) {
        (tileselectval = parseInt(t.classList[0])), Obstacle.hideCounter();
        return;
      }
      if (editor.Dev.pathDrawElement && "C-TILE" == t.tagName) {
        e.preventDefault(), t.classList.add("pathPart");
        return;
      }
    } else if (1 != detectRightButton(e)) return;
    else if ("C-TILE" == t.tagName) {
      e.preventDefault(),
        t.classList.contains("pathPart")
          ? t.classList.remove("pathPart")
          : !editor.Dev.pathDrawElement && allowdraw && (t.className = "0");
      return;
    }
  }
  preventNaNval();
  try {
    if ("C-TILEPREV" == t.tagName) {
      (tileselectval = parseInt(t.classList[0])), Obstacle.hideCounter();
      return;
    }
    if (allowdraw && "C-TILE" == t.tagName && !iscolorpicking) {
      if (isGeoStartBrush) {
        switch (t.className) {
          case "0":
            t.className = "181";
            break;
          case "1":
            t.className = "182";
            break;
          case "2":
            t.className = "184";
            break;
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
            t.className = "183";
            break;
          case "586":
            t.className = "589";
        }
        return;
      }
      if (isGeoEndBrush) {
        switch (t.className) {
          case "0":
            t.className = "185";
            break;
          case "1":
            t.className = "186";
            break;
          case "2":
            t.className = "188";
            break;
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
            t.className = "187";
        }
        return;
      }
      isUsingRandomizer && updaterandomizermobile(t),
        isGeoStartBrush ||
          isGeoEndBrush ||
          isUsingRandomizer ||
          (isUsingTempEraser
            ? (t.className = "0")
            : (t.className = tileselectval.toString()));
    }
    "C-SEL" != t.tagName ||
      n ||
      ((tileselectval = parseInt(t.className)),
      geostartbrushoff(),
      geoendbrushoff(),
      (document.getElementById("brushRandom").checked = !1)),
      checkcolorpicker(e),
      checkgeostartbrush(e);
  } catch {}
}
var iscolorpicking = !1,
  colorpickerbutton = document.getElementById("cpb");
function checkcolorpicker(e) {
  preventNaNval(),
    iscolorpicking &&
      "C-TILE" == e.target.tagName &&
      !isNaN(parseInt(e.target.className)) &&
      ((tileselectval = parseInt(e.target.className)), colorpickeroff()),
    "clp" == e.target.className && colorpickeron();
}
function preventNaNval() {
  isNaN(tileselectval) && (tileselectval = 0);
}
function colorpickeron() {
  (iscolorpicking = !0),
    geostartbrushoff(),
    geoendbrushoff(),
    colorpickerbutton.classList.add("selected");
}
function colorpickeroff() {
  (iscolorpicking = !1), colorpickerbutton.classList.remove("selected");
}
var geostartbrushbutton = document.getElementById("geobrush"),
  geoendbrushbutton = document.getElementById("geobrushAlt");
function checkgeostartbrush(e) {
  "georepl" == e.target.className && geostartbrushon(),
    "georeplAlt" == e.target.className && geoendbrushon();
}
function geostartbrushon() {
  (isGeoStartBrush = !0),
    colorpickeroff(),
    geostartbrushbutton.classList.add("selected"),
    geoendbrushoff();
}
function geostartbrushoff() {
  (isGeoStartBrush = !1), geostartbrushbutton.classList.remove("selected");
}
function geoendbrushon() {
  (isGeoEndBrush = !0),
    colorpickeroff(),
    geoendbrushbutton.classList.add("selected"),
    geostartbrushoff();
}
function geoendbrushoff() {
  (isGeoEndBrush = !1), geoendbrushbutton.classList.remove("selected");
}
var CMath = {
    percent: (e, t) => e / t,
    intRandom: (e, t) => Math.floor(Math.random() * t) + e,
  },
  randomizerChoices = [0],
  isUsingRandomizer = !1;
function updaterandomizer(e) {
  if (
    (randomizerChoices = splitNewline(
      document.getElementById("askrandomin").value
    )).length > 0 &&
    "" != randomizerChoices[0]
  ) {
    for (var t = 0; t < randomizerChoices.length; t++)
      randomizerChoices[t] > maxtile && (randomizerChoices[t] = 0);
    var l = randomizerChoices[CMath.intRandom(0, randomizerChoices.length)];
    e.target.className = l;
  }
}
function updaterandomizermobile(e) {
  if (
    (randomizerChoices = splitNewline(
      document.getElementById("askrandomin").value
    )).length > 0 &&
    "" != randomizerChoices[0]
  ) {
    for (var t = 0; t < randomizerChoices.length; t++)
      randomizerChoices[t] > maxtile && (randomizerChoices[t] = 0);
    var l = randomizerChoices[CMath.intRandom(0, randomizerChoices.length)];
    e.className = l;
  }
}
function tryScrollToTile() {
  var e = parseInt(prompt(Lang.resolve("webeditor.prompts.findtile"), "0"));
  if (void 0 != e)
    try {
      console.log("Scrolling to tile " + e + "..."), scrollToTile(e);
    } catch {
      console.error("Could not scroll to tile " + e + ".");
    }
}
function scrollToTile(e) {
  if (0 != e) {
    var t = document.querySelectorAll(
      "#selmenu > c-sel.\\3" +
        e.toString().charAt(0) +
        " " +
        e.toString().substring(1)
    )[0];
    t.scrollIntoView(),
      t.classList.remove("focused"),
      t.classList.add("focused"),
      delay(750).then(() => t.classList.remove("focused"));
  }
}
document.getElementById("rnd").addEventListener("click", function () {
  document.getElementById("askrandom").style.display = "block";
});
const body = document.body;
let scrollPosition = 0;
var check = document.getElementById("check"),
  check2 = document.getElementById("check2");
function oncheck() {
  check.checked ? enable() : disable();
}
function ontoggleedit() {
  check2.checked
    ? ((allowdraw = !0), canvas.classList.add("notouchaction"))
    : ((allowdraw = !1), canvas.classList.remove("notouchaction"));
}
function enable() {
  (allowscroll = !1),
    (scrollPosition = window.pageYOffset),
    (body.style.overflow = "hidden"),
    (body.style.position = "fixed"),
    (body.style.top = "-" + scrollPosition - 8 + "px"),
    (body.style.left = "-6pt"),
    (body.style.width = "100%");
}
function disable() {
  (allowscroll = !0),
    body.style.removeProperty("overflow"),
    body.style.removeProperty("position"),
    body.style.removeProperty("top"),
    body.style.removeProperty("left"),
    body.style.removeProperty("width"),
    scrollpos(scrollPosition);
}
var m_lastGenerateDataLength = 0;
function generate(e = !1) {
  var t = canvas.children,
    l = [],
    n = [],
    o = "";
  for (let r = 0; r < t.length; r++) l.push(t[r].classList[0]);
  function i(e) {
    var t = e.replace(/\D/g, "");
    return t.length < 1 && (t = "0"), t;
  }
  for (let s = 0; s < l.length; s += 5) {
    var c = i(l[s]),
      d = i(l[s + 1]),
      u = i(l[s + 2]),
      _ = i(l[s + 3]),
      v = i(l[s + 4]);
    n.push(c + "," + d + "," + u + "," + _ + "," + v + ",\n");
  }
  o = (o = n.join("").toString().replaceAll("NaN", "0")).substring(
    0,
    o.length - 2
  );
  var p = levelnamein.value,
    $ =
      "[header]\nwidth=5\nheight=" +
      n.length.toString() +
      "\ntilewidth=64\ntileheight=64\norientation=orthogonal\n\n[tilesets]\ntileset=../tileset/tileset01.png,64,64,0,0\n\n[layer]\ntype=" +
      (null == p || void 0 == p ? "Level" : p) +
      "\ndata=\n" +
      o +
      "\n\n";
  return ((m_lastGenerateDataLength = n.length), e) ? (e ? o : void 0) : $;
}
window.addEventListener("beforeunload", function (e) {
  e.preventDefault(),
    canvas.children.length > 5 &&
      setlevelcollection("lastleveldata", generate(!0)),
    LCM.SaveInBrowser(),
    (e.returnValue = "");
});
var uploadfile = document.getElementById("upload"),
  uploadtxt = "",
  uploadtxtarr = [],
  htmtxt = [],
  leveldetectlength = 0;
function changefile() {
  var e = new FileReader();
  (e.onload = function () {
    uploadtxt = e.result;
    try {
      LevelEncryptor.decrypt(uploadtxt, 1) &&
        (uploadtxt = LevelEncryptor.decrypt(uploadtxt));
    } catch {}
    uploadtxtarr = splitNewline(uploadtxt);
  }),
    e.readAsText(uploadfile.files[0]);
}
function upload() {
  var e = uploadtxtarr.indexOf("data="),
    t = [];
  for (let l = e + 1; l < uploadtxtarr.length; l++)
    t.push(
      (horiz = uploadtxtarr[l]
        .replace("\r", "")
        .replace("\n", "")
        .split(",")
        .filter((e) => e))
    );
  uploadtxt.startsWith("[header]")
    ? load(t.filter((e) => e).join(",\n"))
    : uploadtxt.startsWith("<?")
    ? loadTiled(uploadtxt)
    : alert(Lang.resolve(""));
}
function load(e, t = !1) {
  if (t || askToLoadOverwrite())
    try {
      (htmtxt = []), (canvas.innerHTML = ""), (leveldetectlength = 0);
      var l = splitNewline(e);
      for (let n = 0; n < l.length; n++) {
        var o = l[n].replace("\r", "").replace("\n", "").split(",");
        function r(e) {
          return e.replace(/<|>/g, "");
        }
        if ((o = o.filter((e) => e)).length >= 5) {
          function i(e) {
            return `<c-tile class="${e}"></c-tile>`;
          }
          htmtxt.push(
            i(r(o[0])) + i(r(o[1])) + i(r(o[2])) + i(r(o[3])) + i(r(o[4]))
          ),
            leveldetectlength++;
        }
      }
      loadnumber(leveldetectlength),
        (canvas.innerHTML = htmtxt.join("")),
        scrollpos(document.body.scrollHeight),
        (document.getElementById("startmenu").style.display = "none"),
        (document.getElementById("level").style.visibility = "visible");
    } catch {
      console.error("Load Level Failed."),
        window.alert(Lang.resolve("webeditor.alerts.loadinvalidlevel"));
    }
}
function exportlevel() {
  try {
    console.log('Exporting level with name "' + levelnamein.value + "..."),
      setlevelcollection("lastleveldata", exportmenu_leveldefault_noheader),
      LCM.SaveInBrowser(),
      download(levelnamein.value + ".txt", generate());
  } catch {
    console.error('Exporting level "' + levelnamein.value + '" failed.');
  }
}
function exportlevelencrypted() {
  try {
    console.log(
      'Exporting encrypted level with name "' + levelnamein.value + "..."
    ),
      setlevelcollection("lastleveldata", exportmenu_leveldefault),
      LCM.SaveInBrowser(),
      download(
        levelnamein.value + "-Encrypted.txt",
        LevelEncryptor.encrypt(generate())
      );
  } catch {
    console.error(
      'Exporting encrypted level "' + levelnamein.value + '" failed.'
    );
  }
}
function loadTiled(e) {
  console.log("Loading Tiled TMX level...");
  try {
    (xmlDoc = new DOMParser().parseFromString(e, "text/xml")),
      load(
        xmlDoc.children[0].children[1].children[0].innerHTML.replace(
          /\r\n|\n\r|\n|\r/,
          ""
        )
      );
  } catch {
    console.error("Invalid Tiled TMX!");
  }
}
function saveTiled() {
  console.log("Exporting Tiled TMX...");
  try {
    var e = generate(!0),
      t =
        '<?xml version="1.0" encoding="UTF-8"?>\n<map version="0" tiledversion="0" orientation="orthogonal" renderorder="right-down" width="5" height="' +
        m_lastGenerateDataLength +
        '" tilewidth="64" tileheight="64" infinite="0" nextlayerid="2" nextobjectid="1">\n <tileset firstgid="1" source="RollingSky.tsx"/>\n <layer id="1" name="' +
        levelnamein.value +
        '" width="5" height="' +
        m_lastGenerateDataLength +
        '">\n  <data encoding="csv">\n' +
        e +
        "\n</data>\n </layer>\n</map>\n";
    download(levelnamein.value + ".tmx", t);
  } catch {
    console.error("Export Tiled TMX Failed!");
  }
}
LevelEncryptor.setup();
var loadedlength = 0;
function loadnumber(e) {
  console.log("Setting Internal Level Length: " + e + "."),
    document.querySelector(":root").style.setProperty("--rows-number-start", e),
    (loadedlength = e);
}
var startmenuhtm = document.getElementById("startmenu").innerHTML,
  prevlevel = "";
function back() {
  confirm(Lang.resolve("webeditor.prompts.backtohome")) &&
    ((prevlevel = canvas.innerHTML),
    setlevelcollection("lastleveldata", generate(!0)),
    LCM.SaveInBrowser(),
    (canvas.innerHTML = ""),
    scrollpos(0),
    (document.getElementById("startmenu").style.display = "block"),
    (document.getElementById("level").style.visibility = "hidden"));
}
function loadprevlevel() {
  loadlevelcollection("lastleveldata", !1, !1, !0)
    ? (scrollpos(document.body.scrollHeight),
      (document.getElementById("startmenu").style.display = "none"),
      (document.getElementById("level").style.visibility = "visible"))
    : alert(Lang.resolve("webeditor.alerts.previouslevelnone"));
}
const LCM = {
  Data: {
    time: 0,
    collections: [
      {
        time: 0,
        id: "d030b349-60b2-469e-9731-e85725e7e5f6",
        name: "Initial Collection",
        levels: [],
      },
    ],
  },
  t: {
    bc: (e = 0, t = 0) =>
      "<c-buttoncontainer>" +
      [
        "",
        '<button onclick="LCM.Dir.AddCurrentLevelToList(this);">' +
          Lang.resolve("webeditor.collectionmanager.gui.addlevel") +
          "</button>",
        '<button onclick="LCM.Dir.ReplaceLevelWithCurrent(this);">' +
          Lang.resolve("webeditor.collectionmanager.gui.replacelevel") +
          '</button><button onclick="LCM.Dir.LoadSelectedLevel(this);">' +
          Lang.resolve("webeditor.collectionmanager.gui.loadlevel") +
          "</button>",
      ][t] +
      '<button onclick="LCM.Dir.Remove(this, ' +
      e +
      ');">' +
      Lang.resolve("webeditor.collectionmanager.gui.removelevel") +
      "</button></c-buttoncontainer>",
  },
  CurrentLoadedLevelUUID: "",
  CollectionTemplate: {
    time: 0,
    id: "",
    name: "Initial Collection",
    levels: [],
  },
  NewCollectionTemplate: () => ({
    time: 0,
    id: "",
    name: "Initial Collection",
    levels: [],
  }),
  LevelTemplate: {
    time: 0,
    id: "",
    type: "level",
    name: "Invisible",
    data: "0,0,0,0,0",
  },
  NewLevelTemplate: () => ({
    time: 0,
    id: "",
    type: "level",
    name: "Invisible",
    data: "0,0,0,0,0",
  }),
  EndTemplate: {
    time: 0,
    id: "",
    type: "end",
    name: "Invisible/End",
    data: "0,0,0,0,0",
  },
  Initialize() {
    var e = getlevelcollection("DO-NOT-DELETE-webEditorCollectionData");
    if (!1 != e) {
      var t = JSON.parse(LZString.decompress(e));
      null != t && (LCM.Data = t);
    }
  },
  AddCollection(e) {
    if (null != e)
      try {
        var t = LCM.NewCollectionTemplate();
        return (
          (t.time = Date.now()),
          (t.id = LCM.uuid()),
          (t.name = e),
          LCM.Data.collections.push(t),
          LCM.Update(),
          t.id
        );
      } catch {
        return null;
      }
  },
  GetCollection(e, t = 0) {
    var l = 0,
      n = LCM.Data.collections.filter(function (t, n, o) {
        if (t.id == e) return (l = n), t;
      })[0];
    return 0 == t ? n : l;
  },
  RemoveCollection(e) {
    try {
      var t = LCM.Data.collections.filter(function (t, l, n) {
        return t.id != e;
      });
      return (LCM.Data.collections = t), LCM.Update(), !0;
    } catch {
      return !1;
    }
  },
  AddLevel(e, t = levelnamein.value, l = null) {
    if (null != e && null != t) {
      null == l && (l = generate(!0));
      try {
        var n,
          o = LCM.NewLevelTemplate();
        return (
          (o.time = Date.now()),
          (o.id = LCM.uuid()),
          (o.name = t),
          (o.data = l),
          LCM.Data.collections.filter(function (t, l, o) {
            t.id == e && (n = l);
          }),
          LCM.Data.collections[n].levels.push(o),
          LCM.Update(),
          o.id
        );
      } catch {
        return null;
      }
    }
  },
  GetLevel(e, t, l = 0) {
    var n = 0,
      o = LCM.GetCollection(e).levels.filter(function (e, l, o) {
        if (e.id == t) return (n = l), e;
      })[0];
    return 0 == l ? o : n;
  },
  RemoveLevel(e, t) {
    try {
      LCM.Data.collections.filter(function (t, n, o) {
        t.id == e && (l = n);
      });
      var l,
        n = LCM.Data.collections[l].levels.filter(function (e, l, n) {
          return e.id != t;
        });
      return (LCM.Data.collections[l].levels = n), LCM.Update(), !0;
    } catch {
      return null;
    }
  },
  BuildHTML() {
    var e = document.querySelector("#collectionContent"),
      t = [];
    LCM.Data.collections.forEach((e, l, n) => {
      var o = [];
      e.levels.forEach((e, t, l) => {
        o.push(
          '<div class="c-level" data-uuid="' +
            e.id +
            '"><input value="' +
            e.name +
            '" oninput="LCM.Dir.UpdateInput(this)" onchange="LCM.Dir.AfterSetInput()"/>' +
            LCM.t.bc(2, 2) +
            "</div>"
        );
      }),
        t.push(
          '<c-details class="c-collection" data-uuid="' +
            e.id +
            '" open><summary><input value="' +
            e.name +
            '" oninput="LCM.Dir.UpdateInput(this)" onchange="LCM.Dir.AfterSetInput()"/>' +
            LCM.t.bc(1, 1) +
            "</summary>" +
            o.join("") +
            "</c-details>"
        );
    }),
      (e.innerHTML = t.join(""));
  },
  GetElementInDom(e, t) {
    var l = document.querySelector("#collectionContent"),
      n = '[data-uuid="' + t + '"]';
    switch (e) {
      case "collection":
        return l.querySelectorAll("details.c-collection" + n);
      case "level":
      case "end":
        return l.querySelectorAll("div.c-level" + n);
      case "all":
        return l.querySelectorAll(n);
    }
  },
  ParseHTML() {},
  ShowMenu() {
    LCM.Update(), (document.querySelector("#clmc").style.display = "block");
  },
  HideMenu() {
    (document.querySelector("#clmc").style.display = "none"),
      LCM.SaveInBrowser();
  },
  uuid() {
    var e = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (e) =>
      (
        e ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (e / 4)))
      ).toString(16)
    );
    return console.log("request uuid", e), e;
  },
  LoadFrom: (e, t) => [],
  SetTo: () => [],
  Update() {
    LCM.BuildHTML();
  },
  Dir: {
    Up(e) {},
    Down(e) {},
    Remove(e, t = 0) {
      switch (t) {
        case 0:
          return;
        case 1:
          var l = e.parentElement.parentElement.parentElement,
            n = l.dataset.uuid,
            o = prompt(
              "To delete this collection, you must enter the collection's name. (Case Sensitive!)"
            );
          o == LCM.GetCollection(n).name
            ? LCM.RemoveCollection(n)
            : void 0 != o && alert("The inputted value is incorrect.");
          break;
        case 2:
          var r = e.parentElement.parentElement,
            i = r.dataset.uuid,
            l = r.parentElement,
            n = l.dataset.uuid,
            o = prompt(
              "To delete this level, you must enter the level's name. (Case Sensitive!)"
            );
          o == LCM.GetLevel(n, i).name
            ? LCM.RemoveLevel(n, i)
            : void 0 != o && alert("The inputted value is incorrect.");
      }
    },
    AddCurrentLevelToList(e) {
      var t = e.parentElement.parentElement.parentElement.dataset.uuid,
        l = prompt(
          "You may need to scroll down.\n\nPlease input the name for your new level. The level you are editing right now will be copied into it. Please be sure to replace the level frequently (more info at the end of the popup).\n\nYou will be prompted to enter this name again if you wish to delete the level.\n\nLeave the box blank for the default name.\n\nTo replace this level with the one you are editing right now, press the circular arrow button. You will again be prompted."
        );
      LCM.AddLevel(t, "" == l ? levelnamein.value : l);
    },
    ReplaceLevelWithCurrent(e) {
      var t = e.parentElement.parentElement,
        l = t.dataset.uuid,
        n = t.parentElement.dataset.uuid,
        o = prompt(
          "Are you sure you want to replace this level with the level you are editing right now? The previous level will no longer be recoverable and replaced with your level which is currently on the canvas. Please remove the Y in the input to confirm.",
          "Y"
        );
      if ("" == o) {
        var r = LCM.GetLevel(n, l).data.toString() + "";
        try {
          (LCM.GetLevel(n, l).data = generate(!0)),
            alert("Data successfully replaced.");
        } catch {
          (LCM.GetLevel(n, l).data = r),
            alert("Failed to replace data, changes have been reverted.");
        }
      } else void 0 != o && alert("The inputted value is incorrect.");
    },
    LoadSelectedLevel(e) {
      var t = e.parentElement.parentElement,
        l = t.dataset.uuid,
        n = t.parentElement.dataset.uuid,
        o = prompt(
          "Are you sure you want to load this level? It will replace the level you have on the canvas. Please remove the hypen from the end of the input to confirm.",
          "Y-"
        );
      if ("Y" == o) {
        var r = generate(!0);
        try {
          load(LCM.GetLevel(n, l).data), alert("Level successfully loaded.");
        } catch {
          load(r),
            alert(
              "Failed to load level. If you ask me for help, make sure to tell me what happened and include your data backup file."
            );
        }
      } else void 0 != o && alert("The inputted value is incorrect.");
    },
    UpdateInput(e) {
      var t = e.value,
        l = e.parentElement,
        n = e.parentElement.parentElement,
        o = l.dataset.uuid,
        r = n.dataset.uuid;
      if ("SUMMARY" == l.tagName) {
        LCM.Data.collections[LCM.GetCollection(r, 1)].name = t;
        return;
      }
      LCM.Data.collections[LCM.GetCollection(n.dataset.uuid, 1)].levels[
        LCM.GetLevel(n.dataset.uuid, o, 1)
      ].name = t;
    },
    AfterSetInput() {
      LCM.Update();
    },
  },
  GetCompressedData: () => LZString.compress(JSON.stringify(LCM.Data)),
  DownloadDataBackup() {
    download_outerlatin1(
      "WebEditorLevelCollectionBackup.WebLCB",
      LevelEncryptor.encrypt(JSON.stringify(LCM.Data))
    );
  },
  SaveInBrowser() {
    setlevelcollection(
      "DO-NOT-DELETE-webEditorCollectionData",
      LCM.GetCompressedData()
    );
  },
  ManualSave() {
    alert(
      "Data is now saved!\n\nNote that the data will automatically save:\n - When you exit the Collection Manager UI\n - Before you close the page\n - When you press back\n - When you use the Save In Session\n - When you enter the Export Menu"
    ),
      LCM.SaveInBrowser();
  },
  ShowBackupLoadPopup() {
    PopupManager.showMessage(
      "Load this backup file? You will not be able to undo this action.",
      "Confirm",
      [
        "Cancel>LCM.BackupLoadPopupClose()~blue",
        "Load>LCM.BackupLoadPopupLoad()~red",
      ],
      !1
    );
  },
  BackupLoadPopupClose() {
    PopupManager.hideMessage();
  },
  BackupLoadPopupLoad() {},
  LoadBackup() {
    PopupManager.showMessage("Please wait.", "", [], !1),
      lcmGetResultIsValid(document.getElementById("collectionBackupLoad"));
  },

};
function lcmGetResultIsValid(e) {
  var t = new FileReader();
  t.onload = function () {
    var l = !1,
      n = t.result;
    try {
      LevelEncryptor.decrypt(n, 1) && (n = LevelEncryptor.decrypt(n));
    } catch {
      l = !1;
    }
    var o = { unchanged: !0 };
    try {
      (o = JSON.parse(n)), (l = !0);
    } catch {
      l = !1;
    }
    if ((0 == e.files.length && (l = !1), !1 == l)) {
      PopupManager.showMessage(
        "Invalid backup file. Please contact sqdldev for help.",
        "Invalid Backup"
      );
      return;
    }
    (LCM.Data = o),
      LCM.Update(),
      PopupManager.showMessage("Backup file loaded.", "Backup Loaded");
  };
  try {
    t.readAsText(e.files[0]);
  } catch {
    PopupManager.hideMessage();
  }
}
function download_outerlatin1(e, t, l = "text/plain;charset=utf-8") {
  let n = document.createElement("a"),
    o = new Blob([t], { type: l });
  (n.href = URL.createObjectURL(o)), (n.download = e), n.click();
}
LCM.Initialize();
var tilePalletSizeSlider = document.getElementById("tilePalletSize"),
  root = document.querySelector(":root");
function changeTilePalletSize() {
  try {
    localStorage.setItem("webEditorTilePalletSize", tilePalletSizeSlider.value),
      root.style.setProperty("--tilePalletSize", tilePalletSizeSlider.value);
  } catch {}
}
try {
  tilePalletSizeSlider.value = localStorage.getItem("webEditorTilePalletSize");
} catch {}
function setlevelcollection(e, t) {
  console.log("Saving Level: " + e),
    localStorage.setItem(e, LZString.compress(t));
}
function isLocalStorageAvailable() {
  var e = "testitem";
  try {
    return localStorage.setItem(e, e), localStorage.removeItem(e), !0;
  } catch (t) {
    return !1;
  }
}
function getlevelcollection(e) {
  var t = localStorage.getItem(e);
  if (null == t || void 0 == t) return !1;
  var l = LZString.decompress(t);
  return null != l && "Error" != l ? l : t;
}
function loadlevelcollection(e, t = !1, l = !1, n = !1) {
  if ((console.log("Loading Level: " + e), !isLocalStorageAvailable()))
    return !1;
  try {
    var o = getlevelcollection(e).replaceAll("'", "");
    if (
      l
        ? o
            .replaceAll(",", "")
            .replaceAll("0", "")
            .replaceAll("\r", "")
            .replaceAll("\n", "").length > 0
        : o.length > 5
    )
      return t || load(o, n), !0;
  } catch {}
  return !1;
}
changeTilePalletSize(),
  isLocalStorageAvailable() ||
    (document.getElementById("sessionlevelload").innerHTML = Lang.resolve(
      "webeditor.alerts.localstorageunusable"
    ));
var themecss = document.getElementById("theme");
function setcookie(e = 0, t = "") {
  var l = ["", "", "", "", ""];
  (l[e] = t), (document.cookie = "mode=" + l[0]);
}
function getcookie(e) {
  for (
    var t = e + "=", l = document.cookie.split(";"), n = 0;
    n < l.length;
    n++
  ) {
    for (var o = l[n]; " " == o.charAt(0); ) o = o.substring(1, o.length);
    if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
  }
  return null;
}
var exportmenu = document.getElementById("exportmenu"),
  selmenu = document.getElementById("selmenu"),
  checkcontainer = document.getElementsByClassName("checkcontainer")[0],
  levelnamein = document.getElementById("levelname");
let exportscrollpos = 0;
function openexport() {
  (exportscrollpos = window.pageYOffset),
    (canvas.style.display = "none"),
    (exportmenu.style.display = "block"),
    (selmenu.style.display = "none"),
    (checkcontainer.style.display = "none"),
    scrollpos(0),
    openexport_sf_1(),
    setlevelcollection("lastleveldata", exportmenu_leveldefault_noheader),
    LCM.SaveInBrowser();
}
function openexport_sf_1() {
  (exportmenu_leveldefault = generate()),
    (exportmenu_leveldefault_noheader = generate(!0)),
    (exportmenu_levelenc = LevelEncryptor.encrypt(generate())),
    (document.getElementById("backuptxtdownload").value =
      exportmenu_leveldefault),
    (document.getElementById("backupencryptdownload").value =
      exportmenu_levelenc);
}
function closeexport() {
  (canvas.style.display = "flex"),
    (exportmenu.style.display = "none"),
    (selmenu.style.display = "flex"),
    (checkcontainer.style.display = "block"),
    scrollpos(exportscrollpos);
}
function download(e, t) {
  console.log("Downloading File: " + e);
  try {
    var l = document.createElement("a");
    l.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(t)
    ),
      l.setAttribute("download", e),
      (l.style.display = "none"),
      document.body.appendChild(l),
      l.click(),
      document.body.removeChild(l);
  } catch {
    console.error("Download Failed! (" + e + ")");
  }
}
(exportmenu_leveldefault = ""),
  (exportmenu_leveldefault_noheader = ""),
  (exportmenu_levelenc = ""),
  levelnamein.addEventListener("change", openexport_sf_1);
const levels = [""].concat(Object.keys(levelsdata.namesandfiles)),
  levelsLower = levels.map((e) => e.toLowerCase());
function getlevel(e, t = !1) {
  var l;
  function n(e) {
    if (void 0 != (l = e)) {
      async function n(e) {
        load(
          (await (await fetch(e)).text()).split(/data=\n|data=\r|data=\r\n/)[1]
        );
      }
      n("levels/" + l);
    } else
      t && alert(Lang.resolve("webeditor.alerts.invalidname")),
        console.warn("Invalid level name. Please check your spelling.");
  }
  "string" == typeof e
    ? n(
        levelsdata.namesandfiles[
          Object.keys(levelsdata.namesandfiles).find(
            (t) => t.toLowerCase() === e.toLowerCase()
          )
        ]
      )
    : "number" == typeof e && n("Level" + e.toString() + ".txt");
}
var loadexistinginput = document.getElementById("loadexisting");
if (params.get("load")) {
  var e,
    t = params.get("load").split(".");
  if ("rollingsky" == t[0]) getlevel(t[1].replaceAll("_", " "));
  else if ("fanmade" == t[0])
    var l = t[1],
      n = t[2];
  else alert(Lang.resolve("webeditor.alerts.invalidname"));
}
function getexistlevel() {
  getlevel(loadexistinginput.value);
}
function autocomplete(e, t) {
  var l;
  function n(e) {
    if (!e) return !1;
    (function e(t) {
      for (var l = 0; l < t.length; l++)
        t[l].classList.remove("autocomplete-active");
    })(e),
      l >= e.length && (l = 0),
      l < 0 && (l = e.length - 1),
      e[l].classList.add("autocomplete-active");
  }
  function o(t) {
    for (
      var l = document.getElementsByClassName("autocomplete-items"), n = 0;
      n < l.length;
      n++
    )
      t != l[n] && t != e && l[n].parentNode.removeChild(l[n]);
  }
  e.addEventListener("input", function (n) {
    var r,
      i,
      s,
      c = this.value;
    if ((o(), !c)) return !1;
    for (
      l = -1,
        (r = document.createElement("DIV")).setAttribute(
          "id",
          this.id + "autocomplete-list"
        ),
        r.setAttribute("class", "autocomplete-items"),
        this.parentNode.appendChild(r),
        s = 0;
      s < t.length;
      s++
    )
      t[s].toLowerCase().includes(c.toLowerCase()) &&
        (((i = document.createElement("DIV")).innerHTML = t[s]),
        (i.innerHTML += "<input type='hidden' value='" + t[s] + "'>"),
        i.addEventListener("click", function (t) {
          (e.value = this.getElementsByTagName("input")[0].value), o();
        }),
        r.appendChild(i));
  }),
    e.addEventListener("keydown", function (e) {
      var t = document.getElementById(this.id + "autocomplete-list");
      t && (t = t.getElementsByTagName("div")),
        40 == e.keyCode
          ? (l++, n(t))
          : 38 == e.keyCode
          ? (l--, n(t))
          : 13 == e.keyCode &&
            (e.preventDefault(), l > -1 && t && t[l].click());
    }),
    document.addEventListener("click", function (e) {
      o(e.target);
    });
}
function checkInput(e) {
  var t = /[^0-9\n\r]/gi;
  t.test(e.value) && (e.value = e.value.replace(t, ""));
}
autocomplete(loadexistinginput, levels);
var tprev = document.getElementById("tprev"),
  brushrandom = document.getElementById("brushRandom"),
  inputrandomin = document.getElementById("askrandomin");
tprev.onclick = function () {
  getTileToBrush();
};
var isShownTranslationWarning = !1,
  isShownStencilsWarning = !1;
function isNumberBetween(e, t, l) {
  return e >= t && e <= l;
}
setInterval(function () {
  if (
    (checkInput(inputrandomin),
    (isUsingRandomizer = brushrandom.checked),
    !isShownTranslationWarning &&
      (document.documentElement.classList.contains("translated-ltr") ||
        document.documentElement.classList.contains("translated-rtl")) &&
      ((isShownTranslationWarning = !0),
      alert(Lang.resolve("webeditor.alerts.translationwarning"))),
    !isShownStencilsWarning)
  ) {
    var e = tileselectval;
    (isNumberBetween(e, 250, 253) ||
      isNumberBetween(e, 461, 468) ||
      isNumberBetween(e, 828, 835) ||
      isNumberBetween(e, 791, 795)) &&
      (showStencilWarning(), (isShownStencilsWarning = !0));
  }
  allowdraw ? (tprev.style.opacity = "1") : (tprev.style.opacity = "0.5"),
    iscolorpicking
      ? (tprev.className = "colorpicker")
      : isGeoStartBrush
      ? (tprev.className = "startGeo")
      : isGeoEndBrush
      ? (tprev.className = "endGeo")
      : 0 == tileselectval
      ? (tprev.className = "erase")
      : (tprev.className = tileselectval);
});
var isAlwaysHideStencilWarning =
  "1" == localStorage.getItem("isAlwaysHideStencilWarning");
function showStencilWarning() {
  isAlwaysHideStencilWarning ||
    PopupManager.showMessage(
      '<img src="stencils/stencil-tutorial.gif">',
      Lang.resolve("webeditor.stencilWarn.title"),
      [
        Lang.resolve("webeditor.stencilWarn.hide") + ">hideStencilWarning()",
        Lang.resolve("webeditor.stencilWarn.hideForever") +
          ">foreverHideStencilWarning()~red",
      ],
      !1
    );
}
function hideStencilWarning() {
  PopupManager.hideMessage();
}
function foreverHideStencilWarning() {
  PopupManager.hideMessage(),
    localStorage.setItem("isAlwaysHideStencilWarning", "1");
}
function togglePortalOpacity() {
  document.body.classList.toggle("portalHalfOpacity");
}
function getTileToBrush() {
  var e = prompt(Lang.resolve("webeditor.prompts.tiletobrush"), "0"),
    t = parseInt(e);
  console.log(t),
    void 0 == t ||
      null == t ||
      isNaN(t) ||
      (t && t <= maxtile && t >= 0
        ? (tileselectval = t)
        : alert(Lang.resolve("webeditor.prompts.tiletobrusherror")));
}
const editor = {
  help() {
    console.log(
      "Commands:\n\neditor.setCustomTiles(tilesIntArray)\neditor.setCurrentTileDialog()\neditor.blacklistTiles(tilearray)\neditor.loadExistingLevel(levelname)"
    );
  },
  setCustomTiles(e) {
    try {
      for (var t = [], l = [], n = 0; n < e.length; n++) {
        t.push("<c-sel class=" + e[n].split(":")[0] + "></c-sel>");
        var o =
          ".\\3" +
          e[n].split(":")[0].substring(0, 1) +
          " " +
          e[n].split(":")[0].substring(1, e[n].split(":")[0].length) +
          " {background: url('" +
          e[n].split(":")[1] +
          "'); opacity: 1;}";
        l.push(o.toString());
      }
      var r = document.getElementById("customPallet");
      (r.innerHTML = t.join("\n")),
        r.innerHTML.length < 2
          ? (r.style.display = "none")
          : (r.style.display = "flex");
    } catch {
      console.log(
        "Usage:\n\neditor.setCustomTiles(<string[] ID:base64_tile_PNG>);\n\nExample:\n\nvar customTile = ['1115:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABiSURBVChTY/wTEfGfAQe49vgxA1jBhyNnoEKoYA/zbwYWKBsMhJMToCwGhrdzF4BpJjAJBJy62gzfTp2G8hCK4Qq4zEzBGB3AFcCMhAEMK2AAXSHjJWvr/9eePIFy0QEDAwATSh9LKkGaRgAAAABJRU5ErkJggg=='];\neditor.setCustomTiles(customTile);"
      );
    }
  },
  setCurrentTileDialog() {
    getTileToBrush();
  },
  blacklistTiles(e) {
    try {
      blacklist = document.getElementById("blacklist");
      for (var t = [], l = 0; l < e.length; l++) {
        var n =
          ".\\3" +
          e[l].toString().substring(0, 1) +
          " " +
          e[l].toString().substring(1, e[l].toString().length) +
          "{opacity: 0.2;}";
        t.push(n.toString());
      }
      blacklist.innerHTML = t.join("\n");
    } catch {
      console.log(
        "Usage:\n\neditor.blacklistTiles(<int[] BlacklistedTiles>);\n\nExample:\n\nvar toBlacklist = [31,482,583,721,802];\neditor.blacklistTiles(toBlacklist);"
      );
    }
  },
  loadExistingLevel(e) {
    try {
      getlevel(e);
    } catch {
      console.log(
        "Usage:\n\neditor.loadExistingLevel(<string LevelName>);\n\nExample:\n\neditor.loadExistingLevel('mAsSiF');\n\n// *Capitalization doesn't matter"
      );
    }
  },
  selcont(e) {
    var t = e.nextElementSibling;
    (console.log(t), "hide" === t.className)
      ? (t.className = "show")
      : (t.className = "hide");
  },
  DisplayOptionsMenu: {
    MainMenu: document.getElementById("displayOptions"),
    Offset: 2,
    showDisplayOptions() {
      editor.DisplayOptionsMenu.MainMenu.style.display = "block";
    },
    updateDisplayOptions() {
      var e = editor.DisplayOptionsMenu.MainMenu.children[0],
        t = document.getElementById("doc");
      function l(e) {
        t.classList.add("displayOptions" + e);
      }
      function n(e) {
        t.classList.remove("displayOptions" + e);
      }
      e.children[editor.DisplayOptionsMenu.Offset + 0].children[0].checked
        ? l("0")
        : n("0"),
        e.children[editor.DisplayOptionsMenu.Offset + 1].children[0].checked
          ? l("1")
          : n("1"),
        e.children[editor.DisplayOptionsMenu.Offset + 2].children[0].checked
          ? l("2")
          : n("2"),
        e.children[editor.DisplayOptionsMenu.Offset + 3].children[0].checked
          ? l("3")
          : n("3"),
        e.children[editor.DisplayOptionsMenu.Offset + 4].children[0].checked
          ? l("4")
          : n("4"),
        e.children[editor.DisplayOptionsMenu.Offset + 5].children[0].checked
          ? l("5")
          : n("5"),
        e.children[editor.DisplayOptionsMenu.Offset + 6].children[0].checked
          ? l("6")
          : n("6"),
        (editor.DisplayOptionsMenu.MainMenu.style.display = "none");
    },
  },
  Zoom: {
    toggleZoom() {
      canvas.classList.toggle("isSmall"), canvasAlt.classList.toggle("isSmall");
    },
  },
  TilePallet: {
    Elements: { content: document.getElementById("selmenuContent") },
    Data: {
      excludedTiles: [],
      tileGroups: [
        {
          name: "Ground Items",
          tiles: [
            1, 269, 433, 586, 2, 315, 671, 3, 4, 5, 6, 7, 8, 434, 620, 624, 28,
            27, 617, 616, 80, 117, 621, 625, 153, 154, 474, 422, 423, 396, 395,
            220, 219, 250, 251, 252, 253, 282, 283, 285, 284, 286, 281, 309,
            310, 323, 324, 397, 417, 418, 419, 420, 421, 505, 504, 877, 878,
            511, 510, 513, 512, 549, 548, 547, 546, 738, 739, 740, 741, 742,
            743, 791, 792, 793, 794, 795, 828, 829, 830, 831, 886, 887, 888,
            889, 890, 891, 893, 892, 895, 894, 897, 896, 939, 940, 1040,
          ],
        },
        {
          name: "Mover Items",
          tiles: [
            61, 62, 64, 63, 65, 66, 68, 67, 69, 70, 72, 71, 74, 73, 76, 75, 207, 208, 209, 210, 435,
            436, 437, 618, 619, 13, 14, 16, 15, 17, 18, 19, 20, 59, 60, 37, 38,
            40, 39,
          ],
        },
        {
          name: "Geobuffers & Stamps",
          tiles: [
            181, 182, 183, 184, 185, 186, 187, 188, 589, 221, 222, 223, 224,
            225, 226, 201, 202, 203, 204, 205, 206,
          ],
        },
        {
          name: "Collectables",
          tiles: [
            81, 84, 614, 86, 473, 82, 85, 83, 88, 87, 261, 615, 262, 438, 439,
            264, 263, 266, 265, 520, 584, 672, 673, 707, 789, 859, 860,
            861, 862, 978, 981, 1090, 749, 761, 767,
          ],
        },
        {
          name: "Boosts & Activators",
          tiles: [
            77, 78, 255, 585, 246, 247, 301, 312, 311, 316, 307, 308, 769, 770,
            331, 328, 333, 345, 352, 363, 353, 354, 355, 364, 367, 368, 369,
            383, 384, 386, 387, 366, 406, 425, 469, 470, 488, 514, 550, 604,
            605, 627, 628, 676, 824, 858, 836, 837, 883, 884, 898, 935,
            934, 942, 995, 996, 997, 1127,
          ],
        },
        {
            name: "Tile Extenders",
            tiles: [
                227, 228, 229, 230, 231, 232, 335, 336, 901,
            ],
          },
        {
          name: "Blocks",
          tiles: [
            141, 142, 143, 148, 145, 146, 147, 144, 441, 442, 445, 446, 149, 80,
            90, 89, 92, 91, 153, 155, 156, 159, 160, 169, 475, 476, 477, 478,
            267, 622, 380, 381, 461, 462, 463, 464, 465, 466, 467, 468, 704,
            705, 819, 820, 821, 825, 826, 827, 834, 832, 835, 833, 879, 880,
            881, 882,
          ],
        },
        {
          name: "Special Effects",
          tiles: [
            197, 259, 349, 413, 414, 521, 999, 674, 675, 941, 783, 1041, 1072, 1328
          ],
        },
        {
          name: "Obstacles",
          tiles: [
            9, 10, 11, 12, 21, 22, 23, 24, 26, 25, 29, 30, 32, 31, 42, 41, 580,
            579, 44, 43, 588, 587, 45, 46, 47, 161, 162, 164, 163, 165, 166,
            168, 167, 440, 595, 149, 33, 34, 36, 35, 49, 50, 102, 101, 104, 103,
            110, 109, 112, 111, 106, 105, 108, 107, 114, 113, 116, 115, 51, 53,
            52, 54, 121, 123, 122, 124, 126, 125, 128, 129, 130, 127, 132, 133,
            134, 131, 152, 150, 151, 93, 94, 95, 96, 97, 98, 99, 100, 55, 57,
            56, 58, 79, 119, 120, 135, 136, 137, 138, 158, 157, 139, 140, 171,
            170, 174, 172, 173, 176, 175, 179, 180, 178, 177, 189, 190, 192,
            191, 195, 196, 193, 194, 198, 199, 200, 118, 211, 233, 216, 258,
            212, 234, 238, 217, 235, 218, 214, 236, 240, 239, 213, 215, 237,
            260, 241, 242, 243, 245, 244, 249, 248, 271, 270, 254, 256, 257,
            280, 268, 272, 273, 274, 276, 275, 277, 287, 288, 298, 278, 279,
            289, 291, 290, 293, 292, 295, 294, 296, 297, 299, 300, 304, 303,
            305, 306, 302, 313, 314, 317, 319, 318, 320, 322, 321, 325, 326,
            327, 329, 330, 332, 337, 341, 338, 342, 339, 344, 340,
            343, 346, 347, 348, 350, 351, 355, 365, 359, 356, 357, 358, 360,
            361, 362, 370, 375, 371, 372, 382, 373, 385, 374, 378, 376, 379,
            377, 388, 389, 390, 391, 392, 393, 394, 398, 399, 400, 401, 402,
            403, 416, 415, 404, 405, 407, 408, 409, 410, 411, 412, 424, 426,
            428, 427, 429, 430, 432, 431, 456, 443, 458, 444, 453, 447, 448,
            449, 450, 451, 452, 454, 455, 457, 459, 460, 472, 471, 479, 480,
            481, 482, 493, 492, 484, 483, 485, 486, 487, 489, 490, 491, 494,
            508, 495, 496, 509, 497, 498, 499, 500, 515, 516, 517, 518, 519,
            501, 503, 502, 506, 507, 522, 543, 544, 542, 541, 523, 524, 525,
            526, 545, 527, 528, 529, 530, 531, 532, 533, 534, 536, 537, 539,
            540, 535, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 582,
            561, 563, 562, 583, 566, 565, 564, 567, 569, 570, 568, 571, 572,
            573, 574, 575, 576, 577, 578, 581, 598, 590, 597, 591, 599, 600,
            592, 593, 596, 594, 601, 602, 603, 606, 607, 608, 609, 610, 611,
            612, 613, 623, 645, 646, 626, 630, 629, 632, 631, 636, 634, 635,
            633, 670, 668, 666, 640, 638, 669, 667, 665, 639, 637, 642, 644,
            641, 643, 648, 647, 652, 650, 651, 649, 656, 654, 655, 653, 662,
            660, 658, 661, 659, 657, 664, 663, 677, 679, 678, 681, 680, 683,
            682, 685, 684, 687, 689, 686, 688, 693, 691, 692, 690, 695, 694,
            697, 699, 696, 698, 701, 703, 700, 702, 706, 718, 719, 716, 720,
            708, 710, 709, 711, 712, 713, 714, 715, 717, 721, 722, 724, 723,
            725, 726, 727, 729, 735, 728, 730, 731, 732, 733, 737, 734, 736,
            744, 745, 746, 747, 748, 750, 751, 752, 753, 754, 755, 756,
            757, 758, 759, 760, 762, 763, 764, 765, 766, 768, 771, 772,
            773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 789, 790, 783,
            784, 785, 786, 787, 788, 796, 797, 798, 799, 800, 801, 802, 803,
            804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816,
            818, 817, 822, 823, 838, 839, 840, 841, 843, 842, 845, 844, 847,
            846, 848, 849, 850, 851, 852, 857, 853, 854, 855, 856, 863, 864,
            865, 866, 868, 867, 869, 870, 872, 871, 873, 874, 885, 876, 875,
            899, 900, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911,
            912, 913, 914, 915, 916, 921, 929, 930, 931, 932, 917, 918, 919,
            920, 923, 922, 924, 925, 926, 927, 928, 933, 937, 938, 936, 943,
            944, 945, 947, 948, 949, 950, 951, 952, 960, 946, 953, 954, 955,
            956, 957, 958, 959, 961, 962, 963, 964, 965, 966, 967, 968, 969,
            970, 971, 972, 973, 974, 975, 976, 977, 979, 980, 982, 983, 984,
            985, 987, 988, 986, 989, 990, 992, 993, 994, 991, 998, 1e3, 1002,
            1001, 1003, 1004, 1005, 1006, 1008, 1011, 1007, 1009, 1010, 1013,
            1012, 1014, 1015, 1017, 1019, 1020, 1016, 1018, 1021, 1022, 1024,
            1023, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1042, 1043,
            1033, 1034, 1035, 1036, 1037, 1038, 1039, 1044, 1045, 1046, 1047,
            1048, 1049, 1063, 1064, 1050, 1051, 1052, 1053, 1054, 1055, 1056,
            1057, 1058, 1059, 1071, 1061, 1060, 1062, 1065, 1068, 1066, 1069,
            1067, 1070, 1074, 1073, 1075, 1091, 1076, 1077, 1078, 1080, 1079,
            1081, 1088, 1089, 1082, 1083, 1084, 1085, 1087, 1086, 1093, 1092,
            1094, 1095, 1096, 1097, 1109, 1110, 1098, 1099, 1100, 1101, 1102,
            1103, 1104, 1105, 1106, 1106, 1108, 1111, 1114, 1115, 1117, 1118,
            1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129,
            1132, 1133, 1134, 1116, 1135, 1136, 1137, 1131, 1130, 1138, 1139,
            1140, 1141, 1142, 1143, 1144, 
          ],
        },
      ],
      favorites: [{ name: "", tiles: [] }],
    },
    Functions: {
      GroupedSegment(e = []) {
        for (var t = e, l = [], n = 0; n < t.length; n++) {
          for (var o = [], r = t[n].tiles, i = 0; i < r.length; i++)
            "NaN" != parseInt(r[i]).toString() &&
              o.push('<c-sel class="' + r[i] + '"></c-sel>');
          l.push(
            '<div class="tileGroup"><div class="tileGroupTitle">' +
              t[n].name +
              '</div><div class="tilesContainer">' +
              o.join("") +
              "</div></div>"
          );
        }
        editor.TilePallet.Elements.content.innerHTML = l.join("");
      },
      ReloadFavorites() {
        (editor.TilePallet.Data.favorites[0].name =
          '<span data-lang="webeditor.tilepallet.favorites.title">' +
          Lang.resolve("webeditor.tilepallet.favorites.title") +
          '</span><button onclick="editor.TilePallet.Favorites.add()" style="margin-left: 10pt;position: relative;" data-lang="webeditor.tilepallet.favorites.edit">' +
          Lang.resolve("webeditor.tilepallet.favorites.edit") +
          "</button>"),
          editor.TilePallet.Functions.GroupedSegment(
            editor.TilePallet.Data.favorites
          );
      },
    },
    set(e) {
      switch (e) {
        case 0:
          for (var t = [], l = 1; l < RollingSky.maxtile + 1; l++)
            this.Data.excludedTiles.includes(l) ||
              t.push('<c-sel class="' + l + '"></c-sel>');
          this.Elements.content.innerHTML = t.join("");
          break;
        case 1:
          this.Functions.GroupedSegment(this.Data.tileGroups);
          break;
        case 2:
          this.Functions.ReloadFavorites();
      }
    },
    Favorites: {
      get() {
        try {
          var e = localStorage.getItem("webeditorTilePalletFavorites");
          if ("[object Array]" === Object.prototype.toString.call(e)) return e;
          return JSON.parse(e);
        } catch {
          return [];
        }
      },
      set(e) {
        try {
          return (
            localStorage.setItem(
              "webeditorTilePalletFavorites",
              JSON.stringify(e)
            ),
            !0
          );
        } catch {
          return !1;
        }
      },
      add() {
        PopupManager.showMessage(
          '<textarea id="editorFavoritesInput"></textarea>',
          Lang.resolve("webeditor.tilepallet.favorites.set.title"),
          [
            Lang.resolve("webeditor.tilepallet.favorites.set.enter") +
              ">editor.TilePallet.Favorites.setFromInput(document.getElementById('editorFavoritesInput').value)",
          ],
          !0
        ),
          (document.getElementById("editorFavoritesInput").value =
            editor.TilePallet.Data.favorites[0].tiles.join(",\n"));
      },
      remove() {},
      setFromInput(e) {
        for (
          var t = e.replaceAll("\r", "").replaceAll("\n", "").split(","),
            l = [],
            n = 0;
          n < t.length;
          n++
        ) {
          var o = parseInt(t[n]);
          "NaN" != o.toString() && l.push(o);
        }
        (editor.TilePallet.Data.favorites[0].tiles = l),
          PopupManager.hideMessage(),
          editor.TilePallet.Functions.GroupedSegment(
            editor.TilePallet.Data.favorites
          ),
          editor.TilePallet.Favorites.set(editor.TilePallet.Data.favorites);
      },
    },
  },
  isDevMode: !1,
  devTab: document.getElementById("devmenu"),
  DevMode() {
    let e = 0,
      t = [];
    document
      .getElementById("mainInnerTitle")
      .addEventListener("click", function () {
        if (
          (e++,
          t.push(
            setTimeout(function () {
              e = 0;
            }, 2e3)
          ),
          e > 5)
        ) {
          (editor.isDevMode = !editor.isDevMode),
            localStorage.setItem("webEditorDevMode", editor.isDevMode),
            PopupManager.showMessage(
              "Devmode " + (editor.isDevMode ? "enabled" : "disabled") + ".",
              "Developer Mode"
            ),
            (e = 0),
            editor.isDevMode
              ? (editor.devTab.style.display = "block")
              : (editor.devTab.style.display = "none");
          for (var l = 0; l < t.length; l++) clearTimeout(t[l]);
        }
      });
  },
  Dev: {
    pathDrawElement: !1,
    togglePathDrawElement() {
      (editor.Dev.pathDrawElement = !editor.Dev.pathDrawElement),
        PopupManager.showMessage(
          "path draw " + (editor.Dev.pathDrawElement ? "enabled" : "disabled"),
          "path draw"
        );
    },
    generatePathElement(e = !1) {
      var t = canvas.children,
        l = [],
        n = [],
        o = "";
      for (let r = 0; r < t.length; r++) l.push(t[r].classList);
      function i(e) {
        var t = e.replace(/\D/g, "");
        return t.length < 1 && (t = "0"), t;
      }
      for (let s = 0; s < l.length; s += 5)
        for (let c = 0; c < 5; c++) {
          if (l[s + c].length > 1 && "pathPart" == l[s + c][1]) {
            n.push(c);
            break;
          }
          4 == c && n.push("");
        }
      return n.reverse().join("\r\n").toString();
    },
    copyPathElement() {
      copyTextToClipboard(editor.Dev.generatePathElement());
    },
    pastePathElement() {
      var e = "";
      navigator.clipboard.readText().then((t) => {
        for (
          var l = (e = t).split("\r\n"), n = canvas.children, o = n.length - 1;
          o > 0;
          o -= 5
        ) {
          var r = parseInt(l[n.length / 5 - (o + 1) / 5]);
          n[o - 4 + r].classList.add("pathPart");
        }
      });
    },
    ballObject: document.getElementById("displayBall"),
    ballVisible(e) {
      e
        ? (editor.Dev.ballObject.classList.add("v"),
          (tprev.style.display = "none"))
        : (editor.Dev.ballObject.classList.remove("v"),
          (tprev.style.display = "block"));
    },
  },
  ShowQuickKey() {
    PopupManager.showMessage('<img src="quickKey.png">', "Quick Key", [
      "Ok>PopupManager.hideMessage()~default",
      "Download>editor.QuickKeyDownload()~default",
    ]);
  },
  QuickKeyDownload() {
    try {
      var e = document.createElement("a");
      (e.download = "Quick Key"),
        (e.target = "_blank"),
        (e.href = "quickKey.png"),
        document.body.appendChild(e),
        e.click(),
        e.remove();
    } catch {
      PopupManager.showMessage(
        "Failed to download Quick Key. Most likely, you have disabled redirects.",
        "Quick Key"
      );
    }
  },


};
var devBallCurrentX = 0,
  devBallCurrentY = 0,
  pos_mouseX = 0,
  pos_mouseY = 0,
  pos_ismousedown = !1;
function updateDevBallView() {
  (devBallCurrentX = pos_mouseX - (pos_mouseX - devBallCurrentX) / 1.25),
    (devBallCurrentY = pos_mouseY - (pos_mouseY - devBallCurrentY) / 1.25),
    (editor.Dev.ballObject.style.left = devBallCurrentX - 32 + "px"),
    (editor.Dev.ballObject.style.top =
      devBallCurrentY - document.documentElement.scrollTop - 32 + "px"),
    requestAnimationFrame(updateDevBallView);
}
updateDevBallView(),
  document.addEventListener("mousemove", (e) => {
    (pos_mouseX = e.pageX), (pos_mouseY = e.pageY);
  }),
  document.addEventListener("onscroll", (e) => {
    (pos_mouseX = e.pageX), (pos_mouseY = e.pageY);
  });
var doc = document.getElementById("doc");
function onChangeLangFunc() {
  editor.TilePallet.Functions.ReloadFavorites();
}
doc.addEventListener("mousedown", (e) => {
  (pos_ismousedown = !0), editor.Dev.ballObject.classList.add("j");
}),
  doc.addEventListener("mouseup", (e) => {
    (pos_ismousedown = !1), editor.Dev.ballObject.classList.remove("j");
  }),
  editor.DevMode(),
  (Lang.events.onchange = function () {
    onChangeLangFunc();
  }),
  editor.TilePallet.set(0);
var palletGet = editor.TilePallet.Favorites.get();
editor.TilePallet.Data.favorites[0].tiles =
  palletGet == [] || void 0 == palletGet || null == palletGet
    ? [
        Lang.resolve("webeditor.tilepallet.favorites.tutorial") +
          "1,27,28,2,6,7,8,3,4,5,21,25,26,9,10,41,42,81,82,83,86,87,88,261,263,264,262,265,266,161,163,164,165,167,168,101,102,103,104,105,106,107,108,201,202,203,204,205,206",
      ][0].split(",")
    : palletGet[0].tiles;
var GeoBuffer = {
  create(e) {
    for (var t = splitNewline(e), l = t, n = 0; n < t.length; n++)
      for (var o = t[n].split(","), r = 0; r < o.length; r++) {
        var i = parseInt(o[r]);
        if (
          181 == i ||
          182 == i ||
          183 == i ||
          184 == i ||
          185 == i ||
          186 == i ||
          187 == i ||
          188 == i
        ) {
          console.log(n + ": " + t[n]), (l[n] = "geoline");
          break;
        }
      }
    for (var s = l.join("").split("geoline"), n = 0; n < s.length; n++) {
      var c = s[n].split(",").join("").split(""),
        d = removeDuplicates(c);
      console.log(c);
      for (var r = 0; r < d.length; r++)
        for (
          var u = obstacledat.obstacles[parseInt(d[r])], _ = 0;
          _ < u.geobuffers.all.length;
          _++
        )
          console.log(u.geobuffers.all[_] + "," + u.geotype + ",");
    }
  },
};
const Obstacle = {
  showCounter() {
    exportscrollpos = window.pageYOffset;
    var e = generate(!0)
      .replaceAll("\n", "")
      .replaceAll("\r", "")
      .replaceAll("\\n", "")
      .replaceAll("\\r", "");
    let t = e.split(",").reduce(function (e, t) {
      return e[t] ? ++e[t] : (e[t] = 1), e;
    }, {});
    for (var l = [], n = 0; n < maxtile; n++)
      t[n] &&
        l.push(
          '<c-tilecont><c-tileprev class="' +
            n +
            '"></c-tileprev>Name: ' +
            obstacledat.obstacles[n].name +
            "<br>GeoBuffers: " +
            obstacledat.obstacles[n].geobuffers.all.join(", ") +
            "<br>Count: " +
            t[n] +
            "</c-tilecont>"
        );
    scrollpos(0),
      (document.getElementById("obstaclecount").innerHTML =
        '<button onclick="Obstacle.hideCounter();" class="exitobjcount">Exit</button><h1 style="margin-top: 5pt;">' +
        Lang.resolve("webeditor.main.objectcount.title") +
        "</h1><p>" +
        Lang.resolve("webeditor.main.objectcount.tutorial") +
        "</p>" +
        l.join("") +
        "<br>"),
      (document.getElementById("level").style.display = "none"),
      (document.getElementById("obstaclecount").style.display = "block");
  },
  hideCounter() {
    (document.getElementById("level").style.display = "block"),
      (document.getElementById("obstaclecount").style.display = "none"),
      scrollpos(exportscrollpos);
  },
  generateGeobuffers(e = "z") {
    var t = generate(!0)
      .replaceAll("\n", "")
      .replaceAll("\r", "")
      .replaceAll("\\n", "")
      .replaceAll("\\r", "");
    let l = t.split(",").reduce(function (e, t) {
      return e[t] ? ++e[t] : (e[t] = 1), e;
    }, {});
    for (var n = [], o = 0; o < maxtile + 1; o++)
      if (l[o]) {
        var r = obstacledat.obstacles[o].geobuffers.all;
        if (obstacledat.obstacles[o].include)
          for (var i = 0; i < r.length; i++)
            n.push(r[i] + "," + obstacledat.obstacles[o].geotype + "," + e);
      }
    return n.filter(function (e, t, l) {
      return l.indexOf(e) == t;
    });
  },
  copyGeobuffers() {
    var e = document.getElementById("gbZv").value;
    copyTextToClipboard(Obstacle.generateGeobuffers(e).join("\n")),
      alert(Lang.resolve("webeditor.alerts.geobuffercopydone", e));
  },
};
function fallbackCopyTextToClipboard(e) {
  var t = document.createElement("textarea");
  (t.value = e),
    (t.style.top = "0"),
    (t.style.left = "0"),
    (t.style.position = "fixed"),
    (t.style.opacity = "0"),
    (t.style.display = "none"),
    document.body.appendChild(t),
    t.focus(),
    t.select();
  try {
    document.execCommand("copy");
  } catch {
    console.error('Unable to copy text: "' + e + '"');
  }
  document.body.removeChild(t);
}
function copyTextToClipboard(e) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(e);
    return;
  }
  navigator.clipboard.writeText(e).then(
    function () {},
    function (e) {}
  );
}
const Level = {
  getEndRow() {
    for (var e = canvas.children, t = e.length / 5, l = 0; l < t - 1; l++)
      for (var n = 0; n < 5; n++)
        if ("0" != e[5 * l + n].className) return t - l;
  },
  getInvertedEndRow: () => loadedlength - 1 - Level.getEndRow(),
  getScrollPercent() {},
  getSpeedAtRow: (e, t, l, n = null) =>
    lerp(e, t, percentage(l / 100, null == n ? loadedlength : n)),
  switchDisplaySide() {
    window.innerWidth > 650
      ? localStorage.setItem(
          "editorSide",
          canvas.parentElement.parentElement.classList.toggle("side")
        )
      : (canvas.parentElement.parentElement.classList.remove("side"),
        alert(Lang.resolve("webeditor.alerts.widescreenlevelwarn")));
  },
};
var isEditorSide = localStorage.getItem("editorSide");
function removeDuplicates(e) {
  return e.filter((t, l) => e.indexOf(t) === l);
}
function percentage(e, t) {
  return (100 * e) / t;
}
function tween(e, t, l) {
  return e + (l / 99) * (t - e);
}
function lerp(e, t, l) {
  return (1 - l) * e + l * t;
}
function savelevelastemp() {
  alert(Lang.resolve("webeditor.alerts.saveinsession")),
    setlevelcollection("lastleveldata", generate(!0)),
    LCM.SaveInBrowser();
}
function splitNewline(e) {
  return e.split(/\r\n|\n\r|\n|\r/);
}
if (
  ((null == isEditorSide || "true" == isEditorSide) &&
    window.innerWidth > window.innerHeight &&
    canvas.parentElement.parentElement.classList.add("side"),
  window.matchMedia("(any-pointer: coarse)").matches)
);
else {
  document.body.classList.add("desktop");
  let o = (e) => {
    (tprev.style.left = e.pageX + "px"),
      (tprev.style.top = e.pageY - document.documentElement.scrollTop + "px");
  };
  document.addEventListener("mousemove", o),
    (tprev.style.position = "fixed"),
    document.body.appendChild(tprev);
}
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return !0;
  }
}
function openRsLevelInterface() {
  RollingSkyInterface.Levels_LevelList.SelectLevel(
    1,
    selectedLevelFromRsLevelInterface
  );
}
function selectedLevelFromRsLevelInterface(e) {
  getlevel(e);
}
document.addEventListener("keydown", (e) => {
  if (editor.isDevMode && "Alt" === e.key) {
    e.preventDefault();
    var t = "developer" == Lang.current ? "en" : Lang.current;
    "developer" == Lang.current
      ? Lang.changeLang(t)
      : Lang.changeLang("developer");
  }
  if (
    "block" != document.getElementById("startmenu").style.display &&
    (e.ctrlKey && "s" === e.key && (e.preventDefault(), openexport()),
    e.ctrlKey && "o" === e.key && (e.preventDefault(), Obstacle.showCounter()),
    e.ctrlKey && "b" === e.key && (e.preventDefault(), togglePortalOpacity()),
    e.ctrlKey && "f" === e.key && (e.preventDefault(), tryScrollToTile()),
    e.ctrlKey && "g" === e.key && (e.preventDefault(), getTileToBrush()),
    "Escape" == e.key)
  ) {
    if ("block" == exportmenu.style.display) return closeexport(), null;
    if ("block" == displayOptions.style.display)
      return editor.DisplayOptionsMenu.updateDisplayOptions(), null;
    if ("block" == document.getElementById("obstaclecount").style.display)
      return Obstacle.hideCounter(), null;
    "none" == document.getElementById("startmenu").style.display && back();
  }
}),
  (window.onmousedown = (e) => {
    (1 == e.button || 4 == e.buttons) &&
      "C-TILE" == e.target.tagName &&
      (e.preventDefault(), (tileselectval = e.target.className));
  }),
  (window.onmouseup = (e) => {
    "C-TILE" == e.target.tagName && e.preventDefault();
  }),
  (window.oncontextmenu = (e) => {
    if ("C-TILE" == e.target.tagName) return !1;
  }),
  inIframe() &&
    (document.head.innerHTML += "<style>#doc *{font-size: 12px;}</style>"),
  (editor.isDevMode = "true" == localStorage.getItem("webEditorDevMode")),
  editor.isDevMode
    ? (editor.devTab.style.display = "block")
    : (editor.devTab.style.display = "none");


