function formatApplicationAccessMessage(message) {
  const language = localStorage.getItem("language") === "en" ? "en" : "ru";
  return String(message || "")
    .replace(/<t:(\d+):([FR])>/g, (_, seconds, style) => {
      const date = new Date(Number(seconds) * 1000);
      if (style === "R") {
        const difference = date.getTime() - Date.now();
        const units = Math.abs(difference) >= 86_400_000
          ? ["day", 86_400_000]
          : Math.abs(difference) >= 3_600_000
            ? ["hour", 3_600_000]
            : ["minute", 60_000];
        return new Intl.RelativeTimeFormat(language === "ru" ? "ru-RU" : "en", { numeric: "auto" })
          .format(Math.round(difference / units[1]), units[0]);
      }
      return new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-GB", {
        dateStyle: "long",
        timeStyle: "short"
      }).format(date);
    })
    .replaceAll("**", "");
}

window.TrpApplicationAccess = Object.freeze({
  formatMessage: formatApplicationAccessMessage,
  render: renderApplicationAccessNotice
});

function currentApplicationPage() {
  const path = window.location.pathname.toLowerCase();
  return path.includes("/applications/exam/")
    ? { action: "config", scopes: ["private_exam", "training"], statusId: "application-status", lookupId: "lookup-profile" }
    : path.includes("/applications/vacation_&_sick/")
      ? { action: "administrative-config", formType: "vacation", scopes: ["vacation", "early_return"], statusId: "application-status", lookupId: "lookup-profile" }
      : path.includes("/applications/resignation_&_reinstatement/")
        ? { action: "administrative-config", formType: "employment", scopes: ["resignation", "reinstatement"], statusId: "application-status", lookupId: "lookup-profile" }
        : path.includes("/applications/registration_&_replacement/")
          ? { action: "vehicle-assignment-config", scopes: ["vehicle_assignment"], statusId: "vehicle-assignment-status", lookupId: "lookup-vehicle-profile" }
          : path.includes("/applications/trolleybus_repair/")
            ? { action: "repair-config", scopes: ["repair_service"], statusId: "repair-application-status", lookupId: "lookup-repair-profile" }
            : null;
}

function accessNotice(page) {
  if (!page) return null;
  const id = `${page.statusId}-access`;
  const existing = document.getElementById(id);
  if (existing) return existing;
  const transientStatus = document.getElementById(page.statusId);
  if (!transientStatus?.parentNode) return null;
  const notice = document.createElement("div");
  notice.id = id;
  notice.hidden = true;
  notice.className = "application-status error";
  notice.setAttribute("role", "alert");
  transientStatus.parentNode.insertBefore(notice, transientStatus);
  return notice;
}

function renderApplicationAccessNotice(access, options = {}) {
  const page = currentApplicationPage();
  if (!page) return [];
  const language = localStorage.getItem("language") === "en" ? "en" : "ru";
  const unavailable = page.scopes.map((scope) => access?.[scope]).filter((entry) => entry && !entry.allowed);
  const notice = accessNotice(page);
  if (notice) {
    notice.hidden = unavailable.length === 0;
    notice.textContent = unavailable.map((entry) => formatApplicationAccessMessage(entry.message)).join("\n\n");
  }
  if (options.lockLookup && unavailable.length === page.scopes.length) {
    const lookup = document.getElementById(page.lookupId);
    if (lookup) lookup.disabled = true;
  }
  return unavailable;
}

function initApplicationAccessNotice() {
  const page = currentApplicationPage();
  if (!page) return;

  const apiBase = String(
    window.TRP_APPLICATIONS_API_URL || window.TRP_TRAINING_APPLICATIONS_API_URL || ""
  ).trim();
  if (!apiBase || apiBase.startsWith("PASTE_")) return;

  const language = localStorage.getItem("language") === "en" ? "en" : "ru";
  const url = new URL(apiBase);
  url.searchParams.set("action", page.action);
  url.searchParams.set("language", language);
  if (page.formType) url.searchParams.set("formType", page.formType);
  url.searchParams.set("_", Date.now());

  fetch(url.toString(), { cache: "no-store" })
    .then((response) => response.json())
    .then((result) => {
      if (!result?.ok) return;
      renderApplicationAccessNotice(result.config?.applicationAccess || {}, { lockLookup: true });
    })
    .catch(() => null);
}

if (typeof reinitializeEventListeners === "function") {
  const previousReinitializeEventListeners = reinitializeEventListeners;
  reinitializeEventListeners = function reinitializeApplicationAccessPage() {
    previousReinitializeEventListeners();
    queueMicrotask(initApplicationAccessNotice);
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApplicationAccessNotice);
} else {
  initApplicationAccessNotice();
}
