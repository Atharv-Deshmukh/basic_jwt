const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token){
        res.send('Please Login!')
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