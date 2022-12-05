const mongoose = require('mongoose');
//var Schema = mongoose.Schema;

// defining a schema
var noteSchema = new mongoose.Schema({
    title: String,
    content: { type: String, required: true },
    created: Date,
    updated: Date
});

//var Note = mongoose.model('Note', noteSchema, notes);

//creating a model
mongoose.model('Note', noteSchema);

//exporting it to other modules
//module.exports = Note;

//Methods
