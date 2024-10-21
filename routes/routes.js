const express = require('express')
const { allUser, register, login } = require('../controllers/userController')
const { auth, isStudent } = require('../middlewares/auth')


const router = express.Router()

router.get('/',auth, allUser)

router.post('/register',register)


router.post('/login',login)


router.get('/student',auth,isStudent,(req,res)=>{
    res.status(200).json({message:"this is student protected 😎 route"})
})

router.get('/admin',(req,res)=>{
    res.status(200).json({message:"this is admin protected 😎 route"})
})

module.exports = router