const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.allUser = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error })
    }
}


exports.register = async (req, res) => {
    const { name, email, password, role } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword, role })
        res.status(201).json({ message: "user has been created" })
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

exports.login = async (req,res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({message:"user not found"})
        }
       
        const compare = await bcrypt.compare(password,user.password)

        if(!compare){
            return res.status(400).json({message:"invalid credentials"})
        }
         
       const options = {
        email: user.email,
        id: user._id,
        role: user.role
       } 

        const token = jwt.sign(options,process.env.secret_key)

        res.status(200).json({user,token})
        
    } catch (error) {
        res.status(400).json({ message: error })
    }
}