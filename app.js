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

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my blog'
    })

    blog.save()
        .then((result) =>{
            res.send(result);
        })
        .catch((error) => console.log(error));
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((error) => console.log(error));
})

app.get('/single-blog', (req, res) => {
    Blog.findById("60c353a83619f491333d6c76")
        .then((result) => {
            res.send(result);
        })
        .catch((error) => console.log(error));
})

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
    res.render('index', {title: 'Home', blogs});
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

app.get('/blogs/create', (req, res) => {
    res.render('create', {title: 'Create Blog'})
})

app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})