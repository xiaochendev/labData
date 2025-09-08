// import
import express from 'express';
import ejs from 'ejs';
import homeRoutes from './routes/homeRoutes.mjs';
import aboutRoutes from './routes/aboutRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';
import commentRoutes from './routes/commentRoutes.mjs';

import { error } from './utilities/error.mjs';

// set up
const app = express();
const port = 3000;

app.set('views', './views');        //specifiy directory
app.set('view engine', 'ejs');     // register ejs engine 

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cutomized middlewares
app.use((req, res, next) => {
  console.log(`[Custom Log] ${req.method} request to ${req.url}`);
  next();
});

// static style
app.use(express.static('./styles'));

// routes
app.use(homeRoutes);
app.use('/about', aboutRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);



// Global Err Handling
app.use((req, res) => {
  next(error(404, "Resource Not Found"));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ msg: `❌ Error - ${err.message}` });
});

// listener
app.listen(port, () => {
    console.log(`Server running in port: ${port}`);
})