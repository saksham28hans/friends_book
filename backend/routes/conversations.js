const router = require("express").Router();
const Conversation = require("../models/Conversation")

router.post("/",async(req,res)=>{
    const newConversation = new Conversation({
     members : [req.body.senderId,req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(newConversation)
    } catch (error) {
        res.status(500).json(err)
    }
})

//get a conversation
router.get('/:userId',async(req,res)=>{
    try {
        const conversation = await Conversation.find({
            members : { $in : [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get conversation between 2 users

router.get('/find/:firstUser/:secondUser',async(req,res)=>{
    try {
        const conversation = await Conversation.findOne({
            members : { $all : [req.params.firstUser,req.params.secondUser] },
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error);
    }
})
module.exports = router;