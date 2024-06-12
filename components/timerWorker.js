let tiempoRestante = 25 * 60;
let intervalId = null;

function startTimer() {
  if (!intervalId) {
    intervalId = setInterval(() => {
      if (tiempoRestante > 0) {
        tiempoRestante--;
        postMessage({ tiempoRestante });
      } else {
        clearInterval(intervalId);
        intervalId = null;
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

onmessage = function (e) {
  if (e.data === "start") {
    startTimer();
  } else if (e.data === "stop") {
    stopTimer();
  }
};
