function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    if(err.name === 'CastError') {
        return res.status(400).json({ message: `${err.path} is invalid` });
    }

    if(err.name === 'MongoServerError') {
        if(err.keyPattern !== {} || err.keyPattern !== undefined)
        return res.status(400).json(err.keyPattern);
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;
