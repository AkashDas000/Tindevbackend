const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({

    formUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        enum: {
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            message: `{VALUE} is incorrect status type`
        }
    }
},{
    timestamps: true,
})

connectionRequestSchema.index({formUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    //Check if the fromUserId is sams as toUserId
    if(connectionRequest.formUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself")
    }
    
    next()
})

const ConnectionRequestModel = new mongoose.model("ConnectedRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel