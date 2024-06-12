import { useGlobalHistory } from "../../store/global-history";
import styles from "./History.module.css";
import { useGlobalLanguage } from "../../store/global-language";
import { useEffect } from "react";

export const History = () => {
  const { language } = useGlobalLanguage((state) => state);
  const { history, addEntry, clear } = useGlobalHistory((state) => state);

  useEffect(() => {
    const historial = JSON.parse(localStorage.getItem("history"));
    if (historial) {
      historial.map((entry) =>
        !historial.includes(entry.task && entry.time)
          ? addEntry(entry.task, entry.time)
          : null
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleCleanHistory = () => {
    clear();
  };

  return (
    <section className={styles.history}>
      <div className={styles.container}>
        <div className={styles.containerH}>
          <h3>{language === "es" ? "Historial" : "History"}</h3>
          {history.length > 0 && (
            <button
              onClick={handleCleanHistory}
              className={styles.cleanHistory}
            >
              {language === "es" ? "Limpiar historial" : "Clear history"}
            </button>
          )}

          <ul className={styles.historyList}>
            {history.map((entry, index) => (
              <li key={index}>
                <p className={styles.task}>
                  {language === "es" ? "Tarea:" : "Task:"} {entry.task}
                </p>
                <p className={styles.time}>
                  {language === "es" ? "Tiempo:" : "Time:"}{" "}
                  {`${Math.floor(entry.time / 60)}:${
                    entry.time % 60 < 10 ? "0" : ""
                  }${entry.time % 60}`}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
