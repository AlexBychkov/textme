// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
// importScripts('/__/firebase/8.2.0/firebase-app.js');
// importScripts('/__/firebase/8.2.0/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

// const messaging = firebase.messaging();

// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyCV18O6EkYzeNNLmyyStZa-TM1Err5YM5A',
  authDomain: 'textme-dev.firebaseapp.com',
  databaseURL: 'https://textme-dev.firebaseio.com',
  projectId: 'textme-dev',
  storageBucket: 'textme-dev.appspot.com',
  messagingSenderId: '931156542953',
  appId: '1:931156542953:web:66225807e0781953dcb778',
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START on_background_message]
/*messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});*/
// [END on_background_message]
