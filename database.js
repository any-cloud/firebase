import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://sptball-7865e.firebaseio.com'
});

