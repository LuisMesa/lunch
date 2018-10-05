const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addPlace = functions.https.onRequest((req, res) => {
  const {team_id, text} = req.body;
  return admin.database().ref(`/teams/${team_id}/places`).push({
    name: text
  }).then(() => {
    return res.sendStatus(201);
  });
});

exports.suggestPlaces = functions.https.onRequest((req, res) => {
  const {team_id} = req.body;
  getPlacesByTeam(team_id).then((places) => {
    const selectedPlace = getRandomPropertyFromObject(places);
    return res.json({
      text: buildMessageWithPlace(selectedPlace)
    });
  }, (error) => {
    console.log(error);
    return res.sendStatus(500);
  });
});

exports.slackEndPoint = functions.https.onRequest((req, res) => {
  const {text} = req.body;
  if (text) {

  } else {

  }
});

const getPlacesByTeam = (teamId) => {
  return admin.database().ref(`/teams/${teamId}/places`).once('value').then((snapshot) => {
    return snapshot.val();
  });
};

const getRandomPropertyFromObject = (object) => {
  const keys = Object.keys(object);
  return object[keys[ keys.length * Math.random() << 0]];
};

const buildMessageWithPlace = (place) => {
  return `You should eat today at ${place.name}.`;
};

const storeTemporalData = (data) => {
  admin.database().ref('/temp').push({data})
};
