const express = require('express');
const morgan  = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dbURI = 'mongodb+srv://samchillcott:test1234@cluster0.pvxlr.mongodb.net/node-tuts?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then ((result) => app.listen(3000))
    .catch ((error) => console.log(error));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('./blogs');
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

// Blog Routes

app.get('/blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((error) => console.log(error));
})


app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create Blog'})
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})