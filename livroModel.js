const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('livro', LivroSchema);
