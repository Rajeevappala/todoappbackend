const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        require : true,
    },
    body: {
        type : String,
        require : true,
    },
    status : {
        type:[
            {
                type: String,
                enum : ['completed' , 'pending']
            }
        ]
    },
    user : [
        {
            type : mongoose.Types.ObjectId,
            ref : "User"
        }
    ]

},
{timestamps : true}
)

module.exports = mongoose.model("List" , listSchema);