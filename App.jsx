import { Timer } from "./components/Timer/Timer";
import styles from "./App.module.css";
import { Clock } from "./components/Clock/Clock";
import { History } from "./components/History/History";
import Header from "./components/Header/Header";




export function App() {
  return (
  
    <div className={styles.gridContainer }>
      <Header />
      <Timer />
      <Clock />
      <History />
    </div>

  );
}
export default App;
