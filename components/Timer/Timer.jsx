import React, { useEffect } from "react";
import { totalBlocks, workTime, restTime } from "../consts";
import { useGlobalCounter } from "../../store/global-counter";
import { useGlobalTask } from "../../store/global-task";
import { TaskGenerator } from "../TaskGenerator/TaskGenerator";
import styles from "./Timer.module.css";
import { useGlobalHistory } from "../../store/global-history";
import { showNotification } from "../notification";
import { RestartIcon } from "../icons/Restart";
import { PauseIcon } from "../icons/Pause";
import { PlayIcon } from "../icons/Play";
import { StopIcon } from "../icons/Stop";
import { useGlobalLanguage } from "../../store/global-language";

export function Timer() {
  const {
    tiempoRestante,
    isRunning,
    block,
    completed,
    whichRound,
    setWhichRound,
    setTiempoRestante,
    setIsRunning,
    setIsBlock,
    setIsCompleted,
    setTimeLapse,
    timeLapse,
  } = useGlobalCounter((state) => state);

  const { currentTask, setCurrentTask } = useGlobalTask((state) => state);
  const { addEntry } = useGlobalHistory((state) => state);
  const language = useGlobalLanguage((state) => state.language);

  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;

  const handleClick = () => {
    if (currentTask) {
      setIsRunning(!isRunning);
    } else {
      alert(
        language === "es"
          ? "Debe introducir una actividad"
          : "Must enter a task"
      );
    }
  };

  const handleDeleteClick = () => {
    if (currentTask && timeLapse > 0) {
      const confirmacion = window.confirm(
        language === "es"
          ? "¿Estás seguro de cancelar la actividad actual?"
          : "Are you sure you want to cancel the current activity?"
      );
      if (confirmacion) {
        addEntry(currentTask, timeLapse);
        setIsRunning(false);
        setCurrentTask("");
        setTimeLapse(0);
        setTiempoRestante(25 * 60);
      }
    } else{
      alert(language === "es" ? "Debe iniciar una actividad" : "Must start a task");
    }
  };

  const handleRestart = () => {
    const confirmacion = window.confirm("¿Reiniciar el contador?");
    if (confirmacion) {
      setTimeLapse(0);
      setTiempoRestante(25 * 60);
      setIsCompleted(false);
      setIsBlock(-4);
    }
  };

  useEffect(() => {
    const tiempo = localStorage.getItem("tiempoRestante");
    const current = localStorage.getItem("currentTask");
    const block = localStorage.getItem("block");

    if (tiempo && current && block) {
      setIsBlock(JSON.parse(block));
      setCurrentTask(current);
      setTiempoRestante(parseInt(tiempo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("block", block);
    localStorage.setItem("tiempoRestante", tiempoRestante);
    localStorage.setItem("currentTask", currentTask);
  }, [tiempoRestante]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning) {
        if (tiempoRestante > 0) {
          setTiempoRestante(tiempoRestante - 1);
          setTimeLapse(timeLapse + 1);
        } else {
          showNotification(language === "es" ? "¡Tiempo!" : "Times up!", {
            body: language === "es" ? "Es tiempo de descanso" : "Is rest time",
          });
          setWhichRound();
          if (!whichRound) {
            setTiempoRestante(restTime);
            setIsRunning(false);
            setIsBlock(1);
          } else {
            setTiempoRestante(workTime);
            setIsRunning(false);
          }
          if (block === totalBlocks) {
            addEntry(currentTask, timeLapse);
            setIsCompleted();
          }
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    tiempoRestante,
    isRunning,
    language,
    whichRound,
    block,
    totalBlocks,
    setTiempoRestante,
    setTimeLapse,
    setIsRunning,
    setIsBlock,
    setIsCompleted,
    addEntry,
    currentTask,
    timeLapse,
    showNotification,
  ]);

  return (
    <main className={styles.container}>
      <TaskGenerator />

      <div>
        {completed ? (
          <p className={styles.completed}>
            {language === "es"
              ? "¡Técnica Pomodoro completada!"
              : "Technique Pomodoro completed"}
          </p>
        ) : (
          <p className={styles.cronometro}>{`${minutos}:${
            segundos < 10 ? "0" : ""
          }${segundos}`}</p>
        )}
      </div>
      {completed ? (
        <RestartIcon
          className={styles.restart}
          width="50"
          height="50"
          onClick={handleRestart}
        />
      ) : (
        <div className={styles.interaction}>
          <span onClick={handleClick}>
            {isRunning ? (
              <PauseIcon className={styles.buttonPlay} width="50" height="50" />
            ) : (
              <PlayIcon className={styles.buttonPlay} width="50" height="50" />
            )}
          </span>

          <span onClick={handleDeleteClick}>
            <StopIcon className={styles.stop} width="50" height="50" />
          </span>
        </div>
      )}

      <p className={styles.blocks}>
        {completed
          ? ""
          : language === "es"
          ? `Bloques completados ${block} / ${totalBlocks}`
          : `Blocks completed ${block} / ${totalBlocks}`}
      </p>
    </main>
  );
}
