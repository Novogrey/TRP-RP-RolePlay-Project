const repairApplicationCopy = {
  ru: {
    kicker: "Троллейбусная-ремонтная мастерская TRP RP",
    title: "Ремонт и обслуживание",
    subtitle: "Рассмотрение заявления в течение 3 дней",
    department: "Троллейбусная-ремонтная мастерская",
    accountStep: "Проверка аккаунта",
    accountStepSmall: "Идентификатор, Roblox и закрепления",
    detailsStep: "Параметры заявления",
    detailsStepSmall: "Услуга и закреплённый троллейбус",
    resultStep: "Отправка",
    resultStepSmall: "Ожидание решения ТРМ",
    accountIntro: "Укажите личный идентификатор работника, полученный через бота TRP RP Systems.",
    identifier: "Идентификатор работника",
    check: "Проверить данные",
    identifierGuide: "Введите свой Discord ID на странице получения, подтвердите запрос в личных сообщениях бота и используйте выданный код здесь.",
    getIdentifier: "Получить идентификатор работника",
    detailsIntro: "Выберите услугу и один из закреплённых за вами троллейбусов.",
    chooseService: "Выберите услугу",
    chooseVehicle: "Закреплённый троллейбус",
    chooseRepairType: "Выберите тип ремонта",
    chooseOption: "Выберите вариант",
    repairReason: "Причина ремонта",
    currentLivery: "Нынешний окрас",
    desiredLivery: "Желаемый окрас",
    reviewTitle: "Рассмотрение заявления",
    reviewBody: "Решение Троллейбусной-ремонтной мастерской принимается в течение 3 дней и направляется в Discord.",
    submit: "Отправить заявление",
    discord: "Аккаунт Discord",
    roblox: "Аккаунт Roblox",
    position: "Должность",
    points: "Доступные поинты",
    vehicles: "Закреплённые троллейбусы",
    noVehicles: "Закреплённые троллейбусы не найдены",
    invalidIdentifier: "Введите корректный идентификатор работника.",
    loading: "Проверяем идентификатор, аккаунт и закреплённый транспорт...",
    profileReady: "Данные подтверждены. Заполните заявление.",
    loadFailed: "Не удалось проверить данные.",
    required: "Заполните все обязательные поля.",
    sameLivery: "Нынешний и желаемый окрасы должны отличаться.",
    submitting: "Отправляем заявление в Троллейбусную-ремонтную мастерскую...",
    submitFailed: "Не удалось отправить заявление.",
    submittedTitle: "Заявление принято системой",
    submittedBody: "Заявление отправлено в ТРМ. Решение будет принято в течение 3 дней и направлено в Discord.",
    applicationNumber: "Номер заявления",
    status: "Статус",
    pending: "Ожидает решения ТРМ",
    showIdentifier: "Показать идентификатор",
    hideIdentifier: "Скрыть идентификатор",
    unavailable: "Приём этого вида заявлений временно закрыт."
  },
  en: {
    kicker: "TRP RP Trolleybus Repair Workshop",
    title: "Repair and service",
    subtitle: "Application review within 3 days",
    department: "Trolleybus Repair Workshop",
    accountStep: "Account verification",
    accountStepSmall: "Identifier, Roblox, and assignments",
    detailsStep: "Application details",
    detailsStepSmall: "Service and assigned trolleybus",
    resultStep: "Submission",
    resultStepSmall: "Awaiting the TRW decision",
    accountIntro: "Enter the personal employee identifier issued through the TRP RP Systems bot.",
    identifier: "Employee identifier",
    check: "Check details",
    identifierGuide: "Enter your Discord ID on the identifier page, confirm the request in the bot's direct messages, and use the issued code here.",
    getIdentifier: "Get an employee identifier",
    detailsIntro: "Choose a service and one of the trolleybuses assigned to you.",
    chooseService: "Choose a service",
    chooseVehicle: "Assigned trolleybus",
    chooseRepairType: "Choose a repair type",
    chooseOption: "Choose an option",
    repairReason: "Repair reason",
    currentLivery: "Current livery",
    desiredLivery: "Desired livery",
    reviewTitle: "Application review",
    reviewBody: "The Trolleybus Repair Workshop reviews the application within 3 days and sends its decision in Discord.",
    submit: "Submit application",
    discord: "Discord account",
    roblox: "Roblox account",
    position: "Position",
    points: "Available points",
    vehicles: "Assigned trolleybuses",
    noVehicles: "No assigned trolleybus was found",
    invalidIdentifier: "Enter a valid employee identifier.",
    loading: "Checking the identifier, account, and assigned vehicles...",
    profileReady: "Details confirmed. Complete the application.",
    loadFailed: "The details could not be checked.",
    required: "Complete all required fields.",
    sameLivery: "The current and desired liveries must be different.",
    submitting: "Sending the application to the Trolleybus Repair Workshop...",
    submitFailed: "The application could not be submitted.",
    submittedTitle: "Application received",
    submittedBody: "The application has been sent to the TRW. A decision will be made within 3 days and sent in Discord.",
    applicationNumber: "Application number",
    status: "Status",
    pending: "Awaiting TRW decision",
    showIdentifier: "Show identifier",
    hideIdentifier: "Hide identifier",
    unavailable: "This application form is temporarily closed."
  }
};

