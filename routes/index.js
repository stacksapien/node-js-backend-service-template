var express = require("express");

var router = express.Router();

router.get("/", async (req, res) => {
    try {
        
        res.status(200).send({
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

module.exports = router;