const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const User = require("../models/userModel");
const Chat = require("../models/ChatModel");
const Message = require("../models/MessageModel");
const userModel = require("../models/userModel");
const astroModel = require("../models/astroModel");
const cloudinary = require("cloudinary");
const OfflineChat = require("../models/OfflineChat");

exports.createChat = catchAsyncErrors(async (req, res) => {
    const { astroId, myId } = req.body
    if (!astroId) {
        throw new ErrorHandler("Your link is broken", 404)
    }
    let isChat = {}
    try {
        isChat = await Chat.findOne({
            $and: [
                { astro: astroId },
                { user: myId },
            ],
        }).populate("astro", "-password -reviews").populate("user", "-password").populate("latestMessage");
        isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "name avatar email" })
    }
    catch (e) {

    }
    if (isChat?._id) {
        res.send({ chat: isChat, success: true })
    }
    else {
        var chatData = {
            chatName: "sender",
            astro: astroId,
            user: myId
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("astro", "-password").populate("user", "-password").populate("latestMessage")
            res.status(200).send({ success: true, chat: fullChat })
        } catch (error) {
            throw new ErrorHandler(error.message, 400)
        }
    }

})
// fetch all the chats 
exports.fetchChat = catchAsyncErrors(async (req, res) => {
    const a = req.query.astro
    if (a === "astro") {
        Chat.find({ astro: req.query.myId })
            .populate("user", "-password")
            .populate("astro", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                console.log(result)
                result = await User.populate(result, {
                    path: "latestMessage.sender",
                    select: "name avatar email"
                })
                res.status(200).send({ success: true, chats: result })
            })
            .catch((e) => {
                throw new ErrorHandler(e.message, 400)
            })
    }
    else {
        Chat.find({ user: req.query.myId })
            .populate("user", "_id name avatar")
            .populate("astro", "_id name avatar isOnline")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                result = await User.populate(result, {
                    path: "latestMessage.sender",
                    select: "name avatar email"
                })
                // let astroId = result[0]?.astro?._id
                // let astro = await astroModel.findOne({ _id: astroId }).select("reviews")
                // let rating
                // let myId = req.query.myId
                // let reviews = astro?.reviews
                // reviews.filter((item) => {
                //     return item.user = myId
                // })
                // console.log(reviews);
                res.status(200).send({ success: true, chats: result })
            })
            .catch((e) => {
                throw new ErrorHandler(e.message, 400)
            })

    }

})
exports.AdminFetchChat = catchAsyncErrors(async (req, res) => {
    const { astro, user, session_id, offline } = req.body


    if (offline) {
        let offMessage = await OfflineChat.findOne({ session_id: session_id }).select("messages")
       let messages = offMessage.messages
        res.send({ messages, success: true })
    }
    const isChat = await Chat.findOne({
        $and: [
            { astro: astro },
            { user: user },
        ],
    })
    if (!isChat?._id) throw new ErrorHandler("chat is not available", 404)
    const messages = await Message.find({ chat: isChat._id })
    console.log(messages)
    
    res.send({ messages, success: true })
})
exports.sendMessage = catchAsyncErrors(async (req, res) => {
    const { content, myId, chatId, image } = req.body
    if (!chatId) {
        throw new ErrorHandler("Invalid data parse into request", 404)
    }
    var newMessage = {
        sender: myId,
        content: content,
        chat: chatId
    }
    if (image) {
        let a = await cloudinary.v2.uploader.upload(image, { folder: "avatar", })
        newMessage.avatar = {
            public_id: a.public_id,
            url: a.secure_url
        }
    } else {
        if (!content) {
            throw new ErrorHandler("Invalid data parse into request", 404)
        }
    }

    try {
        var message = await Message.create(newMessage)
        message = await message.populate("chat")
        message = await User.populate(message, { path: "chat.user", select: "name avatar email" })
        message = await User.populate(message, { path: "chat.astro", select: "name avatar email" })
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message })
        res.json({ message, success: true })
    } catch (error) {
        throw new ErrorHandler(error.message, 404)
    }
})
exports.allMessages = catchAsyncErrors(async (req, res) => {
    try {
        let { astrologerId, user } = req.body
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name avatar email").populate("chat")


        let userData = await userModel.findById(user).select("balance")
        let astroData = await astroModel.findById(astrologerId).select("chargePrise reviews")

        const balance = userData?.balance ? userData?.balance : 0;
        const chargePrise = astroData?.chargePrise ? astroData?.chargePrise : 0;
        const second = (parseInt(balance / chargePrise) * 60);
        console.log({ second });
        let IsReview
        let reviewData = astroData?.reviews.length > 0 ? astroData?.reviews : []
        let allData = await Promise.all(reviewData?.filter(async (item) => {

            if (item.user == user) {
                return IsReview = true
            } else {
                return IsReview = false
            }

        }));
        res.send({ second, IsReview, messages, success: true })
    } catch (error) {
        throw new ErrorHandler(error.message, 400)
    }
})
