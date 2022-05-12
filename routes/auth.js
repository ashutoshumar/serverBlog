const router =require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const cors = require('./cors');
//Register

router.route('/register')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,async (req,res)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password:hashedPass
        })
        const user = await newUser.save();
        console.log(user)
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error);
        
    }
});



//Login
router.route('/login')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,async (req,res)=>{
    try {
        
        const user =await  User.findOne({email:req.body.email})
        !user && res.status(400).json("User does not exists")

        const validated = await bcrypt.compare(req.body.password,user.password);
        !validated && res.status(400).json("credentials does not match")
     
        const {password,...others} = user._doc
        res.status(200).json(others)
       
    } catch (error) {
        res.status(500)
        //.json(error);
        console.log(error)
        
    }
});





module.exports = router;