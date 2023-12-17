const jwt = require("jsonwebtoken")


const generateToken  = (id)=> {
    const token = jwt.sign({id}, "token", {expiresIn: "1d"})
    return token;
}

const authenticate = (req, res, next) => {
       //const token = req.header('Authorization').replace('Bearer ', '');
       
    const token = req.cookies["token"]
     if (!token) return res.status(401).send({message: 'Access Denied'});
   
    try{
        const verifed = jwt.verify(token, "token")
        req.user = verifed
        next();
    }catch(err){
        res.status(400).send({ message: "invalid token"})
    }
}

module.exports = {generateToken, authenticate}