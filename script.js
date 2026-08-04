/*jade was here*/


const langButton = document.getElementById("lang-button");
const langList = document.getElementById("lang-list");

langButton.addEventListener("click", function() {
  langList.classList.toggle("hidden");
});

const translations = {
  pt: {
    tagline: "CRIAR JUNTAS<br>CRESCER EM TRIBO",
    criar_conta: "Criar Conta",
    entrar: "Entrar",
    emergencia: "Assistência de Emergência"
  },
  en: {
    tagline: "CREATE TOGETHER<br>GROW IN TRIBE",
    criar_conta: "Create Account",
    entrar: "Log In",
    emergencia: "Emergency Assistance"
  },
  es: {
    tagline: "CREAR JUNTAS<br>CRECER EN TRIBU",
    criar_conta: "Crear Cuenta",
    entrar: "Iniciar Sesión",
    emergencia: "Asistencia de Emergencia"
  },
  fr: {
    tagline: "CRÉER EMSEMBLE<br>GRANDIR EN TRIBE",
    criar_conta: "Créer un Compte",
    entrar: "Se Connecter",
    emergencia: "Assistance d'Urgence"
  },
  it: {
    tagline: "CREARE GIUNTI<br>CRESCERE IN TRIBÙ",
    criar_conta: "Creare Account",
    entrar: "Accedere",
    emergencia: "Assistenza d'Emergenza"
  },
  de: {
    tagline: "GRUPPEN ERSTELLEN<br>WACHST IN EINER TRIBE",
    criar_conta: "Konto Erstellen",
    entrar: "Einloggen",
    emergencia: "Notfallhilfe"
  }
};
function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-key]");
  elements.forEach(function(el) {
    const key = el.getAttribute("data-key");
    el.innerHTML = translations[lang][key];
  });
  
  document.getElementById("lang-indicator").textContent = lang.toUpperCase();
}
const langItems = document.querySelectorAll("#lang-list li");

langItems.forEach(function(item) {
  item.addEventListener("click", function() {
    const chosenLang = item.getAttribute("data-lang");
    setLanguage(chosenLang);
    langList.classList.add("hidden");
  });
});