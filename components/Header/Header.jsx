import styles from "./Header.module.css";

import Idioma from "../icons/Idioma";

import { useGlobalLanguage } from "../../store/global-language";
import { useEffect } from "react";

const Header = () => {
  const { language, setLanguage } = useGlobalLanguage((state) => state);

  useEffect(() => {
    setLanguage(localStorage.getItem("language") || "es");
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <>
      <button
        className={styles.button}
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
      >
        <Idioma className={styles.menu} />
      </button>
    </>
  );
};

export default Header;
