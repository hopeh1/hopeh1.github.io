var cst1 = window.location.search,
  cst2 = new URLSearchParams(cst1),
  cst3 = cst2.get("key");
const cst4 = "BO0DlcDEGaLyAvBil2ONkvLvbbxnvlbOVBNHAe9R",
  discord = "https://discord.gg/HWcxZfes2H";
var newurl = "https://sqdldev.github.io/rolling-sky/";
function LOGIN() {
  function e(e, t) {
    return Math.floor(Math.random() * (t - e)) + e;
  }
  function t(e, t) {
    return (
      (newRand = Math.floor(Math.random() * t)),
      newRand >= e && (newRand += 1),
      newRand
    );
  }
  function l(t, l, d = 0, r = 99) {
    (document.body.style.overflow = "hidden auto"),
      (document.body.scrollTop = 0),
      (document.documentElement.scrollTop = 0),
      window.scrollTo(0, 0),
      (document.body.style.overflow = "hidden"),
      (n.style.display = "flex"),
      (num = d - 1),
      (s.innerHTML = "0%");
    var c = e(27, 31),
      h = e(0, 2);
    if ("0" == t) {
      s.innerHTML = num + "%";
      var g = setInterval(function () {
        140 > num
          ? (num++,
            100 == num && (i.classList = ["a"]),
            101 > num && (s.innerHTML = num + "%"),
            120 == num && (n.style.opacity = 0))
          : (clearInterval(g),
            (document.body.style.overflow = "hidden auto"),
            (n.style.display = "none"));
      }, c + h);
    }
    if ("1" == t)
      var g = setInterval(function () {
        return pressedKeys.Shift
          ? (clearInterval(g), void o(!0))
          : void (num < r
              ? (num++, 23 == num, (s.innerHTML = num + "%"))
              : (clearInterval(g), l && o()));
      }, c);
  }
  function o(e = !1) {
    console.log("Successful Login"),
      sqdldev.runjs("analytics.js"),
      (document.getElementById("doc").style.opacity = 1),
      e ? l("0", !1, 100) : l("0", !1, a + 1);
  }
  if (!window.siteIsUnderMaintenance) {
    var s = document.getElementById("percent"),
      n = document.getElementById("loader"),
      i = document.getElementById("splash");
    i.classList = ["a"];
    null == localStorage.getItem("lastSplash") &&
      localStorage.setItem("lastSplash", "0");
    var d = t(
      localStorage.getItem("lastSplash"),
      ["<b>Title</b><br>Text"].length - 1
    );
    localStorage.setItem("lastSplash", d), (i.classList = ["t"]);
    var a = e(83, 91);
    l("1", !0, 0, a);
  }
}
function WINDOWEXITALERT(e) {
  alert(e), (window.location.href = "https://sqdldev.github.io/rolling-sky/");
}
function delay(e) {
  return new Promise((t) => setTimeout(t, e));
}
function amogus() {
  const e = new Date();
  let t = e.getHours();
  if (3 == t) {
    return "Wait... did I do this at 3 AM? Wait.. hold on... didn't he tell me not to do this?";
  } else return "Hmm... I don't think this does anything...";
}
function openInstructionalManual() {
  var e =
      window.location.href.replace("index.html", "") + "instructional-manual/",
    t = window.open(e, "", "width=760, height=850");
  if (!t || t.closed || "undefined" == typeof t.closed) {
    var l = document.createElement("a");
    (l.href = e), l.click();
  }
}
ConsoleLogger.Activate(
  '<h2 data-lang="global.console">Console</h2><div id="consoletext"></div><hr>',
  "#consoletext{align-content: flex-start;width: 640pt;max-width: 96.5%;height: 265px;border: solid;border-radius: 7pt;border-color: var(--button-brd-col);background-color: var(--inputbg);margin-top: 10px;overflow-y: scroll;overflow-x: hidden;display: flex;flex-direction: row;align-items: flex-start;flex-wrap: wrap;}",
  "startmenu"
);
