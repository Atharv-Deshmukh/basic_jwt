const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        res.redirect('login')
    }
    else{
        try{
            const verified = jwt.verify(token, "ThisIsTopSecret");
            req.user = verified;
            next()
        }
        catch(err){
            send('Invalid Token')
        }
    }
}