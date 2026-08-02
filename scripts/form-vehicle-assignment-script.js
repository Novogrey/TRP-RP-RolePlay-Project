const vehicleAssignmentCopy = {
  ru: {
    department: "Транспортная база данных",
    title: "Закрепление транспорта",
    subtitle:
      "Автоматическая проверка прав, статуса транспорта и доступных мест",
    accountStep: "Проверка аккаунта",
    accountStepSmall: "Идентификатор и Roblox",
    detailsStep: "Параметры операции",
    detailsStepSmall: "Закрепление, открепление или замена",
    resultStep: "Результат",
    resultStepSmall: "Автоматическое решение",
    accountIntro:
      "Укажите личный идентификатор работника, полученный через бота TRP RP Systems.",
    identifier: "Идентификатор работника",
    identifierGuide:
      "Введите свой Discord ID на странице получения, подтвердите запрос в личных сообщениях бота и используйте выданный код здесь.",
    getIdentifier: "Получить идентификатор работника",
    check: "Проверить данные",
    detailsIntro: "Выберите операцию и укажите требуемые бортовые номера.",
    chooseOperation: "Выберите операцию",
    conditions: "Условия операции",
    vehicleList: "Открыть список автотранспорта",
    submit: "Выполнить автоматическую проверку",
    resultTitleAccepted: "Операция выполнена",
    resultTitleRejected: "Операция отклонена",
    resultIntro: "Результат также отправлен в Discord.",
    operation: "Операция",
    currentVehicle: "Текущий транспорт",
    newVehicle: "Новый транспорт",
    points: "Списано поинтов",
    balance: "Остаток",
    reason: "Результат проверки",
    discord: "Аккаунт Discord",
    roblox: "Аккаунт Roblox",
    position: "Должность",
    currentBindings: "Текущие закрепления",
    noBindings: "Закреплённый транспорт не найден",
    invalidIdentifier: "Укажите корректный идентификатор работника.",
    loading: "Проверяем идентификатор, участие в группе и данные таблиц...",
    profileReady: "Данные подтверждены. Выберите операцию.",
    loadFailed: "Не удалось проверить данные.",
    choose: "Выберите вариант",
    required: "Заполните все обязательные поля.",
    submitting: "Выполняем автоматическую проверку и обновляем данные...",
    submitFailed: "Не удалось выполнить операцию.",
    showIdentifier: "Показать идентификатор",
    hideIdentifier: "Скрыть идентификатор",
  },
  en: {
    department: "Transport database",
    title: "Vehicle assignment",
    subtitle:
      "Automatic checks of driving rights, vehicle status and available slots",
    accountStep: "Account verification",
    accountStepSmall: "Identifier and Roblox",
    detailsStep: "Operation details",
    detailsStepSmall: "Assignment, detachment or replacement",
    resultStep: "Result",
    resultStepSmall: "Automatic decision",
    accountIntro:
      "Enter the personal employee identifier issued by the TRP RP Systems bot.",
    identifier: "Employee identifier",
    identifierGuide:
      "Enter your Discord ID on the identifier page, confirm the request in the bot's direct messages, then use the issued code here.",
    getIdentifier: "Get employee identifier",
    check: "Check details",
    detailsIntro: "Choose an operation and enter the required fleet numbers.",
    chooseOperation: "Choose an operation",
    conditions: "Operation conditions",
    vehicleList: "Open vehicle list",
    submit: "Run automatic check",
    resultTitleAccepted: "Operation completed",
    resultTitleRejected: "Operation rejected",
    resultIntro: "The result was also sent to Discord.",
    operation: "Operation",
    currentVehicle: "Current vehicle",
    newVehicle: "New vehicle",
    points: "Points charged",
    balance: "Balance",
    reason: "Check result",
    discord: "Discord account",
    roblox: "Roblox account",
    position: "Position",
    currentBindings: "Current assignments",
    noBindings: "No assigned vehicle was found",
    invalidIdentifier: "Enter a valid employee identifier.",
    loading:
      "Checking the identifier, group membership and spreadsheet data...",
    profileReady: "Details confirmed. Choose an operation.",
    loadFailed: "The details could not be checked.",
    choose: "Choose an option",
    required: "Complete all required fields.",
    submitting: "Running automatic checks and updating the data...",
    submitFailed: "The operation could not be completed.",
    showIdentifier: "Show identifier",
    hideIdentifier: "Hide identifier",
  },
};

