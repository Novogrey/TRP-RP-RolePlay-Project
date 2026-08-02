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
  formatMessage: formatApplicationAccessMessage
});

function initApplicationAccessNotice() {
  const path = window.location.pathname.toLowerCase();
  const page = path.includes("/applications/exam/")
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
      const access = result.config?.applicationAccess || {};
      const unavailable = page.scopes.map((scope) => access[scope]).filter((entry) => entry && !entry.allowed);
      if (!unavailable.length) return;
      const status = document.getElementById(page.statusId);
      if (status) {
        status.hidden = false;
        status.className = "application-status error";
        status.textContent = unavailable.map((entry) => {
          const label = entry.label || entry.scope;
          const reason = entry.reason || (language === "ru" ? "Причина не указана." : "No reason was provided.");
          return language === "ru"
            ? `Приём заявлений «${label}» закрыт. Причина: ${reason}`
            : `“${label}” applications are closed. Reason: ${reason}`;
        }).join("\n\n");
      }
      if (unavailable.length === page.scopes.length) {
        const lookup = document.getElementById(page.lookupId);
        if (lookup) lookup.disabled = true;
      }
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
