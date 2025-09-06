const FoodPartner = require('../models/Foodpartner');
const User = require('../models/User')
const jwt = require('jsonwebtoken');

// exports.foodPartnerMiddleware = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Please login first"
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const foodPartner = await FoodPartner.findById(decoded.id);

//         req.foodPartner = foodPartner;
//         next();

//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid Token"
//         });
//     }
// };

exports.foodPartnerMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const foodPartner = await FoodPartner.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({
                message: "Food Partner not found"
            });
        }

        req.foodPartner = foodPartner

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

exports.authUserMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}
// module.exports = {
//     foodPartnerMiddleware
// }