import { Task } from "../Task/Task";
import { useGlobalTask } from "../../store/global-task.js";
import { useGlobalCounter } from "../../store/global-counter";
import styles from "./TaskGenerator.module.css";
import { useEffect, useState } from "react";
import Plus from "../icons/Plus.jsx";
import Remove from "../icons/Remove.jsx";
import { workTime } from "../consts.js";
import { useGlobalLanguage } from "../../store/global-language.js";

export function TaskGenerator() {
  const [appear, setAppear] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("appear"));
    if (local === true) {
      setAppear(true);
    } else {
      setAppear(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appear", JSON.stringify(appear));
  }, [appear]);

  const { data, currentTask, setData, setCurrentTask } = useGlobalTask(
    (state) => state
  );
  const { setTiempoRestante, setIsRunning, setTimeLapse } = useGlobalCounter(
    (state) => state
  );

  const { language } = useGlobalLanguage((state) => state);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  const handleClick = () => {
    if (data) {
      setCurrentTask(data);
      setData("");
    } else {
      alert("Debe introducir una actividad válida");
    }
  };

  const handleDelete = () => {
    setCurrentTask("");
    setData("");
    setTiempoRestante(workTime);
    setIsRunning(false);
    setTimeLapse(0);
  };

  return (
    <section className={styles.container}>
      <div className={styles.add}>
        {currentTask ? (
          <input
            className={`${styles.input}`}
            type="text"
            disabled
            onChange={handleChange}
            value={data}
          ></input>
        ) : (
          <input
            type="text"
            onChange={handleChange}
            value={data}
            placeholder={
              language === "es" ? "Escribe la tarea" : "Write the task"
            }
            className={`${styles.input} ${appear ? styles.appear : ""}`}
          ></input>
        )}

        {currentTask ? (
          <button onClick={handleDelete} className={styles.removeButton}>
            {language === "es" ? "Eliminar tarea" : "Delete task"}{" "}
            <Remove className={styles.remove} />
          </button>
        ) : (
          <button
            onClick={handleClick}
            className={`${styles.button} ${appear ? styles.appearButton : ""}`}
          >
            {appear && <Plus className={styles.plus} />}
          </button>
        )}
        <button className={`${styles.hide} ${appear ? styles.hideButton : ""}`} onClick={() => setAppear(!appear)}>
          {language === "es" ? "Añadir tarea" : "Add task"}{" "}
          <Plus className={styles.plus} />
        </button>
     
      </div>

      <div className={styles.task}>
        <Task currentTask={currentTask} setCurrentTask={setCurrentTask} />
      </div>
    </section>
  );
}
