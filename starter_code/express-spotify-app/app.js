const express = require('express');
const app = express();
const hbs = require('hbs');
const path=require('path');
const bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var SpotifyWebApi = require('spotify-web-api-node');

// Remember to paste your credentials here
var clientId = 'b5748d97a2b347e5ac981fa1e90f78ef',
    clientSecret = 'f398d19e798441caabfa76e65e46ba0c';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

app.listen(3000);

app.get('/', function (req,res){
  res.render('index')
});

var artist={name:''};

app.post('/artist', function (req, res) {
    console.log("artist", req.body)
    artist.name=req.body.name
    res.render('index')
  }
);

spotifyApi.searchArtists(q=artist)
    .then(data => {
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch(err => {
      // ----> 'HERE WE CAPTURE THE ERROR'
    })