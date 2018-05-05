const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/login', () => {
  console.log('connected');
});

app.post('/register', (req,res) => {
    const newUser = new User();

    newUser.email = req.body.email;
    newUser.password = req.body.password;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, _hash) => {
            if (err) return err;
            newUser.password = _hash;

            newUser.save().then(userSaved => {
                res.send('User saved');
            }).catch(err => {
                res.send('user was not saved' + err)
            });
        });
    });
});

app.post('/login', (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, match) => {
                if (err) return err;
                
                if (match) {
                    res.send('user was able to login')
                } else {
                    res.send('fail')
                }
            })
        }
    })
});
app.listen(4111, () => {
  console.log('listening on port 4111');
});
