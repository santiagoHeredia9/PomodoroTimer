import { Task } from "../Task/Task";
import { useGlobalTask } from "../../store/global-task.js";
import { useGlobalCounter } from "../../store/global-counter";
import styles from "./TaskGenerator.module.css";
import { useEffect, useState } from "react";
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
    setAppear(false);
    setCurrentTask("");
    setData("");
    setTiempoRestante(workTime);
    setIsRunning(false);
    setTimeLapse(0);
  };

  return (
    <section className={styles.container}>
      <div className={styles.add}>
        <div className={styles.task}>
          <Task currentTask={currentTask} setCurrentTask={setCurrentTask} />
        </div>
        <div className={`${styles.addTask} ${appear ? styles.appear : ""}`}>
          <button onClick={() => setAppear(!appear)}>
            {language === "es" ? "Añadir tarea +" : "Add task +"}
          </button>
        </div>
        <div className={`${styles.newTask} ${appear ? styles.appearNew : ""}`}>
          <input
            type="text"
            onChange={handleChange}
            value={data}
            placeholder={
              language === "es" ? "Escribe la tarea" : "Write the task"
            }
            className={styles.input}
          ></input>
          <div className={styles.buttons}>
            <button className={styles.buttonAdd} onClick={handleClick}>
              Add
            </button>
            {!currentTask ? (
              <button
                className={styles.buttonCancel}
                onClick={() => setAppear(false)}
              >
                Cancel
              </button>
            ) : (
              <button className={styles.buttonRemove} onClick={handleDelete}>
                {language === "es" ? "Eliminar" : "Delete"}
                <Remove className={styles.rem} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
