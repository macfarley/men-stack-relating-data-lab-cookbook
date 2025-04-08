const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//foods routes
// fetch all items
router.get('/', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.render('foods/index.ejs', { foods: user.foods });
        }
    });
  });
// fetch a new item form
router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
  });
// create a new item
router.post('/', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/foods');
        } else {
            user.foods.push(req.body);
            user.save((err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/foods');
            });
        }
    });
});
// delete an item
router.delete('/:foodId', (req, res) => {
    User.findById(req.user._id, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/foods');
        } else {
            user.foods.id(req.params.foodId).remove();
            user.save((err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/foods');
            });
        }
    });
});

module.exports = router;