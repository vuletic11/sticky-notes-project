// configure routing
const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrlNote = require('../controllers/note.controller')

const jwtHelper = require('../config/jwtHelper');

//probaj veliko R kod router dole ako ne radi
//user
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/note', ctrlNote.read);
//router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

//note
router
    .post('/note/create', ctrlNote.create)
    .get('/note/read/:title', ctrlNote.read)
    .get('/note/read/:title/:content', ctrlNote.read)
    .put('/note/update/:id', ctrlNote.update)
    .delete('/note/delete/:id', ctrlNote.delete);

module.exports = router;

