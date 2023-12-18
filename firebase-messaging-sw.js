importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js");

//Using singleton breaks instantiating messaging()
 //App firebase = FirebaseWeb.instance.app;

firebase.initializeApp({
    apiKey: "AIzaSyCvurO-Ty2RyYJfgl6lLsubwxtG1Z6NKHs",
    authDomain: "niyog-android-app.firebaseapp.com",
    projectId: "niyog-android-app",
    storageBucket: "niyog-android-app.appspot.com",
    messagingSenderId: "628337950083",
    appId: "1:628337950083:web:30e0fad48764961c924ab6",
    measurementId: "G-WW8CBC2LYV"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});