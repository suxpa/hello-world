var express = require('express');
var router = express.Router();
var CLIENT_ID = '318809459837-1qp4bc11ldlf7jjoqjoqndsso7329mf3.apps.googleusercontent.com';
var {OAuth2Client} = require('google-auth-library');
var client = new OAuth2Client(CLIENT_ID);

var sessions = {};
var contactus=[];
var hotelreview=[];
var hotelbooking=[];
var googleusers=[];
var users=[{"email":"default@gmail.com","surname":"default","givenname":"default","username":"test","dob":"02/07/1991","password":"test"}];
/*Google user sign in*/
router.post('/googleuser.json', function(req, res) {
    
    var user = null;
    
    console.log(JSON.stringify(req.body));
    /*
    // If login details present, attempt login
    if(req.body.username !== undefined && req.body.password !== undefined){
        console.log("Username + Password received");
        
        for (var i=0; i<users.length; i++){
         
            if(users[i].username === req.body.username && users[i].password === req.body.password){
                sessions[req.session.id] = req.body.username;
                user = req.body.username;
            }
            
        }
        res.json({username:user});
     */   
    // If google login token present
     if(req.body.idtoken !== undefined) {
        console.log("Google Token Recieved");
        
        // 
        async function verify() {
            // Verify google ID token
            const ticket = await client.verifyIdToken({
                idToken: req.body.idtoken,
                audience: CLIENT_ID
            });
            
            // Get user data from token
            const payload = ticket.getPayload();
            
            // Get user's Google ID
            const userid = payload['sub'];
            const email = payload['email'];
            sessions[req.session.id] = email;
            
            res.json({username:email});
        }
        verify().catch(console.error);
        

    // If no login details, but valid session
    } else if(sessions[req.session.id] !== undefined) {
        console.log("Valid session");
        user = sessions[req.session.id];
        res.json({username:user});
    }
    
});

/*sign in */
router.post('/signin', function(req, res) {
	var user = null;
	var flag="bad";
    
    console.log(JSON.stringify(req.body));
    
    // If login details present, attempt login
    if(req.body.username !== undefined && req.body.password !== undefined){
        console.log("Username + Password received");
        
        for (var i=0; i<users.length; i++){
         
            if(users[i].username === req.body.username && users[i].password === req.body.password){
                sessions[req.session.id] = req.body.username;
                user = req.body.username;
                flag="good";
            }
           
        }
        res.json({username:user,status:flag});
     }
});
/*Contact us */
router.post('/contactus', function(req, res) {
	contactus.push(req.body);
	console.log(req.body);

});
/*hotel review*/
router.post('/hotelreview', function(req, res) {
	hotelreview.push(req.body);
	console.log(req.body);

});
/*hotel booking*/
router.post('/booking', function(req, res) {
	hotelbooking.push(req.body);
	console.log(req.body);

});
/*sign up */
router.post('/signup', function(req, res) {
	var user;
	var flag="good";
   if(req.body.username !== undefined && req.body.password !== undefined&& req.body.givenname !== undefined&& req.body.surname !== undefined&& req.body.dob !== undefined&& req.body.email !== undefined){
   		 user = req.body.username;
        for (var i=0; i<users.length; i++){
         	//new user
            if(users[i].username != req.body.username){
          
                flag="good";
            }
            else{ //user existed
            		flag="bad";
            	}
        }
        if(flag==="good"){        
              sessions[req.session.id] = req.body.username;
                users.push(req.body);
        }
        
        console.log(req.body);
   
        console.log(users);
        
  }      res.json({username:user,status:flag});

});
/*get user name*/
router.get('/getusername', function(req, res) {

        if(sessions[req.session.id] !== undefined)
        	res.json({username:sessions[req.session.id]});
        else
        	res.json({username:"visitor"});
     
});
module.exports = router;
