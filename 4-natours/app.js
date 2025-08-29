const express = require('express');

const { config } = require('../1-intro-node-js/config');
const routerAPI = require("./routes")

const app = express()

routerAPI(app);


app.listen(config.port, () => {
    console.log(`App running on http://localhost:${config.port}`);
})