const Chat = require('../../models/Chat');
const ObjectId = require('mongoose').Types.ObjectId;
const { PRIVATE_CHAT_MESSAGE } = require('../../utils/Types');
const io = require('../../socket');

exports.sendMessage = (req, res, next) => {
    const { message, sender, reciever } = req.body;
    Chat.create({
        message: message,
        from: sender,
        to: reciever
    })
        .then(result => {
            return Chat.find(result)
                .populate({
                    path: 'to from',
                    select: 'name userName profileImage'
                })
        })
        .then(result => {
            io.getIO().emit('check-message', {sender,reciever,result});
            return res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        })
}

exports.getChat = (req, res, next) => {
    const { userId, friendId } = req.body;
    let senderChat = [];
    Chat.find({ from: ObjectId(userId), to: ObjectId(friendId) })
        .populate({
            path: 'to from',
            select: 'name userName profileImage'
        })
        .then(result => {
            if (!result) {
                return res.status(400).json({ message: 'No messages from user' });
            }
            senderChat = [...result];
            return Chat.find({ from: ObjectId(friendId), to: ObjectId(userId) })
                .populate({
                    path: 'to from',
                    select: 'name userName profileImage'
                })
        })
        .then(result => {
            if (!result) {
                return res.status(400).json({ message: 'No messages from guest' });
            }
            let allMessages = [...senderChat, ...result];
            return res.status(200).json(allMessages);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        })
}