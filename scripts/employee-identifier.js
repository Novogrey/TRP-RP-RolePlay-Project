(function initEmployeeIdentifierPage() {
  const stylesheet = document.querySelector('link[href*="employee-number.css"]');
  if (stylesheet) stylesheet.href = '../../css/employee-number.css?v=20260801a';

  const API_URL = String(
    window.TRP_APPLICATIONS_API_URL
    || window.TRP_WORKER_IDENTIFIER_API_URL
    || 'https://script.google.com/macros/s/AKfycbwwamyT5tOTBS9jwDpIAXlhHljdfDNu292BdjXukCAVwRzER1-UZmxoG5HnABsVIBmx/exec'
  ).trim();

  const COPY = {
    ru: {
      eyebrow: 'TRP RP Systems',
      title: 'Идентификатор работника',
      intro: 'Идентификатор подтверждает вашу учётную запись при отправке заявлений на сайте проекта.',
      discordLabel: 'ID аккаунта Discord',
      discordHint: 'Откройте настройки Discord, включите режим разработчика и выберите «Копировать ID пользователя» в меню своего профиля.',
      placeholder: 'Например: 742304453608079370',
      submit: 'Отправить запрос в Discord',
      sending: 'Отправка запроса…',
      accessTitle: 'Перед отправкой',
      accessItems: [
        'Пройдите Roblox-верификацию на основном Discord-сервере.',
        'Убедитесь, что ваш Roblox-аккаунт состоит в группе TRP RP.',
        'Разрешите личные сообщения от участников сервера.'
      ],
      securityTitle: 'Не передавайте идентификатор',
      security: 'С его помощью другой человек может отправить заявление от вашего имени. Бот показывает идентификатор только в личных сообщениях и скрывает его спойлером.',
      invalid: 'Укажите корректный Discord ID из 17–20 цифр.',
      sent: 'Запрос отправлен. Откройте личные сообщения от TRP RP Systems и подтвердите получение идентификатора.',
      errors: {
        NOT_VERIFIED: 'Сначала пройдите Roblox-верификацию на основном сервере проекта.',
        NOT_MEMBER: 'Указанный аккаунт должен состоять на основном Discord-сервере проекта.',
        NOT_ROBLOX_GROUP_MEMBER: 'Получить идентификатор могут только участники Roblox-группы TRP RP.',
        ROBLOX_GROUP_CHECK_FAILED: 'Сейчас не удалось проверить участие в Roblox-группе. Повторите попытку позднее.',
        DM_FAILED: 'Бот не смог отправить личное сообщение. Разрешите сообщения от участников сервера и повторите запрос.',
        REQUEST_COOLDOWN: 'Запрос уже отправлен. Проверьте личные сообщения Discord.',
        BOT_UNAVAILABLE: 'Бот ещё не готов принимать запросы. Повторите попытку позднее.',
        DATABASE_UNAVAILABLE: 'База верификации временно недоступна. Повторите попытку позднее.',
        INVALID_DISCORD_ID: 'Указан некорректный Discord ID.'
      }
    },
    en: {
      eyebrow: 'TRP RP Systems',
      title: 'Employee identifier',
      intro: 'The identifier confirms your account when you submit applications on the project website.',
      discordLabel: 'Discord account ID',
      discordHint: 'Open Discord settings, enable Developer Mode, then choose “Copy User ID” from your profile menu.',
      placeholder: 'For example: 742304453608079370',
      submit: 'Send request to Discord',
      sending: 'Sending request…',
      accessTitle: 'Before submitting',
      accessItems: [
        'Complete Roblox verification on the main Discord server.',
        'Make sure your Roblox account is a member of the TRP RP group.',
        'Allow direct messages from server members.'
      ],
      securityTitle: 'Do not share the identifier',
      security: 'Another person could use it to submit an application in your name. The bot displays it only in direct messages and hides it behind a spoiler.',
      invalid: 'Enter a valid Discord ID containing 17–20 digits.',
      sent: 'The request was sent. Open the direct message from TRP RP Systems and confirm that you want to receive the identifier.',
      errors: {
        NOT_VERIFIED: 'Complete Roblox verification on the main project server first.',
        NOT_MEMBER: 'The specified account must be a member of the main project Discord server.',
        NOT_ROBLOX_GROUP_MEMBER: 'Only members of the TRP RP Roblox group can receive an identifier.',
        ROBLOX_GROUP_CHECK_FAILED: 'Roblox group membership could not be checked. Try again later.',
        DM_FAILED: 'The bot could not send a direct message. Allow messages from server members and try again.',
        REQUEST_COOLDOWN: 'The request was already sent. Check your Discord direct messages.',
        BOT_UNAVAILABLE: 'The bot is not ready to accept requests yet. Try again later.',
        DATABASE_UNAVAILABLE: 'The verification database is temporarily unavailable. Try again later.',
        INVALID_DISCORD_ID: 'The Discord ID is invalid.'
      }
    }
  };

  function language() {
    return String(localStorage.getItem('selectedLanguage') || 'ru').toLowerCase() === 'en'
      ? 'en'
      : 'ru';
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  async function readResponse(response) {
    const result = await response.json().catch(() => null);
    if (!result) throw Object.assign(new Error('INVALID_RESPONSE'), { code: 'INVALID_RESPONSE' });
    if (!result.ok) throw Object.assign(new Error(result.error || result.code), { code: result.code });
    return result;
  }

  function render() {
    const root = document.getElementById('form-wrapper');
    if (!root) return;
    const lang = language();
    const copy = COPY[lang];
    document.documentElement.lang = lang;
    document.title = `${copy.title} - TRP RP`;

    root.innerHTML = `
      <div class="employee-identifier-shell">
        <header class="employee-identifier-hero">
          <img src="../../images/avatar.webp" alt="TRP RP" class="employee-identifier-mark">
          <div>
            <p class="employee-identifier-eyebrow">${escapeHtml(copy.eyebrow)}</p>
            <h1>${escapeHtml(copy.title)}</h1>
            <p>${escapeHtml(copy.intro)}</p>
          </div>
        </header>

        <div class="employee-identifier-layout">
          <form class="employee-identifier-form" id="employee-identifier-form" novalidate>
            <div class="employee-step-heading">
              <span aria-hidden="true">01</span>
              <div>
                <h2>${escapeHtml(copy.discordLabel)}</h2>
                <p>${escapeHtml(copy.discordHint)}</p>
              </div>
            </div>
            <label class="employee-id-field" for="employee-discord-id">
              <span>${escapeHtml(copy.discordLabel)}</span>
              <input id="employee-discord-id" name="discordId" type="text" inputmode="numeric" autocomplete="off" maxlength="20" placeholder="${escapeHtml(copy.placeholder)}" required>
            </label>
            <p class="employee-request-status" id="employee-request-status" role="status" hidden></p>
            <button class="employee-submit" type="submit">
              <span>${escapeHtml(copy.submit)}</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <aside class="employee-identifier-aside">
            <section class="employee-requirements">
              <h2>${escapeHtml(copy.accessTitle)}</h2>
              <ol>${copy.accessItems.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol>
            </section>
            <section class="employee-security-note">
              <span class="employee-security-icon" aria-hidden="true">!</span>
              <div>
                <h2>${escapeHtml(copy.securityTitle)}</h2>
                <p>${escapeHtml(copy.security)}</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    `;

    const form = document.getElementById('employee-identifier-form');
    const input = document.getElementById('employee-discord-id');
    const status = document.getElementById('employee-request-status');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const discordId = input.value.replace(/\D/g, '');
      input.value = discordId;
      if (!/^\d{17,20}$/.test(discordId)) {
        status.hidden = false;
        status.className = 'employee-request-status error';
        status.textContent = copy.invalid;
        input.focus();
        return;
      }
      const button = form.querySelector('.employee-submit');
      const buttonLabel = button.querySelector('span');
      button.disabled = true;
      buttonLabel.textContent = copy.sending;
      status.hidden = true;
      try {
        const body = new URLSearchParams({
          payload: JSON.stringify({
            action: 'worker-identifier-request',
            discordId,
            language: lang
          })
        });
        await fetch(API_URL, { method: 'POST', body }).then(readResponse);
        status.hidden = false;
        status.className = 'employee-request-status success';
        status.textContent = copy.sent;
      } catch (error) {
        const code = String(error.code || '').toUpperCase();
        status.hidden = false;
        status.className = 'employee-request-status error';
        status.textContent = copy.errors[code] || copy.errors.BOT_UNAVAILABLE;
      } finally {
        button.disabled = false;
        buttonLabel.textContent = copy.submit;
      }
    });

    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, 20);
      status.hidden = true;
    });
  }

  // The legacy page script calls this hook on DOMContentLoaded.
  window.updateGeneratorForm = render;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
