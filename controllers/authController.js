let User = require("./../services/mongodb/models/user"),
  argon2 = require("argon2"),
  jwt = require("./../services/jwt/jwt"),
  sendingMail = require("./../services/mail/mail"),
  dataType = require("./../services/dataTypes/mongodb");

exports.register = async (req) => {
  try {
    const passwordHashed = await argon2.hash(req.body.password);

    // Creating a schema object of user
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.username,
      password: passwordHashed,
      role: req.body.role,
    });

    // Checking if user already exists
    let userExists = await User.findOne({ username: req.body.username });

    if (userExists) {
      throw "User already exists";
    }

    // Saving the user in record if it doesn't exist
    let userSave = await user.save();

    return {
      data: user,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    // Handling all the error
    return {
      message: "FAILED",
      data: null,
      error: error,
      statusCode: 400,
    };
  }
};

exports.login = async (req) => {
  try {
    let userRecord = await User.findOne({ username: req.body.username });

    if (!userRecord) {
      throw "Incorrect username or password";
    } else {
      const correctPassword = await argon2.verify(
        userRecord.password,
        req.body.password
      );
      if (!correctPassword) {
        throw new Error("Incorrect password");
      }
    }

    return {
      data: {
        user: {
          id: userRecord._id,
          username: userRecord.username,
          name: userRecord.name,
          email: userRecord.email,
          role: userRecord.role,
        },
        token: jwt.signJWT({
          id: userRecord._id,
          username: userRecord.username,
          role: userRecord.role,
        }),
      },
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    // Handling all the error
    return {
      message: "FAILED",
      data: null,
      error: error,
      statusCode: 401,
    };
  }
};

exports.authenticate = async (token) => {
  try {
    // let token = req.headers['authorization'];
    let decodedToken = await jwt.verify(token);

    return {
      data: decodedToken,
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    // Handling all the error
    return {
      message: "FAILED",
      data: null,
      error: error,
      statusCode: 400,
    };
  }
};

exports.verifyAccount = async (req) => {
  try {
    // Checking if user already exists
    let userExists = await User.findOne({ username: req.body.email });

    if (!userExists) {
      throw "User not found";
    }

    var myquery = { username: req.body.email };
    var newvalues = { $set: { isEmailVerified: true } };
    await User.updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
    });
    return {
      data: dbFilters.sanitizeUser(userExists),
      error: null,
      message: "SUCCESS",
      statusCode: 200,
    };
  } catch (err) {
    return {
      message: "FAILED",
      data: null,
      error: error,
      statusCode: 400,
    };
  }
};
