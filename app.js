const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// HANDLING MY MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/groceries', (req, res, next) => {
    const product = {
        name: req.body.name,
        description: req.body.description
    }
    res.status(201).json({
        message: 'Product created'
    })

    console.log(product);
});



const port = process.env.PORT || 3001;


app.listen(port, (req, res) => {
    console.log(`Server on port ${port}`);
});