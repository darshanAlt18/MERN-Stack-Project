require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/router');
const connectDB = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,PATCH",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);
app.use(errorMiddleware)

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Sever is Running at Port ${PORT}`);
    });
});

