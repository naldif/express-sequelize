const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const CategoriesRouter = require('./routes/categories')
const morgan = require('morgan')

dotenv.config();

//Middleware
app.use(express.json())
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString()
//     next()
// })
app.use(morgan("dev"))
app.use(cors())

//Routing
app.use('/api/v1/categories', CategoriesRouter);

//Server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
})