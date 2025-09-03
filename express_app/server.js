import express from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set('views', './views');        //specifiy directory
app.set('view engine', 'ejs');      // register ejs engine 

// Custom Middleware 
app.use((req, res, next) => {
  console.log(`[Custom Log] ${req.method} request to ${req.url}`);
  next();
});

app.use(express.static('./styles'));    // static files

// home routes
app.get('/', (req, res) => {
    // res.json('testing home page');
    res.render('home', { title: 'Home' });
});

// about routes
app.get('/about', (req, res) => {
    res.render('about', { title: 'about' });
})

// post routes for submit form in home page
app.post('/submit', (req, res) => {
    console.log('form submitted:', req.body);
    res.send('success!!! data received');
})

// route to specific users
app.get('/users/:username', (req, res) => {
    const { username } = req.params;
    res.send(`Hello, ${username}! this your profiles`);
})



app.listen(port, () => {
    console.log(`server runing in port : ${port}`);
})