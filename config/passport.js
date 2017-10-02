var GoogleStrategy = require('passport-google-oauth20').Strategy;
var mongoose = require('mongoose');
var keys = require('./keys');

// load user model

var googleUser = mongoose.model('googleUsers');

module.exports = function(passport){
    passport.use(
        new GoogleStrategy({
            
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL:'/auth/google/callback',
            proxy: true
            
        }, (accessToken, refreshToken, profile, done)=>{
            
            //console.log(accessToken);
            //console.log(profile);
            
            var googleImage = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
            
            var newGoogleUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: googleImage
            }
            
            // Check for existing user
            
            googleUser.findOne({
                googleID: profile.id
            }).then(user => {
                
                if(user){
                    done(null, googleUser);
                }else{
                    new googleUser(newGoogleUser)
                        .save()
                    .then(googleUser => done(null, googleUser));
                }
            })
            
        })
    )
}