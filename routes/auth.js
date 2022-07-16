var express = require("express"),
  authController = require("./../controllers/authController"),
  authMiddleware = require("./../services/middlewares/auth");
var router = express.Router();
var ms = require("ms");
var TIME_OUT_TIME = "30m";

// SNIPPET TO INCREASE REQUEST TIME OUT
function setConnectionTimeout(time) {
  var delay = typeof time === "string" ? ms(time) : Number(time || 5000);

  return function (req, res, next) {
    res.connection.setTimeout(delay);
    next();
  };
}

router.post(
  "/register",
  setConnectionTimeout(`${TIME_OUT_TIME}`),
  async (req, res) => {
    try {
      let userRegister = await authController.register(req);
      let code = userRegister.statusCode;

      delete userRegister.statusCode;

      res.status(code).send(userRegister);
    } catch (error) {
      res.status(500).send({
        message: "FAILED",
        data: null,
        error: error,
      });
    }
  }
);

router.post(
    "/login",
    setConnectionTimeout(`${TIME_OUT_TIME}`),
    async (req, res) => {
      try {
        let userLogin = await authController.login(req);
        let code = userLogin.statusCode;
  
        delete userLogin.statusCode;
  
        res.status(code).send(userLogin);
      } catch (error) {
        res.status(500).send({
          message: "FAILED",
          data: null,
          error: error,
        });
      }
    }
  );

  router.get(
    "/authenticate",
    setConnectionTimeout(`${TIME_OUT_TIME}`),
    async (req, res) => {
      try {
        
        let token = req.headers['authorization'];
        let userAuthenticated = await authController.authenticate(token);
        let code = userAuthenticated.statusCode;
  
        delete userAuthenticated.statusCode;
  
        res.status(code).send(userAuthenticated);
      } catch (error) {
        res.status(500).send({
          message: "FAILED",
          data: null,
          error: error,
        });
      }
    }
  );


/** VERIFICATION MAIL ROUTE */
router.post(
  "/verificationAccount",
  setConnectionTimeout(`${TIME_OUT_TIME}`),
  async (req, res) => {
    try {
      let updateUser = await authController.verifyAccount(req);
      let code = updateUser.statusCode;
      res.status(code).send(updateUser);
    } catch (error) {
      res.status(500).send({
        message: "FAILED",
        data: null,
        error: error,
      });
    }
  }
);

/** ROUTE FOR ADD PLAN */
router.post('/insertPlan',setConnectionTimeout(`${TIME_OUT_TIME}`),
  async (req, res) => {
    try {
      let addPlan = await authController.addPlan(req);
      let code = addPlan.statusCode;
      res.status(code).send(addPlan);
    } catch (error) {
      res.status(500).send({
        message: "FAILED",
        data: null,
        error: error,
      });
    }
  } 
)

/** ROUTE FOR ADDING MAIN ADMIN  */
router.post('/insertAdmin',setConnectionTimeout(`${TIME_OUT_TIME}`),  async (req, res) => {
    try {
      let addMainAdmin = await authController.addMainAdmin(req);
      let code = addMainAdmin.statusCode;
      res.status(code).send(addMainAdmin);
    } catch (error) {
      res.status(500).send({
        message: "FAILED",
        data: null,
        error: error,
      });
    }
  } 
)

module.exports = router;
