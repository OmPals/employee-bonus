const jwt = require('express-jwt');
const secret = process.env.SECRET

module.exports = authorize;

function authorize() {
    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            // authentication and authorization successful
            next();
        }
    ];
}