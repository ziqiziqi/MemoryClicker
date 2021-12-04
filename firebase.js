// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCVybN6w8UMjFq9tgKwLk8E0Op85XbKuY0",
  authDomain: "memory-clicker.firebaseapp.com",
  databaseURL: "https://memory-clicker-default-rtdb.firebaseio.com",
  projectId: "memory-clicker",
  storageBucket: "memory-clicker.appspot.com",
  messagingSenderId: "691027748362",
  appId: "1:691027748362:web:ec5cea11014503420f61f3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

chrome.runtime.onMessage.addListener((msg,sender,response) => {

  if(msg.command == 'memories..'){
    
  }

})
