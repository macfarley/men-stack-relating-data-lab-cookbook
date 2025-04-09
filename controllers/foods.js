const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const session = require('express-session');

//foods routes
// fetch all items
router.get('/:userId/foods', async (req, res) => {
    const userInDatabase = await User.findById(req.params.userId);
    if (!userInDatabase) {
            console.log('Error: User does not exist');
            res.redirect('/');
        } else {
            if(!userInDatabase.pantry) {
                userInDatabase.pantry = [];
            }
            res.render('foods/index.ejs', {user: userInDatabase, foods: userInDatabase.pantry });
        }
    });
// fetch a new item form
router.get('/new', (req, res) => {
    res.render('foods/new.ejs');
  });
// create a new item
router.post('/new', async (req, res) => {
    const userInDatabase = await User.findById(req.session.user._id);
        if (!userInDatabase) {
            console.log('Error: User does not exist');
            res.redirect('/');
        } else {
            userInDatabase.pantry.push(req.body);
            userInDatabase.save()
            res.redirect(`${userInDatabase._id}/foods`);
            };
        });
// delete an item
router.delete('/foods/:foodId', async (req, res) => {

    await User.updateOne(
        { _id: req.session.user._id },
        { $pull: { pantry: { _id: req.params.foodId } } }
      )
    .then(result => console.log('Item pulled:', result))
    .catch(err => console.error(err));
    res.redirect(`../${req.session.user._id}/foods`)
});
//pull up an item edit form
router.get('/:userId/foods/:itemId/edit', (req, res) => {
    res.render('foods/edit.ejs', {food: req.params.itemId})
})
//update an existing item
router.put('/:userId/foods/:itemId/edit', async (req, res) => {
    const newData = req.body;
    const userPantry = await User.findById(req.session.user._id);
    console.log("Form Submitted to update a Pantry Item")
    console.log(newData)
    //replace the pantry item information for this foodId with the newData
    await User.findOneAndUpdate({ _id: req.session.user._id, 'pantry._id': req.params.itemId}, { $set: { 'pantry.$': newData } }, {new: true})
    //show the index page for the pantry
    res.redirect(`/users/${req.session.user._id}/foods`)
    if(err) {
        console.log(err)
        res.redirect('/')
    }
})  

module.exports = router;