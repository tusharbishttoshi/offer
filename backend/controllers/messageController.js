const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const User = require("../models/userModel");
const Chat = require("../models/ChatModel");
const Message = require("../models/MessageModel");
const Astro = require("../models/astroModel");


exports.sendMessage = catchAsyncErrors(async (req, res) => {
    const { content, userId, myId, chatId } = req.body
    console.log("hii")
    if (!content || !chatId) {
        throw new ErrorHandler("Invalid data parse into request", 404)
    }
    var newMessage = {
        sender: myId,
        content: content,
        chat: chatId
    }
    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        // message = await User.populate(message, { path: "chat.user", select: "name pic email" })
        message = await User.populate(message, { path: "chat.user", select: "name pic email" })
        console.log(message)
        message = await Astro.populate(message, { path: "chat.astro", select: "name pic email" })
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message })
        res.json(message)
    } catch (error) {
        throw new ErrorHandler(error.message, 404)
    }
    let isChat = await Chat.find({
        $and: [
            { user: myId },
            { astro: userId },
        ]
    }).populate("user", "-password").populate("astro", "-password").populate("latestMessage")

    isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "name pic email" })
    isChat = await Astro.populate(isChat, { path: "latestMessage.sender", select: "name pic email" })
    if (isChat.length > 0) {
        res.send(isChat[0])
    }
    else {
        var chatData = {
            chatName: "sender",
            users: [userId, myId]
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password").populate("latestMessage")
            res.status(200).send(fullChat)
        } catch (error) {
            throw new ErrorHandler(error.message, 400)
        }
    }
})

exports.fetchMessage = catchAsyncErrors(async (req, res) => {
    Chat.find({ users: { $elemMatch: { $eq: req.query.myId } } })
        .populate("users", "-password")
        .populate("latestMessage")
        .then(async (result) => {
            // result = await User.populate(result, {
            //     path: "latestMessage.sender",
            //     select: "name pic email"
            // })
            res.status(200).send(result)
        })
        .catch((e) => {
            throw new ErrorHandler(e.message, 400)
        })
})
