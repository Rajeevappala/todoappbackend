const router = require('express').Router();

const User = require('../models/user');
const List = require('../models/list');
const { request } = require('express');


// POST Details

router.post('/addTask' , async(request , response) => {
   
    try {
        const {title , body , status , userId} = request.body;
        const userExist = await User.findById(userId);
        if (userExist){
            const list = new List({title , body , status , user : userExist});
            await list.save().then(() => response.status(200).json({list}));
            userExist.list.push(list);
            userExist.save(); 
        }
        

    } catch (error) {
        console.error(error)
        response.status(400).json({message : "Internal server error"});
    }
 

})

// update Details 



router.put('/updateTask/:id' , async(request , response) => {
    try {
        const {title , body , status , email} = request.body;
        const userExist = await User.findOne(email);
        console.log(userExist)
        if (userExist){
            
    
            const list = await List.findByIdAndUpdate(request.params.id , {title , body , status});
            
            await list.save().then(() => response.status(200).json({list}));
        }
        

    } catch (error) {
        console.log(error.message)
        response.status(400).json({message : "Internal server error"});
    }

})

// delete 

router.delete('/deleteTask/:id' , async(request , response) => {
    try {
        const { email} = request.body;
        const userExist = await User.findOne(email);
        console.log(userExist)
        if (userExist){
            
        
            await List.findByIdAndDelete(request.params.id).then(() => 
                response.status(200).json({message : "Task Deleted successfully"}));
        }

    } catch (error) {
        console.log(error.message)
        response.status(400).json({message : "Internal server error"});
    }

})

// GET task 

router.get("/getTask/:id", async(request , response) => {
    const list = await List.find({user : request.params.id}).sort({createdAt : -1});
    if (list.length !== 0){
        response.status(200).json({list : list})
    } else{
        response.status(200).json({message : "No Task"});
    }
    
})


module.exports = router;