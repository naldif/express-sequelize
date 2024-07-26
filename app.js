const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')
const CategoriesRouter = require('./routes/categories')
const AuthRouter = require('./routes/AuthRoutes')
const productRouter = require('./routes/productRouter')
const morgan = require('morgan')
const cookieParse = require('cookie-parser')
const bodyParser = require('body-parser')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')
const path = require('path')

dotenv.config();

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cookieParse())
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString()
//     next()
// })
// app.use(morgan("dev"))
app.use(cors())

app.use('/public/uploads', express.static(path.join(__dirname + '/public/uploads')))

//Routing
app.use('/api/v1/categories', CategoriesRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/product', productRouter);

app.use(notFound)
app.use(errorHandler)

//Server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
})