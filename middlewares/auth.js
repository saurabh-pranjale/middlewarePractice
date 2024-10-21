const jwt = require('jsonwebtoken')



exports.auth = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1]

        const decode = jwt.verify(token, process.env.secret_key)


     req.user = decode


        next()



    } catch (error) {
        res.status(400).json({ message: error })
    }
}


exports.isStudent = (req,res,next) => {
    try {
       console.log(req.user.role)

       if(req.user.role !== "Student"){
        return res.status(400).json({message:"unathorized"})
       }

       next()
    } catch (error) {
        res.status(400).json({ message: error })
    }
}