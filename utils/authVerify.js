import jwt from 'jsonwebtoken';

module.exports = function (req, res, next) {
    if (!localStorage.getItem('token')) {
        return res.status(401).json({message:'User not authorized'})
    }

    const token = localStorage.getItem('token').substring(7); // removing bearer from token
    try{
        const decodedToken=jwt.verify(token,'secret');
        req.user=decodedToken;
        next();
    }
    catch(err){
        return res.status(401).json({message:'Invalid token'});
    }
}