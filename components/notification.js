export function showNotification(title, options) {
  // Verificar si el navegador soporta notificaciones
  if (!("Notification" in window)) {
    console.error("Este navegador no soporta notificaciones");
    return;
  }

  // Pedir permiso para mostrar notificaciones
  Notification.requestPermission().then((permission) => {
    console.log(permission)
    if (permission === "granted") {
      // Mostrar la notificación
      new Notification(title, options);
      console.log(Notification)
    } else {
      console.warn("El usuario no ha permitido mostrar notificaciones");
    }
  });
}