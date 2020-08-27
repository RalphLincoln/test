const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();



// HANDLING MY MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// SETTING CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, PATCH, GET, POST, DELETE")
        return res.status(200).json({});
    }
    next();
})


app.get('/products', (req, res, next) => {
    res.status(200).json({
        message: 'Handling request to get products'
    })
})

app.post('/products', (req, res, next) => {
    console.log(req.body)
    res.status(200).json({
        message: 'Handling request to post products'
    })
})



// HANDLING ERRORS FOR MISPLACED ROUTES
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


// HANDLING ANY OTHER ERRORS
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


const port = process.env.PORT || 3001;


app.listen(port, (req, res) => {
    console.log(`Server on port ${port}`);
});

