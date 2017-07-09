var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');


router.get('/register', function (req, resp, next) {
    resp.render('register');
});

router.post('/register', function (req, resp, next) {
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

    var errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors:errors
        });
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
                        console.log(err);
                    } else {
                        req.flash('success','You are now registered and can log in');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});


module.exports = router;