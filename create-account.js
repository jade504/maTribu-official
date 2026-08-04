/*jade was here*/

console.log('JS loaded');

const translations = {
  pt: {
    criar_conta_titulo: "CRIAR CONTA",
    nome: "NOME*",
    apelido: "APELIDO*",
    email_label: "EMAIL*",
    password_label: "PASSWORD*",
    confirm_password_label: "CONFIRMAR PASSWORD*",
    criar_conta: "CRIAR CONTA",
    ja_tens_conta: "JA TENS CONTE?",
    entrar: "ENTRAR"
  },
  en: {
    criar_conta_titulo: "CREATE ACCOUNT",
    nome: "NAME*",
    apelido: "NICKNAME*",
    email_label: "EMAIL*",
    password_label: "PASSWORD*",
    confirm_password_label: "CONFIRM PASSWORD*",
    criar_conta: "CREATE ACCOUNT",
    ja_tens_conta: "ALREADY HAVE AN ACCOUNT?",
    entrar: "LOG IN"
  },
  es: {
    criar_conta_titulo: "CREAR CUENTA",
    nome: "NOMBRE*",
    apelido: "APODO*",
    email_label: "EMAIL*",
    password_label: "CONTRASEÑA*",
    confirm_password_label: "CONFIRMAR CONTRASEÑA*",
    criar_conta: "CREAR CUENTA",
    ja_tens_conta: "YA TIENES UNA CUENTA?",
    entrar: "INICIAR SESIÓN"
  },
  fr: {
    criar_conta_titulo: "CRÉER UN COMPTE",
    nome: "NOM*",
    apelido: "SURNOM*",
    email_label: "EMAIL*",
    password_label: "MOT DE PASSE*",
    confirm_password_label: "CONFIRMER MOT DE PASSE*",
    criar_conta: "CRÉER UN COMPTE",
    ja_tens_conta: "AVEZ-VOUS DEJA UN COMPTE?",
    entrar: "SE CONNECTER"
  },
  it: {
    criar_conta_titulo: "CREARE UN ACCOUNT",
    nome: "NOME*",
    apelido: "SURNOME*",
    email_label: "EMAIL*",
    password_label: "PASSWORD*",
    confirm_password_label: "CONFIRMARE PASSWORD*",
    criar_conta: "CREARE UN ACCOUNT",
    ja_tens_conta: "HAI GIA UN ACCOUNT?",
    entrar: "ACCEDERE"
  },
  de: {
    criar_conta_titulo: "KONTO ERSTELLEN",
    nome: "NAME*",
    apelido: "SPITZNAME*",
    email_label: "EMAIL*",
    password_label: "PASSWORD*",
    confirm_password_label: "PASSWORD BESTÄTIGEN*",
    criar_conta: "KONTO ERSTELLEN",
    ja_tens_conta: "HAST DU SCHON EIN KONTO?",
    entrar: "EINLOGGEN"
  }
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
    messageEl.textContent = 'Verificação por telemóvel em breve.';
    return;
  }

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'As passwords não coincidem.';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      messageEl.style.color = 'green';
      messageEl.textContent = data.message;
    } else {
      messageEl.style.color = 'red';
      messageEl.textContent = data.error;
    }
  } catch (err) {
    messageEl.style.color = 'red';
    messageEl.textContent = 'Não foi possível ligar ao servidor.';
  }
});