function initRepairApplicationForm() {
  const form = document.getElementById("repair-application-form");
  if (!form || form.dataset.initialized === "true") return;
  form.dataset.initialized = "true";

  const state = { config: null, profile: null, service: null, repairType: null };
  const byId = (id) => document.getElementById(id);
  const language = () => localStorage.getItem("language") === "en" ? "en" : "ru";
  const copy = (key) => repairApplicationCopy[language()][key] || key;
  const apiBase = String(
    window.TRP_APPLICATIONS_API_URL || window.TRP_TRAINING_APPLICATIONS_API_URL || ""
  ).trim();

  document.querySelectorAll("[data-repair-copy]").forEach((element) => {
    const value = copy(element.dataset.repairCopy);
    if (value) element.textContent = value;
  });

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function endpoint(parameters) {
    const url = new URL(apiBase);
    Object.entries(parameters).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.toString();
  }

  function localizeDiscordTimestamps(message) {
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
          return new Intl.RelativeTimeFormat(language() === "ru" ? "ru-RU" : "en", { numeric: "auto" })
            .format(Math.round(difference / units[1]), units[0]);
        }
        return new Intl.DateTimeFormat(language() === "ru" ? "ru-RU" : "en-GB", {
          dateStyle: "long",
          timeStyle: "short"
        }).format(date);
      })
      .replaceAll("**", "");
  }

  async function readResponse(response) {
    const result = await response.json().catch(() => null);
    if (!result || result.ok === false) {
      const error = new Error(localizeDiscordTimestamps(result?.error) || copy("submitFailed"));
      error.code = result?.code || "API_ERROR";
      error.expiresAt = result?.expiresAt || null;
      throw error;
    }
    return result;
  }

  function showStatus(message, type = "info") {
    const status = byId("repair-application-status");
    status.hidden = false;
    status.className = `application-status ${type === "info" ? "" : type}`.trim();
    status.textContent = localizeDiscordTimestamps(message);
  }

  function clearStatus() {
    const status = byId("repair-application-status");
    status.hidden = true;
    status.textContent = "";
    status.className = "application-status";
  }

  function updateProgress(step) {
    const order = ["account", "details", "result"];
    const activeIndex = order.indexOf(step);
    document.querySelectorAll("[data-progress-step]").forEach((element) => {
      const index = order.indexOf(element.dataset.progressStep);
      element.classList.toggle("is-active", index === activeIndex);
      element.classList.toggle("is-complete", index < activeIndex);
    });
  }

  function renderProfile() {
    const profile = state.profile;
    const vehicles = profile.currentVehicles?.length
      ? `<ul>${profile.currentVehicles.map((vehicle) => (
        `<li><strong>${escapeHtml(vehicle.id)}</strong> · ${escapeHtml(vehicle.model || "—")} · ${escapeHtml(vehicle.status || "—")}</li>`
      )).join("")}</ul>`
      : `<p>${escapeHtml(copy("noVehicles"))}</p>`;
    const summary = byId("repair-profile-summary");
    summary.innerHTML = `
      <div class="profile-item"><small>${escapeHtml(copy("discord"))}</small><strong>${escapeHtml(profile.displayName || profile.discordUsername)}</strong></div>
      <div class="profile-item"><small>${escapeHtml(copy("roblox"))}</small><strong><a href="${escapeHtml(profile.robloxProfileUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(profile.robloxUsername)}</a></strong></div>
      <div class="profile-item"><small>${escapeHtml(copy("position"))}</small><strong>${escapeHtml(profile.positionLabel || "—")}</strong></div>
      <div class="profile-item"><small>${escapeHtml(copy("points"))}</small><strong>${escapeHtml(profile.points ?? 0)}</strong></div>
      <div class="profile-item current-bindings"><small>${escapeHtml(copy("vehicles"))}</small>${vehicles}</div>`;
    summary.hidden = false;
  }

  function renderServices() {
    const root = byId("repair-service-options");
    root.replaceChildren();
    state.config.services.forEach((service) => {
      const label = document.createElement("label");
      label.className = "segment-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "serviceType";
      input.value = service.id;
      const content = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = service.label;
      const description = document.createElement("small");
      description.textContent = service.description;
      content.append(title, description);
      label.append(input, content);
      input.addEventListener("change", () => selectService(service));
      root.append(label);
    });
  }

  function renderRepairTypes() {
    const root = byId("repair-type-options");
    root.replaceChildren();
    state.config.repairTypes.forEach((repairType) => {
      const label = document.createElement("label");
      label.className = "segment-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "repairType";
      input.value = repairType.id;
      const content = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = repairType.label;
      const description = document.createElement("small");
      description.textContent = repairType.description;
      content.append(title, description);
      label.append(input, content);
      input.addEventListener("change", () => { state.repairType = repairType.id; clearStatus(); });
      root.append(label);
    });
    const reason = byId("repair-reason");
    reason.placeholder = state.config.repairReason.prompt;
    reason.minLength = Number(state.config.repairReason.minLength);
    reason.maxLength = Number(state.config.repairReason.maxLength);
    document.querySelector('[for="repair-reason"] > span').textContent = state.config.repairReason.label;
  }

  function renderVehicles() {
    const select = byId("repair-vehicle-id");
    select.replaceChildren(new Option(copy("chooseOption"), ""));
    state.profile.currentVehicles.forEach((vehicle) => {
      select.add(new Option(`${vehicle.id} · ${vehicle.model || "—"} · ${vehicle.status || "—"}`, vehicle.id));
    });
    select.disabled = false;
  }

  function setConditionalSection(id, enabled) {
    const section = byId(id);
    section.hidden = !enabled;
    section.querySelectorAll("input, textarea, select").forEach((field) => {
      field.disabled = !enabled;
    });
  }

  function selectedVehicle() {
    const id = byId("repair-vehicle-id").value;
    return state.profile?.currentVehicles?.find((vehicle) => String(vehicle.id) === id) || null;
  }

  function renderLiveries() {
    const vehicle = selectedVehicle();
    for (const id of ["current-livery", "desired-livery"]) {
      const select = byId(id);
      select.replaceChildren(new Option(copy("chooseOption"), ""));
      (vehicle?.liveries || []).forEach((livery) => select.add(new Option(livery, livery)));
    }
  }

  function selectService(service) {
    state.service = service.id;
    state.repairType = null;
    setConditionalSection("repair-fields", service.id === "repair");
    setConditionalSection("repainting-fields", service.id === "repainting");
    if (service.id === "repainting") renderLiveries();
    byId("submit-repair-application").disabled = false;
    clearStatus();
  }

  async function loadConfig() {
    if (!apiBase || apiBase.startsWith("PASTE_")) throw new Error(copy("loadFailed"));
    const result = await fetch(endpoint({
      action: "repair-config",
      language: language(),
      _: Date.now()
    }), { cache: "no-store" }).then(readResponse);
    state.config = result.config;
    const access = result.config.applicationAccess?.repair_service;
    if (access && !access.allowed) {
      showStatus(access.message || copy("unavailable"), "error");
      byId("lookup-repair-profile").disabled = true;
      return false;
    }
    return true;
  }

  async function lookupProfile() {
    const workerIdentifier = byId("worker-identifier").value.trim().toUpperCase();
    if (!/^TRP-RP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(workerIdentifier)) {
      showStatus(copy("invalidIdentifier"), "error");
      return;
    }
    const button = byId("lookup-repair-profile");
    button.disabled = true;
    showStatus(copy("loading"));
    try {
      const configAvailable = await loadConfig();
      if (!configAvailable) return;
      const profileResult = await fetch(endpoint({
        action: "repair-profile",
        workerIdentifier,
        language: language(),
        _: Date.now()
      }), { cache: "no-store" }).then(readResponse);
      state.profile = profileResult.profile;
      state.service = null;
      state.repairType = null;
      renderProfile();
      renderServices();
      renderRepairTypes();
      renderVehicles();
      byId("repair-application-details").hidden = false;
      byId("repair-application-result").hidden = true;
      setConditionalSection("repair-fields", false);
      setConditionalSection("repainting-fields", false);
      byId("submit-repair-application").disabled = true;
      showStatus(copy("profileReady"), "success");
      updateProgress("details");
    } catch (error) {
      state.profile = null;
      byId("repair-profile-summary").hidden = true;
      byId("repair-application-details").hidden = true;
      showStatus(error.message || copy("loadFailed"), "error");
      updateProgress("account");
    } finally {
      if (!state.config?.applicationAccess?.repair_service
          || state.config.applicationAccess.repair_service.allowed) {
        button.disabled = false;
      }
    }
  }

  function renderResult(result) {
    const root = byId("repair-application-result-card");
    root.dataset.status = "pending";
    root.innerHTML = `
      <h3>${escapeHtml(copy("submittedTitle"))}</h3>
      <p>${escapeHtml(copy("submittedBody"))}</p>
      <dl>
        <dt>${escapeHtml(copy("applicationNumber"))}</dt><dd>${escapeHtml(result.code)}</dd>
        <dt>${escapeHtml(copy("status"))}</dt><dd>${escapeHtml(copy("pending"))}</dd>
      </dl>`;
    byId("repair-application-result").hidden = false;
    updateProgress("result");
    root.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function submitApplication(event) {
    event.preventDefault();
    const vehicle = selectedVehicle();
    const payload = {
      system: "repair-service",
      workerIdentifier: byId("worker-identifier").value.trim().toUpperCase(),
      language: language(),
      serviceType: state.service,
      vehicleId: vehicle?.id || "",
      repairType: state.service === "repair" ? state.repairType : "",
      repairReason: state.service === "repair" ? byId("repair-reason").value.trim() : "",
      currentLivery: state.service === "repainting" ? byId("current-livery").value : "",
      desiredLivery: state.service === "repainting" ? byId("desired-livery").value : ""
    };
    if (!payload.serviceType || !payload.vehicleId
        || (payload.serviceType === "repair" && (!payload.repairType
          || payload.repairReason.length < Number(state.config.repairReason.minLength)))
        || (payload.serviceType === "repainting" && (!payload.currentLivery || !payload.desiredLivery))) {
      showStatus(copy("required"), "error");
      return;
    }
    if (payload.serviceType === "repainting" && payload.currentLivery === payload.desiredLivery) {
      showStatus(copy("sameLivery"), "error");
      return;
    }
    const button = byId("submit-repair-application");
    button.disabled = true;
    showStatus(copy("submitting"));
    try {
      const body = new URLSearchParams({ payload: JSON.stringify(payload) });
      const result = await fetch(apiBase, { method: "POST", body }).then(readResponse);
      [...form.elements].forEach((element) => { element.disabled = true; });
      showStatus(result.message, "success");
      renderResult(result);
    } catch (error) {
      showStatus(error.message || copy("submitFailed"), "error");
      button.disabled = false;
    }
  }

  const identifier = byId("worker-identifier");
  const toggle = byId("toggle-worker-identifier");
  function setIdentifierVisible(visible) {
    identifier.type = visible ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(visible));
    const label = copy(visible ? "hideIdentifier" : "showIdentifier");
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
  }

  toggle.addEventListener("click", () => {
    setIdentifierVisible(identifier.type === "password");
    identifier.focus();
  });
  identifier.addEventListener("input", (event) => {
    event.target.value = event.target.value.toUpperCase().replace(/\s+/g, "");
    state.profile = null;
    state.service = null;
    byId("repair-profile-summary").hidden = true;
    byId("repair-application-details").hidden = true;
    byId("repair-application-result").hidden = true;
    clearStatus();
    updateProgress("account");
  });
  byId("repair-vehicle-id").addEventListener("change", () => {
    if (state.service === "repainting") renderLiveries();
    clearStatus();
  });
  byId("lookup-repair-profile").addEventListener("click", lookupProfile);
  form.addEventListener("submit", submitApplication);
  setConditionalSection("repair-fields", false);
  setConditionalSection("repainting-fields", false);
  setIdentifierVisible(false);
  updateProgress("account");
  loadConfig().catch((error) => showStatus(error.message || copy("loadFailed"), "error"));
}

if (typeof reinitializeEventListeners === "function") {
  const previousReinitializeEventListeners = reinitializeEventListeners;
  reinitializeEventListeners = function reinitializeRepairApplicationPage() {
    previousReinitializeEventListeners();
    queueMicrotask(initRepairApplicationForm);
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRepairApplicationForm);
} else {
  initRepairApplicationForm();
}
