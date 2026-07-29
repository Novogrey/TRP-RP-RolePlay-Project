const administrativeFormTranslations = {
  ru: {
    "Административный отдел TRP RP": "Административный отдел TRP RP",
    "Отпуск и досрочный выход": "Отпуск и досрочный выход",
    "Данные проверяются автоматически": "Данные проверяются автоматически",
    "Решение только в Discord": "Решение только в Discord",
    "Административный отдел": "Административный отдел",
    "Проверка аккаунта": "Проверка аккаунта",
    "Discord и Roblox": "Discord и Roblox",
    "Параметры заявления": "Параметры заявления",
    "Отпуск или досрочный выход": "Отпуск или досрочный выход",
    "Рассмотрение": "Рассмотрение",
    "Решение Административного отдела": "Решение Административного отдела",
    "Укажите ID аккаунта Discord, который привязан к Roblox на сервере проекта.":
      "Укажите ID аккаунта Discord, который привязан к Roblox на сервере проекта.",
    "ID аккаунта Discord": "ID аккаунта Discord",
    "Проверить данные": "Проверить данные",
    "Выберите заявление и заполните относящиеся к нему поля.":
      "Выберите заявление и заполните относящиеся к нему поля.",
    "Выберите заявление": "Выберите заявление",
    "Тип отпуска": "Тип отпуска",
    "Описание типов отпуска": "Описание типов отпуска",
    "Причина отпуска": "Причина отпуска",
    "Номер приказа предоставленного отпуска": "Номер приказа предоставленного отпуска",
    "Причина досрочного выхода из отпуска": "Причина досрочного выхода из отпуска",
    "Отправить заявление": "Отправить заявление"
  },
  en: {
    "Административный отдел TRP RP": "TRP RP Administrative Department",
    "Отпуск и досрочный выход": "Vacation and Early Return",
    "Данные проверяются автоматически": "Account details are checked automatically",
    "Решение только в Discord": "Decision only in Discord",
    "Административный отдел": "Administrative Department",
    "Проверка аккаунта": "Account verification",
    "Discord и Roblox": "Discord and Roblox",
    "Параметры заявления": "Application details",
    "Отпуск или досрочный выход": "Vacation or early return",
    "Рассмотрение": "Review",
    "Решение Административного отдела": "Administrative Department decision",
    "Укажите ID аккаунта Discord, который привязан к Roblox на сервере проекта.":
      "Enter the Discord account ID linked to Roblox on the project server.",
    "ID аккаунта Discord": "Discord account ID",
    "Проверить данные": "Check details",
    "Выберите заявление и заполните относящиеся к нему поля.":
      "Choose an application and complete the relevant fields.",
    "Выберите заявление": "Choose an application",
    "Тип отпуска": "Vacation type",
    "Описание типов отпуска": "Vacation type descriptions",
    "Причина отпуска": "Reason for vacation",
    "Номер приказа предоставленного отпуска": "Vacation order number",
    "Причина досрочного выхода из отпуска": "Reason for early return from vacation",
    "Отправить заявление": "Submit application"
  }
};

if (typeof translations !== "undefined") {
  Object.assign(translations.ru, administrativeFormTranslations.ru);
  Object.assign(translations.en, administrativeFormTranslations.en);
}

const administrativePageCopy = {
  ru: {
    apiMissing: "Форма ещё не подключена к API заявлений.",
    invalidId: "Укажите корректный ID аккаунта Discord.",
    loading: "Проверяем верификацию и данные аккаунта...",
    profileReady: "Данные подтверждены. Заполните параметры заявления.",
    loadFailed: "Не удалось проверить данные. Повторите попытку позднее.",
    discord: "Аккаунт Discord",
    roblox: "Аккаунт Roblox",
    position: "Должность",
    choose: "Выберите вариант",
    reasonPlaceholder: "Укажите причину подробно и разборчиво.",
    submitting: "Отправляем заявление...",
    submitFailed: "Не удалось отправить заявление.",
    submitted: "Заявление отправлено.",
    required: "Заполните все обязательные поля.",
    invalidReason: "Причина должна содержать от 10 до 1500 символов."
  },
  en: {
    apiMissing: "The form is not connected to the application API.",
    invalidId: "Enter a valid Discord account ID.",
    loading: "Checking verification and account details...",
    profileReady: "Account details confirmed. Complete the application.",
    loadFailed: "Account details could not be checked. Try again later.",
    discord: "Discord account",
    roblox: "Roblox account",
    position: "Position",
    choose: "Choose an option",
    reasonPlaceholder: "Provide a clear and detailed reason.",
    submitting: "Submitting application...",
    submitFailed: "The application could not be submitted.",
    submitted: "Application submitted.",
    required: "Complete all required fields.",
    invalidReason: "The reason must contain between 10 and 1,500 characters."
  }
};

