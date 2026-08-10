(function () {
  "use strict";

  function isBlockedShortcut(event) {
    if (!event || !event.ctrlKey) return false;

    var key = String(event.key || "").toLowerCase();
    var code = String(event.code || "");

    var ctrlU = !event.shiftKey && (key === "u" || code === "KeyU");
    var ctrlShiftI = event.shiftKey && (key === "i" || code === "KeyI");
    var ctrlShiftJ = event.shiftKey && (key === "j" || code === "KeyJ");

    return ctrlU || ctrlShiftI || ctrlShiftJ;
  }

  function blockShortcut(event) {
    if (!isBlockedShortcut(event)) return;

    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") {
      event.stopImmediatePropagation();
    }
  }

  window.addEventListener("keydown", blockShortcut, true);
})();
