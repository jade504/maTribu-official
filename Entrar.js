/*jade was here*/

console.log('JS loaded');

const translations = {
  pt: {
    entrar_titulo: "ENTRAR",
    email_label: "EMAIL*",
    telemovel: "TELEMOVEL*",
    password_label: "PASSWORD*",
    entrar: "ENTRAR",
    nao_tens_conta: "AINDA NAO TENS CONTA?",
    criar_conta: "CRIAR CONTA"
  },
  en: {
    entrar_titulo: "LOGIN",
    email_label: "EMAIL*",
    telemovel: "PHONE*",
    password_label: "PASSWORD*",
    entrar: "LOGIN",
    nao_tens_conta: "DON'T HAVE AN ACCOUNT?",
    criar_conta: "CREATE ACCOUNT"
  },
  es: {
    entrar_titulo: "INICIAR SESIÓN",
    email_label: "CORREO ELECTRÓNICO*",
    telemovel: "TELÉFONO*",
    password_label: "CONTRASEÑA*",
    entrar: "INICIAR SESIÓN",
    nao_tens_conta: "¿NO TIENES UNA CUENTA?",
    criar_conta: "CREAR CUENTA"
  },
  fr: {
    entrar_titulo: "SE CONNECTER",
    email_label: "EMAIL*",
    telemovel: "TÉLÉPHONE*",
    password_label: "MOT DE PASSE*",
    entrar: "SE CONNECTER",
    nao_tens_conta: "VOUS N'AVEZ PAS DE COMPTE?",
    criar_conta: "CRÉER UN COMPTE"
  },
  it: {
    entrar_titulo: "ACCEDI",
    email_label: "EMAIL*",
    telemovel: "TELEFONO*",
    password_label: "PASSWORD*",
    entrar: "ACCEDI",
    nao_tens_conta: "NON HAI UN ACCOUNT?",
    criar_conta: "CREA UN ACCOUNT"
  },
  de: {
    entrar_titulo: "ANMELDEN",
    email_label: "EMAIL*",
    telemovel: "TELEFON*",
    password_label: "PASSWORD*",
    entrar: "ANMELDEN",
    nao_tens_conta: "HABEN SIE NOCH KEIN KONTO?",
    criar_conta: "KONTO ERSTELLEN"
  },
};

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach(function(el) {
    const key = el.getAttribute("data-key");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.getElementById("lang-indicator").textContent = lang.toUpperCase();
}

const langButton = document.getElementById("lang-button");
const langList = document.getElementById("lang-list");

langButton.addEventListener("click", function() {
  langList.classList.toggle("hidden");
});

const langItems = document.querySelectorAll("#lang-list li");
langItems.forEach(function(item) {
  item.addEventListener("click", function() {
    const chosenLang = item.getAttribute("data-lang");
    setLanguage(chosenLang);
    langList.classList.add("hidden");
  });
});

const tabEmail = document.getElementById('tab-email');
const tabPhone = document.getElementById('tab-phone');
const emailFields = document.getElementById('email-fields');
const phoneFields = document.getElementById('phone-fields');
const submitBtn = document.getElementById('submit-btn');

let activeTab = 'email';

tabEmail.addEventListener('click', () => {
  activeTab = 'email';
  tabEmail.classList.add('active');
  tabPhone.classList.remove('active');
  emailFields.style.display = 'block';
  phoneFields.style.display = 'none';
  submitBtn.textContent = 'CRIAR CONTA';
});

tabPhone.addEventListener('click', () => {
  activeTab = 'phone';
  tabPhone.classList.add('active');
  tabEmail.classList.remove('active');
  phoneFields.style.display = 'block';
  emailFields.style.display = 'none';
  submitBtn.textContent = 'ENVIAR CODIGO';
});

document.querySelectorAll('.toggle-eye').forEach(eye => {
  eye.addEventListener('click', () => {
    const input = document.getElementById(eye.getAttribute('data-target'));
    input.type = input.type === 'password' ? 'text' : 'password';
  });
});

document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const messageEl = document.getElementById('form-message');
  messageEl.textContent = '';

  if (activeTab === 'phone') {
    messageEl.style.color = '#4A3428';
    messageEl.textContent = 'Login por telemóvel em breve.';
    return;
  }

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
  messageEl.style.color = 'green';
  messageEl.textContent = data.message;
  localStorage.setItem('matribu_user_email', email);
  setTimeout(() => {
    window.location.href = 'welcome.html';
  }, 800);
    } else {
      messageEl.style.color = 'red';
      messageEl.textContent = data.error;
    }
  } catch (err) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Não foi possível ligar ao servidor.';
  }
});