function initAdministrativeApplicationForm() {
  const form = document.getElementById("administrative-application-form");
  if (!form || form.dataset.initialized === "true") return;
  form.dataset.initialized = "true";

  const state = {
    config: null,
    profile: null,
    applicationType: null
  };
  const byId = (id) => document.getElementById(id);
  const lang = () => (localStorage.getItem("language") === "en" ? "en" : "ru");
  const copy = (key) => administrativePageCopy[lang()][key];
  const apiBase = String(
    window.TRP_APPLICATIONS_API_URL
    || window.TRP_TRAINING_APPLICATIONS_API_URL
    || ""
  ).trim();

  function showStatus(message, kind = "") {
    const element = byId("application-status");
    element.hidden = false;
    element.className = `application-status ${kind}`.trim();
    element.textContent = message;
  }

  function clearStatus() {
    const element = byId("application-status");
    element.hidden = true;
    element.textContent = "";
    element.className = "application-status";
  }

  function updateProgress(stage) {
    const order = ["account", "details", "review"];
    const activeIndex = Math.max(0, order.indexOf(stage));
    document.querySelectorAll("[data-progress-step]").forEach((item) => {
      const itemIndex = order.indexOf(item.dataset.progressStep);
      item.classList.toggle("is-active", itemIndex === activeIndex);
      item.classList.toggle("is-complete", itemIndex < activeIndex);
    });
  }

  function endpoint(parameters) {
    const url = new URL(apiBase);
    Object.entries(parameters).forEach(([key, value]) => url.searchParams.set(key, value));
    return url.toString();
  }

  async function readResponse(response) {
    const payload = await response.json().catch(() => null);
    if (!payload || payload.ok === false) {
      throw new Error(payload?.error || copy("loadFailed"));
    }
    return payload;
  }

  function profileItem(label, value, href = "") {
    const item = document.createElement("div");
    item.className = "profile-item";
    const caption = document.createElement("small");
    caption.textContent = label;
    const content = document.createElement(href ? "a" : "strong");
    content.textContent = value || "—";
    if (href) {
      content.href = href;
      content.target = "_blank";
      content.rel = "noopener noreferrer";
    }
    item.append(caption, content);
    return item;
  }

  function renderProfile() {
    const summary = byId("profile-summary");
    summary.replaceChildren(
      profileItem(copy("discord"), state.profile.displayName || state.profile.discordUsername),
      profileItem(copy("roblox"), state.profile.robloxUsername, state.profile.robloxProfileUrl),
      profileItem(copy("position"), state.profile.positionLabel)
    );
    summary.hidden = false;
  }

  function renderApplicationTypes() {
    const root = byId("application-type-options");
    root.replaceChildren();
    state.config.applicationTypes.forEach((entry) => {
      const label = document.createElement("label");
      label.className = "segment-option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "applicationType";
      input.value = entry.id;
      const content = document.createElement("span");
      const title = document.createElement("strong");
      title.textContent = entry.label;
      const description = document.createElement("small");
      description.textContent = entry.description;
      content.append(title, description);
      label.append(input, content);
      input.addEventListener("change", () => selectApplicationType(entry.id));
      root.append(label);
    });
  }

  function renderVacationTypes() {
    const select = byId("vacation-type");
    const descriptions = byId("vacation-type-descriptions");
    select.replaceChildren();
    descriptions.replaceChildren();
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = copy("choose");
    select.append(empty);
    state.config.vacationTypes.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.id;
      option.textContent = entry.label;
      select.append(option);

      const item = document.createElement("article");
      item.className = "vacation-type-description";
      item.dataset.vacationType = entry.id;
      const title = document.createElement("strong");
      title.textContent = entry.label;
      const description = document.createElement("p");
      description.textContent = entry.description;
      item.append(title, description);
      descriptions.append(item);
    });
    const updateSelection = () => {
      descriptions.querySelectorAll("[data-vacation-type]").forEach((item) => {
        item.classList.toggle("is-selected", item.dataset.vacationType === select.value);
      });
    };
    select.onchange = updateSelection;
    updateSelection();
  }

  function applyQuestionConfig() {
    const fields = {
      vacationReason: "vacation-reason",
      orderNumber: "order-number",
      earlyReturnReason: "early-return-reason"
    };
    Object.entries(fields).forEach(([questionId, fieldId]) => {
      const question = state.config?.questions?.[questionId];
      const field = byId(fieldId);
      if (!question || !field) return;
      const label = document.querySelector(`label[for="${fieldId}"] span`);
      if (label) label.textContent = question.label;
      field.minLength = Number(question.minLength || 1);
      field.maxLength = Number(question.maxLength || 2000);
      field.placeholder = question.prompt || "";
    });
  }

  function validateConfiguredLength(value, questionId) {
    const question = state.config?.questions?.[questionId];
    if (!question) return true;
    return value.length >= Number(question.minLength)
      && value.length <= Number(question.maxLength);
  }

  function configuredLengthError(questionId) {
    const question = state.config?.questions?.[questionId];
    if (!question) return copy("required");
    return lang() === "ru"
      ? `${question.label}: ответ должен содержать от ${question.minLength} до ${question.maxLength} символов.`
      : `${question.label}: the answer must contain between ${question.minLength} and ${question.maxLength} characters.`;
  }

  function setConditionalFieldState(root, enabled) {
    root.hidden = !enabled;
    root.querySelectorAll("input, select, textarea").forEach((field) => {
      field.disabled = !enabled;
    });
  }

  function selectApplicationType(type) {
    state.applicationType = type;
    setConditionalFieldState(byId("vacation-fields"), type === "vacation");
    setConditionalFieldState(byId("early-return-fields"), type === "early_return");
    byId("submit-application").disabled = false;
    clearStatus();
    updateProgress("details");
    if (type === "vacation") renderVacationTypes();
  }

  async function lookupProfile() {
    const discordId = byId("discord-id").value.trim();
    if (!/^\d{15,22}$/.test(discordId)) {
      showStatus(copy("invalidId"), "error");
      return;
    }
    if (!apiBase || apiBase.startsWith("PASTE_")) {
      showStatus(copy("apiMissing"), "error");
      return;
    }
    byId("lookup-profile").disabled = true;
    showStatus(copy("loading"));
    updateProgress("account");
    try {
      const [configResult, profileResult] = await Promise.all([
        fetch(
          endpoint({ action: "administrative-config", language: lang(), _: Date.now() }),
          { cache: "no-store" }
        ).then(readResponse),
        fetch(
          endpoint({
            action: "administrative-profile",
            discordId,
            language: lang(),
            _: Date.now()
          }),
          { cache: "no-store" }
        ).then(readResponse)
      ]);
      state.config = configResult.config;
      state.profile = profileResult.profile;
      state.applicationType = null;
      renderProfile();
      renderApplicationTypes();
      applyQuestionConfig();
      byId("application-details").hidden = false;
      setConditionalFieldState(byId("vacation-fields"), false);
      setConditionalFieldState(byId("early-return-fields"), false);
      byId("submit-application").disabled = true;
      showStatus(copy("profileReady"), "success");
      updateProgress("details");
    } catch (error) {
      state.profile = null;
      state.config = null;
      state.applicationType = null;
      byId("profile-summary").hidden = true;
      byId("application-details").hidden = true;
      byId("submit-application").disabled = true;
      showStatus(error.message || copy("loadFailed"), "error");
      updateProgress("account");
    } finally {
      byId("lookup-profile").disabled = false;
    }
  }

  async function submitApplication(event) {
    event.preventDefault();
    if (!state.profile || !state.config || !state.applicationType) {
      showStatus(copy("required"), "error");
      return;
    }
    const payload = {
      system: "administrative",
      discordId: byId("discord-id").value.trim(),
      language: lang(),
      applicationType: state.applicationType
    };
    if (state.applicationType === "vacation") {
      payload.vacationType = byId("vacation-type").value;
      payload.reason = byId("vacation-reason").value.trim();
      if (!payload.vacationType) {
        showStatus(copy("required"), "error");
        return;
      }
      if (!validateConfiguredLength(payload.reason, "vacationReason")) {
        showStatus(configuredLengthError("vacationReason"), "error");
        return;
      }
    } else {
      payload.orderNumber = byId("order-number").value.trim();
      payload.reason = byId("early-return-reason").value.trim();
      if (!validateConfiguredLength(payload.orderNumber, "orderNumber")) {
        showStatus(configuredLengthError("orderNumber"), "error");
        return;
      }
      if (!validateConfiguredLength(payload.reason, "earlyReturnReason")) {
        showStatus(configuredLengthError("earlyReturnReason"), "error");
        return;
      }
    }

    byId("submit-application").disabled = true;
    showStatus(copy("submitting"));
    try {
      const body = new URLSearchParams({ payload: JSON.stringify(payload) });
      const result = await fetch(apiBase, { method: "POST", body }).then(readResponse);
      showStatus(result.message || copy("submitted"), "success");
      [...form.elements].forEach((element) => {
        element.disabled = true;
      });
      updateProgress("review");
    } catch (error) {
      showStatus(error.message || copy("submitFailed"), "error");
      byId("submit-application").disabled = false;
      updateProgress("details");
    }
  }

  byId("vacation-reason").placeholder = copy("reasonPlaceholder");
  byId("early-return-reason").placeholder = copy("reasonPlaceholder");
  setConditionalFieldState(byId("vacation-fields"), false);
  setConditionalFieldState(byId("early-return-fields"), false);
  byId("lookup-profile").addEventListener("click", lookupProfile);
  byId("discord-id").addEventListener("input", () => {
    state.profile = null;
    state.config = null;
    state.applicationType = null;
    byId("profile-summary").hidden = true;
    byId("application-details").hidden = true;
    byId("submit-application").disabled = true;
    clearStatus();
    updateProgress("account");
  });
  form.addEventListener("submit", submitApplication);
  updateProgress("account");
}

if (typeof reinitializeEventListeners === "function") {
  const previousReinitializeEventListeners = reinitializeEventListeners;
  reinitializeEventListeners = function reinitializeAdministrativePage() {
    previousReinitializeEventListeners();
    queueMicrotask(initAdministrativeApplicationForm);
  };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAdministrativeApplicationForm);
} else {
  initAdministrativeApplicationForm();
}
