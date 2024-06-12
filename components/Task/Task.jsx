import styles from "./Task.module.css";

export function Task({ currentTask }) {
  return (
    <>
      <h3 className={currentTask ? styles.taskText : ""}>{currentTask}</h3>
    </>
  );
}
