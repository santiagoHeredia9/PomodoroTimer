import styles from "./Clock.module.css";
import { useState, useEffect } from "react";
import { currentHours } from "../../time";

export const Clock = () => {
  const [time, setTime] = useState("");
  let classTime = "";
  if (currentHours < 14) {
    classTime = styles.timeDay;
  } else if (currentHours < 20) {
    classTime = styles.timeEvening;
  } else {
    classTime = styles.timeNight;
  }

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

      
      if (hours >= 21) {
        hours = hours < 10 ? "0" + hours : hours;
        setTime(`${hours}:${formattedMinutes}`);
      } else {
        hours = hours % 12 || 12; 
        setTime(`${hours}:${formattedMinutes} ${ampm}`);
      }
    };

   
    const intervalId = setInterval(updateTime, 1000);

   
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={classTime}>
      <p className={styles.hour}>{time}</p>
    </section>
  );
};