function initVehicleAssignmentForm() {
  const form = document.getElementById("vehicle-assignment-form");
  if (!form || form.dataset.initialized === "true") return;
  form.dataset.initialized = "true";
  const state = { config: null, profile: null, operation: null };
  const byId = (id) => document.getElementById(id);
  const lang = () => (localStorage.getItem("language") === "en" ? "en" : "ru");
  const copy = (key) => vehicleAssignmentCopy[lang()][key];
  const apiBase = String(
    window.TRP_APPLICATIONS_API_URL ||
      window.TRP_TRAINING_APPLICATIONS_API_URL ||
      "",
  ).trim();

  document.querySelectorAll("[data-vehicle-copy]").forEach((element) => {
    const value = copy(element.dataset.vehicleCopy);
    if (value) element.textContent = value;
  });

  function endpoint(parameters) {
    const url = new URL(apiBase);
    Object.entries(parameters).forEach(([key, value]) =>
      url.searchParams.set(key, value),
    );
    return url.toString();
  }

  async function readResponse(response) {
    const result = await response.json().catch(() => null);
    if (!result || result.ok === false) {
      const error = new Error(result?.error || copy("submitFailed"));
      error.code = result?.code || "API_ERROR";
      throw error;
    }
    return result;
  }

  function showStatus(message, type = "info") {
    const status = byId("vehicle-assignment-status");
    status.hidden = false;
    status.dataset.type = type;
    status.textContent = message;
  }

  function clearStatus() {
    const status = byId("vehicle-assignment-status");
    status.hidden = true;
    status.textContent = "";
    delete status.dataset.type;
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
    const bindings = profile.currentVehicles?.length
      ? `<ul>${profile.currentVehicles.map((vehicle) => `<li><strong>${escapeHtml(vehicle.id)}</strong> · ${escapeHtml(vehicle.model || "—")} · ${escapeHtml(vehicle.status || "—")}</li>`).join("")}</ul>`
      : `<p>${escapeHtml(copy("noBindings"))}</p>`;
    const summary = byId("vehicle-profile-summary");
    summary.innerHTML = `
      <div><small>${escapeHtml(copy("discord"))}</small><strong>${escapeHtml(profile.displayName || profile.discordUsername)}</strong></div>
      <div><small>${escapeHtml(copy("roblox"))}</small><strong><a href="${escapeHtml(profile.robloxProfileUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(profile.robloxUsername)}</a></strong></div>
      <div><small>${escapeHtml(copy("position"))}</small><strong>${escapeHtml(profile.positionLabel || "—")}</strong></div>
      <div class="current-bindings"><strong>${escapeHtml(copy("currentBindings"))}</strong>${bindings}</div>`;
    summary.hidden = false;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function applyQuestion(fieldId, question) {
    const field = byId(fieldId);
    const label = document.querySelector(`[for="${fieldId}"] > span`);
    if (label) label.textContent = question.label;
    field.placeholder = question.prompt;
    field.minLength = Number(question.minLength);
    field.maxLength = Number(question.maxLength);
  }

  function renderOperations() {
    const root = byId("vehicle-operation-options");
    root.replaceChildren();
    state.config.operations.forEach((operation) => {
      const label = document.createElement("label");
      label.className = "segment-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "vehicleOperation";
      input.value = operation.id;
      const content = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = operation.label;
      const description = document.createElement("small");
      description.textContent = operation.description;
      content.append(title, description);
      label.append(input, content);
      input.addEventListener("change", () => selectOperation(operation));
      root.append(label);
    });
    byId("vehicle-list-link").href = state.config.vehicleListUrl;
    applyQuestion("current-vehicle-id", state.config.questions.currentVehicle);
    applyQuestion("new-vehicle-id", state.config.questions.newVehicle);
  }

  function setFieldState(root, enabled) {
    root.hidden = !enabled;
    root.querySelectorAll("input").forEach((input) => {
      input.disabled = !enabled;
    });
  }

  function selectOperation(operation) {
    state.operation = operation;
    setFieldState(
      byId("current-vehicle-field"),
      ["detach", "reassign"].includes(operation.id),
    );
    setFieldState(
      byId("new-vehicle-field"),
      ["bind", "reassign"].includes(operation.id),
    );
    byId("vehicle-operation-description").textContent = operation.description;
    byId("submit-vehicle-assignment").disabled = false;
    clearStatus();
  }

  async function lookupProfile() {
    const workerIdentifier = byId("worker-identifier")
      .value.trim()
      .toUpperCase();
    if (
      !/^TRP-RP-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(workerIdentifier)
    ) {
      showStatus(copy("invalidIdentifier"), "error");
      return;
    }
    if (!apiBase || apiBase.startsWith("PASTE_")) {
      showStatus(copy("loadFailed"), "error");
      return;
    }
    byId("lookup-vehicle-profile").disabled = true;
    showStatus(copy("loading"));
    try {
      const [configResult, profileResult] = await Promise.all([
        fetch(
          endpoint({
            action: "vehicle-assignment-config",
            language: lang(),
            _: Date.now(),
          }),
          { cache: "no-store" },
        ).then(readResponse),
        fetch(
          endpoint({
            action: "vehicle-assignment-profile",
            workerIdentifier,
            language: lang(),
            _: Date.now(),
          }),
          { cache: "no-store" },
        ).then(readResponse),
      ]);
      state.config = configResult.config;
      state.profile = profileResult.profile;
      state.operation = null;
      renderProfile();
      renderOperations();
      byId("vehicle-assignment-details").hidden = false;
      byId("vehicle-assignment-result").hidden = true;
      setFieldState(byId("current-vehicle-field"), false);
      setFieldState(byId("new-vehicle-field"), false);
      byId("submit-vehicle-assignment").disabled = true;
      showStatus(copy("profileReady"), "success");
      updateProgress("details");
    } catch (error) {
      state.config = null;
      state.profile = null;
      state.operation = null;
      byId("vehicle-profile-summary").hidden = true;
      byId("vehicle-assignment-details").hidden = true;
      showStatus(error.message || copy("loadFailed"), "error");
      updateProgress("account");
    } finally {
      byId("lookup-vehicle-profile").disabled = false;
    }
  }

  function renderResult(result) {
    const accepted = result.status === "accepted";
    const root = byId("vehicle-assignment-result-card");
    root.dataset.status = result.status;
    root.innerHTML = `
      <h3>${escapeHtml(copy(accepted ? "resultTitleAccepted" : "resultTitleRejected"))}</h3>
      <p>${escapeHtml(copy("resultIntro"))}</p>
      <dl>
        <dt>${escapeHtml(copy("operation"))}</dt><dd>${escapeHtml(result.operationLabel)}</dd>
        ${result.currentVehicleId ? `<dt>${escapeHtml(copy("currentVehicle"))}</dt><dd>${escapeHtml(result.currentVehicleId)}</dd>` : ""}
        ${result.newVehicleId ? `<dt>${escapeHtml(copy("newVehicle"))}</dt><dd>${escapeHtml(result.newVehicleId)}</dd>` : ""}
        ${accepted ? `<dt>${escapeHtml(copy("points"))}</dt><dd>${escapeHtml(result.cost)}</dd><dt>${escapeHtml(copy("balance"))}</dt><dd>${escapeHtml(result.balance)}</dd>` : ""}
        <dt>${escapeHtml(copy("reason"))}</dt><dd>${escapeHtml(result.message)}</dd>
      </dl>`;
    byId("vehicle-assignment-result").hidden = false;
    updateProgress("result");
    root.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function submitOperation(event) {
    event.preventDefault();
    if (!state.config || !state.profile || !state.operation) {
      showStatus(copy("required"), "error");
      return;
    }
    const payload = {
      system: "vehicle-assignment",
      workerIdentifier: byId("worker-identifier").value.trim().toUpperCase(),
      language: lang(),
      operation: state.operation.id,
      currentVehicleId: byId("current-vehicle-id").disabled
        ? ""
        : byId("current-vehicle-id").value.trim(),
      newVehicleId: byId("new-vehicle-id").disabled
        ? ""
        : byId("new-vehicle-id").value.trim(),
    };
    if (
      (["detach", "reassign"].includes(payload.operation) &&
        !payload.currentVehicleId) ||
      (["bind", "reassign"].includes(payload.operation) &&
        !payload.newVehicleId)
    ) {
      showStatus(copy("required"), "error");
      return;
    }
    byId("submit-vehicle-assignment").disabled = true;
    showStatus(copy("submitting"));
    try {
      const body = new URLSearchParams({ payload: JSON.stringify(payload) });
      const result = await fetch(apiBase, { method: "POST", body }).then(
        readResponse,
      );
      showStatus(
        result.message,
        result.status === "accepted" ? "success" : "error",
      );
      [...form.elements].forEach((element) => {
        element.disabled = true;
      });
      renderResult(result);
    } catch (error) {
      showStatus(error.message || copy("submitFailed"), "error");
      byId("submit-vehicle-assignment").disabled = false;
    }
  }

  const identifier = byId("worker-identifier");
  const toggle = byId("toggle-worker-identifier");
  const updateIdentifierVisibility = (visible) => {
    identifier.type = visible ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(visible));
    const label = copy(visible ? "hideIdentifier" : "showIdentifier");
    toggle.setAttribute("aria-label", label);
    toggle.title = label;
  };
  toggle.addEventListener("click", () => {
    updateIdentifierVisibility(identifier.type === "password");
    identifier.focus();
  });
  identifier.addEventListener("input", (event) => {
    event.target.value = event.target.value.toUpperCase().replace(/\s+/g, "");
    state.config = null;
    state.profile = null;
    state.operation = null;
    byId("vehicle-profile-summary").hidden = true;
    byId("vehicle-assignment-details").hidden = true;
    byId("vehicle-assignment-result").hidden = true;
    clearStatus();
    updateProgress("account");
  });
  byId("lookup-vehicle-profile").addEventListener("click", lookupProfile);
  form.addEventListener("submit", submitOperation);
  setFieldState(byId("current-vehicle-field"), false);
  setFieldState(byId("new-vehicle-field"), false);
  updateIdentifierVisibility(false);
  updateProgress("account");
}

if (typeof reinitializeEventListeners === "function") {
  const previousReinitializeEventListeners = reinitializeEventListeners;
  reinitializeEventListeners = function reinitializeVehicleAssignmentPage() {
    previousReinitializeEventListeners();
    queueMicrotask(initVehicleAssignmentForm);
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVehicleAssignmentForm);
} else {
  initVehicleAssignmentForm();
}
