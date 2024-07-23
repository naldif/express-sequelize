const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const CategoriesRouter = require('./routes/categories')
const AuthRouter = require('./routes/AuthRoutes')
const morgan = require('morgan')
const bodyParser = require('body-parser')

dotenv.config();

//Middleware
app.use(express.json())
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString()
//     next()
// })
// app.use(morgan("dev"))
app.use(cors())
//use body parser
app.use(bodyParser.urlencoded({ extended: true }))

//Routing
app.use('/api/v1/categories', CategoriesRouter);
app.use('/api/v1/auth', AuthRouter);

//Server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
})