const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user');

const secretKey = 'MY_SECRET_KEY';


// sign up

router.post("/register" , async(request , response) => {
    try {
        const {email , username, password, status} = request.body;
        const hashedPassword = await bcrypt.hashSync(password);
        const user = new User({email , username , password : hashedPassword , status});
        const token = jwt.sign({username :username } , secretKey , {
            expiresIn : '1h'
        })
        console.log(token)
        await user.save()
        .then(() => 
            response.status(200).json({message : "Sign Up Successful" ,token})
        )
    } catch (error) {
        console.error(error.message);
        response.status(400).json({message : "user already exists"});
    }
})

// sign in 

router.post('/login' , async(request , response) => {
    try {
        const token = request.headers['authorization']; 
        if (!token) {
            return response.status(401).json({ message: "Access token is missing. Please sign in." });
            console.error(error.message)
        }

        // Remove "Bearer " prefix if present
        const formattedToken = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

        jwt.verify(formattedToken, secretKey, async (err, decoded) => {
            if (err) {
                return response.status(403).json({ message: "Invalid or expired token. Please sign in again." });
            }

        const user = await User.findOne({email : request.body.email});
        if (!user){
            request.status(200).json({message : "Please Sign up first"});
        }

        const comparePassword = bcrypt.compareSync(request.body.password , user.password);
        if (!comparePassword){
            request.status(200).json({message : "Incorrect Password"});
        }

        const {password , ...others} = user._doc;
        response.status(200).json({others});

    })

    } catch (error) {
        console.error(error)
        response.status({message : "Intrernal server Error"});
    }
})

module.exports = router;