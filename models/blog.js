const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = newSchema({
    title: {
        type: 'string',
        required: true
    },
    snippet: {
        type: 'string',
        required: true
    },
    body: {
        type: 'string',
        required: true
    }
},  { timestamp: true })

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;