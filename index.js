const express = require('express');
require('./connection/connection');
const authRouter = require('./routes/auth');
const listRouter = require('./routes/list');
const  cors = require('cors');
const app = express()

const PORT = 3000
app.listen(PORT, function(req, res){
    console.log(`Server Started at port ${PORT}`)
})
app.use(express.json());
app.use(cors());
app.use("/api/v1" , authRouter);
app.use("/api/v2", listRouter);

app.get("/" , (request , response) => {
    response.send("Hiii")
})