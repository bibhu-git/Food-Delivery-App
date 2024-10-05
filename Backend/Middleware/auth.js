import jwt from 'jsonwebtoken'

const authMiddleware = (req,res,next) => {
    try {
        const {token} = req.headers;
        if(!token)
        {
           return res.json({success: false, message: "Not authorized login again!"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        if(token_decode)
        {
            req.body.userId = token_decode.id;
        }
        else{
           return res.json({success: false, message: "Invalid token"})
        }
        next();
    } catch (error) {
        console.log("Error in authMiddleware " + error)
        res.json({success: false, message: "Error"})
    }
}

export default authMiddleware;