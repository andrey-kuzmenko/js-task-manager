var express = require('express');
var util = require('util');
var router = express.Router();
var bcrypt = require('bcryptjs');

let User = require('../models/user');

router.post('/register', function (req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirm = req.body.confirm;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm', 'Passwords do not match').equals(password);

    req.getValidationResult().then(function(result) {
        if(!result.isEmpty()){
            res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        } else {
            var newUser = new User({
                name:name,
                email:email,
                username:username,
                password:password
            });

            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password, salt, function(err, hash){
                    if(err){
                        console.log(err);
                        return;
                    }
                    newUser.password = hash;
                    newUser.save(function(err){
                        if(err){
                            res.send(err);
                        } else {
                            res.json(newUser);
                        }
                    });
                });
            });
        }
    });
});


module.exports = router;