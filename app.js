const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const authJwt = require('./utils/jwt');
const errorHandler = require('./utils/error-handler');


app.use(cors());
app.options('*', cors())

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routes Import
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

//Routes Use
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

const PORT = process.env.PORT || 3000;
//Database Connection
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: `${process.env.DB_NAME}`
})
.then(()=>{
    console.log('Database was connected successfully!')
})
.catch((err)=> {
    console.log(err);
})

//Server Runnnig
app.listen(PORT, ()=>{
    console.log(`server is up and running on http://localhost:${process.env.PORT}`);
})