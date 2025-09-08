import express from 'express';

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.render('home', { title: 'Home'});
    })
    
// post routes for submit form in home page
router
    .route('/submit')
    .post((req, res) => {
    console.log('form submitted:', req.body);
    res.send('success!!! data received');
})

export default router;  