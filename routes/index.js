var express = require("express");
authMiddleware = require("../services/middlewares/auth")
userController = require("../controllers/userController");

var router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        
        res.status(code).send({
            message : "THE MAGIC HAPPENS HERE",
            data : null,
            error : null,
            status : 1
        });
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
})

router.post("/getUserById", authMiddleware, async (req, res) => {
    try {
        let user = await userController.getUserById(req);
        let code = user.statusCode;
        delete user.statusCode;
        res.status(code).send(user);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
})

router.post("/addUser", authMiddleware, async (req, res) => {
    try {
        let users = await userController.addUser(req);
        let code = users.statusCode;
        delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
})

router.post("/updateUser", authMiddleware, async (req, res) => {
    try {
        let users = await userController.updateUser(req);
        let code = users.statusCode;
        delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
})

router.post("/delete", authMiddleware, async (req, res) => {
    try {
        let users = await userController.removeUser(req);
        let code = users.statusCode;
        delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
})

router.post("/block", authMiddleware, async(req, res)=>{
    try {
        let users = await userController.banUser(req);
        let code = users.statusCode;
        delete users.statusCode;
        res.status(code).send(users);
    } catch (error) {
        res.status(500).send({
            message: "FAILED",
            data: null,
            error: error,
            status: 0
        });
    }
})


module.exports = router;