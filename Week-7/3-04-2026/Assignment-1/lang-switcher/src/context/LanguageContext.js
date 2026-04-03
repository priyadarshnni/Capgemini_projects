import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    appTitle: "My App",
    home: "Home",
    about: "About",
    contact: "Contact",
    welcome: "Welcome to My App",
    welcomeDesc: "This app supports multiple languages using React Context API.",
    aboutTitle: "About Us",
    aboutDesc: "We are a company that believes in making technology accessible to everyone around the world.",
    contactTitle: "Contact Us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send Message",
    selectLang: "Select Language",
    currentLang: "Current Language",
    sent: "Message sent successfully!",
    tagline: "Building for the world, in every language.",
  },
  hi: {
    appTitle: "मेरा ऐप",
    home: "होम",
    about: "हमारे बारे में",
    contact: "संपर्क",
    welcome: "मेरे ऐप में आपका स्वागत है",
    welcomeDesc: "यह ऐप React Context API का उपयोग करके कई भाषाओं का समर्थन करता है।",
    aboutTitle: "हमारे बारे में",
    aboutDesc: "हम एक ऐसी कंपनी हैं जो दुनिया भर के सभी लोगों के लिए तकनीक को सुलभ बनाने में विश्वास रखती है।",
    contactTitle: "संपर्क करें",
    name: "नाम",
    email: "ईमेल",
    message: "संदेश",
    send: "संदेश भेजें",
    selectLang: "भाषा चुनें",
    currentLang: "वर्तमान भाषा",
    sent: "संदेश सफलतापूर्वक भेजा गया!",
    tagline: "हर भाषा में, दुनिया के लिए।",
  },
  fr: {
    appTitle: "Mon Application",
    home: "Accueil",
    about: "À propos",
    contact: "Contact",
    welcome: "Bienvenue sur Mon Application",
    welcomeDesc: "Cette application prend en charge plusieurs langues grâce à l'API Context de React.",
    aboutTitle: "À propos de nous",
    aboutDesc: "Nous sommes une entreprise qui croit en l'accessibilité de la technologie pour tous dans le monde entier.",
    contactTitle: "Contactez-nous",
    name: "Nom",
    email: "E-mail",
    message: "Message",
    send: "Envoyer le message",
    selectLang: "Choisir la langue",
    currentLang: "Langue actuelle",
    sent: "Message envoyé avec succès!",
    tagline: "Construire pour le monde, dans chaque langue.",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const t = translations[language];
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);