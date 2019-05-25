const firebase = require('firebase');

require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyBrlxlOHWLtAxfKJwIp1lDwqp9RD44x-0c',
  authDomain: 'revents-2c2ee.firebaseapp.com',
  databaseURL: 'https://revents-2c2ee.firebaseio.com',
  projectId: 'revents-2c2ee',
  storageBucket: 'revents-2c2ee.appspot.com',
  messagingSenderId: '218617380649',
  appId: '1:218617380649:web:c1c7a50ffe8e5eb5'
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

function getUsersFromFirestore() {
  var usersUids = [
    'qjItQOTgG2Sx7xW9nL1gFmdcP2q1',
    'qnyg6dyTBjTIZkLFEcmnOF80nSG2',
    'UPmONws8Z4ZGmIu66UM3jFOFmqF2'
  ];
  let users = [];
  usersUids.forEach(userUid => {
    let userObj;
    let userDocRef = firestore.doc(`users/${userUid}`);
    userDocRef.get().then(doc => {
      if (doc.exists) {
        userObj = { ...doc.data(), id: doc.id };
        console.log(userObj)
        users.push(userObj);
      }
    });

    console.log(users);
  });

  return Promise.resolve(users);
}

function createNewEvents(users) {
  var events = [
    {
      title: 'Event 1 - Past',
      description: 'Event 1',
      category: 'food',
      city: 'London, UK',
      venue: 'The Wolseley, Piccadilly, London, UK',
      venueLatLng: {
        lat: 51.5073915,
        lng: -0.14090409999994336
      },
      hostUid: users[0].id,
      hostPhotoUrl: users[0].photoURL,
      hostedBy: users[0].displayName
    },
    {
      title: 'Event 2 - Past',
      description: 'Event 2',
      category: 'food',
      city: 'London, UK',
      venue: 'The Wolseley, Piccadilly, London, UK',
      venueLatLng: {
        lat: 51.5073915,
        lng: -0.14090409999994336
      },
      hostUid: users[0].id,
      hostPhotoUrl: users[0].photoURL,
      hostedBy: users[0].displayName
    }
  ];

  events.forEach(evt => {
    firestore
      .collection('eventsTest')
      .add(evt)
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(err => {
        console.error('Error adding document: ', err);
      });
  });
}

getUsersFromFirestore().then(users => {
  console.log(users);
  createNewEvents().catch(err => console.log(err));
});
