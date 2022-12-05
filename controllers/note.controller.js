//require('./models/notes.model')

const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Note = mongoose.model('Note');

// module.exports.create = (req,res,next)=>{
//     var note = new Note();
//     note.title = req.body.title;
//     note.content = req.body.content;
//     note.created = req.body.created;
//     note.updated = req.body.updated;
//     note.save((err,doc) =>{
//         if(!err)
//             res.send(doc);
//         else
//         return next(err);
//     }
//     )
// }

module.exports.create= (req, res) =>{
    var note = new Note(req.body);

    note.save(function (err, saved) {
        if (err) {
            res.status(400);
            res.json({ error: "Error creating " + note.toString(), message: err.toString() });
        } else {
            res.status(201);
            res.json(saved);
        }
    });
};
module.exports.read =(req, res) =>{
    Note.find(req.params, function (err, found) {
        if (err) {
            res.status(400);
            res.json({ error: "Error finding " + found.toString(), message: err.toString() });
        } else {
            res.status(200);
            res.json(found);
        }
    });
};
module.exports.update = (req, res)=> {
    var query = { _id: req.params.id };

    Note.findOneAndUpdate(query, req.body, { new: true },function (err, found) {
        if (err) {
            res.status(400);
            res.json({ error: "Error updating " + found.toString(), message: err.toString() });
        } else {
            res.status(200);
            res.json(found);
        }
    });
};

module.exports.delete = (req, res) =>{
    var query = { _id: req.params.id };

    Note.remove(query, function (err, found) {
        if (err) {
            res.status(400);
            res.json({ error: "Error deleting " + found.toString(), message: err.toString() });
        } else {
            res.status(200);
            res.end();
        }
    });
};


//////////////////////////////////////////////////////////////////////////////////
// Controller.create = function (req, res) {
//     var note = new Note(req.body);

//     note.save(function (err, saved) {
//         if (err) {
//             res.status(400);
//             res.json({ error: "Error creating " + note.toString(), message: err.toString() });
//         } else {
//             res.status(201);
//             res.json(saved);
//         }
//     });
// };

// Controller.read = function (req, res) {
//     Note.find(req.params, function (err, found) {
//         if (err) {
//             res.status(400);
//             res.json({ error: "Error finding " + found.toString(), message: err.toString() });
//         } else {
//             res.status(200);
//             res.json(found);
//         }
//     });
// };

// Controller.update = function (req, res) {
//     var query = { _id: req.params.id };

//     Note.findOneAndUpdate(query, req.body, { new: true },function (err, found) {
//         if (err) {
//             res.status(400);
//             res.json({ error: "Error updating " + found.toString(), message: err.toString() });
//         } else {
//             res.status(200);
//             res.json(found);
//         }
//     });
// };

// Controller.delete = function (req, res) {
//     var query = { _id: req.params.id };

//     Note.remove(query, function (err, found) {
//         if (err) {
//             res.status(400);
//             res.json({ error: "Error deleting " + found.toString(), message: err.toString() });
//         } else {
//             res.status(200);
//             res.end();
//         }
//     });
// };

//module.exports = Controller;