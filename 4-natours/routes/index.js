const { Router } = require("express");


const routerAPI = app => {
    const router = Router()
    
    app.get('/', (req, res) => {
        res.json({ message: 'Jala la app master' })
    })
    
    app.use("/api/v1/", router);

}

module.exports = routerAPI;
