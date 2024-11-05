// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
  
/*
// Simple notification functionality
document.getElementById('notify-btn').addEventListener('click', () => {
  if (Notification.permission === 'granted') {
    new Notification('Hello! This is a notification from your PWA!');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Hello! This is a notification from your PWA!');
      }
    });
  }
});
*/
  