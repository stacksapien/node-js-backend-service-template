
let User = require("./../services/mongodb/models/user"),
    dataTypes = require("./../services/dataTypes/mongodb"),
    argon2 = require('argon2')

exports.getUsers = async (req) => {
    try {
        let users = await User.aggregate([{
            $match: {
                addedBy: {
                    $eq: dataTypes.ObjectId(req.decodedToken.userId)
                },
            },
        }
        ]).sort({
            createdAt: "descending"
        })
        return {
            data: users,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getUsers function in userController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getUserById = async (req) => {
    try {
        let user = await User.aggregate(
            [{
                $match: {
                    _id: {
                        $eq: dataTypes.ObjectId(req.body.id)
                    },
                },
            }
            ]
        );
        return {
            data: user,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getUserById function in userController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.addUser = async (req) => {
    try {
        let userExits = await User.findOne({
            email: req.body.email
        });
        if (userExits) {
            return {
                data: null,
                error: "User already Exits",
                message: "FAILED",
                statusCode: 200
            }
        }
        const passwordHashed = await argon2.hash(req.body.password);
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
            userType:req.body.userType!=null ? req.body.userType : 'Unconfirmed',
            password: passwordHashed,
            addedBy: dataTypes.ObjectId(req.body.addedBy)
        })
        let saveUser = await user.save();
        
        return {
            data: saveUser,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addUser function in userController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.updateUser = async (req) => {
    try {
        
        let data = req.body.data
        var updatedData = {
            name: data.name,
            email: data.email,
            role: data.role,
            userType: data.userType && data.userType,
            updatedAt: Date.now()
        }
        let updateUser = await User.updateOne({ _id: req.body.id }, updatedData)
        
        return {
            data: updateUser,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateUser function in userController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.removeUser = async (req) => {
    try {
        let res = await User.findOneAndDelete({
            _id: dataTypes.ObjectId(req.body.id)
        });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeUser function in userController ', error);
    }
}

exports.banUser = async (req) => {
    try {
        let updateUser = await User.updateOne({_id: dataTypes.ObjectId(req.body.id)}, {isBlocked:!req.body.blocked})
        return {
            data: updateUser,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }

    } catch (error) {
        console.log('Error inside banUser function in userController ', error);
    }
}
