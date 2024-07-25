const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhander");
const OfflineChat = require("../models/OfflineChat.js");
const User = require("../models/userModel.js");
const Astro = require("../models/astroModel.js");
const error = require("../middleware/error.js");
const { offChatSessions } = require("./sessionController.js");
const adminModel = require('../models/adminModel.js');



exports.astroOffChat = catchAsyncErrors(async (req, res) => {
    const { astroId, userId, offChatId, content } = req.body
    const chat = await OfflineChat.findOne({ _id: offChatId })
    chat.messages.push({ sender: astroId, content })
    await chat.save()
    res.status(200).json({ success: true, chat })
})

exports.astroGetAllOffChat = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const chat = await OfflineChat.find({ astro: id, isReplied: false }).populate("user").populate("astro")
    const request = (await OfflineChat.find({ astro: id, isReplied: false })).length

    res.status(200).json({ success: true, chat, request })
})

exports.finishChat = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            res.status(200).json({ success: false, message: "Please enter offline chatId!" })
        }
        const update = await OfflineChat.findByIdAndUpdate({ _id: id }, { isReplied: true }, { new: true })
        res.status(200).json({ success: true, update })
    } catch (error) {
        console.log(error);
        res.status(200).json({ success: false, message: "server error" })

    }
}



// // fetch all the chats
// // exports.fetchChat = catchAsyncErrors(async (req, res) => {
// //     const a = req.query.astro
// //     if (a === "astro") {
// //         Chat.find({ astro: req.query.myId })
// //             .populate("user", "-password")
// //             .populate("astro", "-password")
// //             .populate("latestMessage")
// //             .sort({ updatedAt: -1 })
// //             .then(async (result) => {
// //                 console.log(result)
// //                 result = await User.populate(result, {
// //                     path: "latestMessage.sender",
// //                     select: "name avatar email"
// //                 })
// //                 res.status(200).send({ success: true, chats: result })
// //             })
// //             .catch((e) => {
// //                 throw new ErrorHandler(e.message, 400)
// //             })
// //     }
// //     else {
// //         Chat.find({ user: req.query.myId })
// //             .populate("user", "-password")
// //             .populate("astro", "-password")
// //             .populate("latestMessage")
// //             .sort({ updatedAt: -1 })
// //             .then(async (result) => {
// //                 result = await User.populate(result, {
// //                     path: "latestMessage.sender",
// //                     select: "name avatar email"
// //                 })
// //                 res.status(200).send({ success: true, chats: result })
// //             })
// //             .catch((e) => {
// //                 throw new ErrorHandler(e.message, 400)
// //             })
// //     }

// // })
// // exports.AdminFetchChat = catchAsyncErrors(async (req, res) => {
// //     const { astro, user } = req.body
// //     const isChat = await Chat.findOne({
// //         $and: [
// //             { astro: astro },
// //             { user: user },
// //         ],
// //     })
// //     if (!isChat?._id) throw new ErrorHandler("chat is not available", 404)
// //     const messages = await Message.find({ chat: isChat._id })
// //     console.log(messages)
// //     res.send({ messages, success: true })
// // })
// // exports.sendMessage = catchAsyncErrors(async (req, res) => {
// //     const { content, myId, chatId } = req.body
// //     if (!content || !chatId) {
// //         throw new ErrorHandler("Invalid data parse into request", 404)
// //     }
// //     var newMessage = {
// //         sender: myId,
// //         content: content,
// //         chat: chatId
// //     }
// //     try {
// //         var message = await Message.create(newMessage)
// //         message = await message.populate("chat")
// //         message = await User.populate(message, { path: "chat.user", select: "name avatar email" })
// //         message = await User.populate(message, { path: "chat.astro", select: "name avatar email" })
// //         await Chat.findByIdAndUpdate(chatId, { latestMessage: message })
// //         res.json({ message, success: true })
// //     } catch (error) {
// //         throw new ErrorHandler(error.message, 404)
// //     }
// // })
// // exports.allMessages = catchAsyncErrors(async (req, res) => {
// //     try {
// //         const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name avatar email").populate("chat")
// //         res.send({ messages, success: true })
// //     } catch (error) {
// //         throw new ErrorHandler(error.message, 400)
// //     }
// // })
exports.userOffChat = catchAsyncErrors(async (req, res) => {
    const { astroId, userId, offChatId, content } = req.body
    const chat = await OfflineChat.findOne({
        $and: [
            { astro: astroId },
            { user: userId },
            { _id: offChatId }
        ]
    })

    let lastMsgDate = new Date()
    let date = chat.date

    let minutes = 0
    if (lastMsgDate && date) {
        let time_diff = Math.abs(lastMsgDate - date)
        minutes = Math.floor((time_diff % (1000 * 60 * 60)) / (1000 * 60));
    }

    const u = await User.findOne({ _id: userId })

    if (minutes >= 1) {
        chat.date = new Date()

        if (u.balance < 7) {
            throw new ErrorHandler("you have not sufficient balance", 401)
        }
        u.balance = u.balance - 7
        chat.userPaid = chat.userPaid + 7,
            chat.astroEarn = chat.astroEarn + 2.5,
            chat.adminEarn = chat.adminEarn + 4.5,
            // offChatSessions(req.body)
            await u.save()
    }
    let admin = await adminModel.findOne()
    admin.balance = admin.balance + 4.5
    await admin.save()
    chat.messages.push({ sender: userId, content, user: userId })
    await chat.save()
    res.status(200).json({ success: true, chat })
})
exports.userGetAllOffChat = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const chat = await OfflineChat.find({ user: id }).populate("user").populate("astro", "-reviews").sort()
    res.status(200).json({ success: true, chat })
})
exports.addOfflineChat = catchAsyncErrors(async (req, res) => {
    const { astroId, myId, content } = req.body
    if (!astroId) {
        throw new ErrorHandler("Your link is broken", 404)
    }
    else {
        var chatData = {
            astro: astroId,
            user: myId,
            userPaid: 7,
            astroEarn: 2.5,
            adminEarn: 4.5
        }
        try {
            const u = await User.findOne({ _id: myId })
            if (u.balance < 7) {
                throw new ErrorHandler("you have not sufficient balance", 401)
            }
            u.balance = u.balance - 7

            let admin = await adminModel.findOne()
            admin.balance = admin.balance + 4.5
            await admin.save()
            let result = await offChatSessions(req.body)
            await u.save()
            chatData.session_id = result._id
            let checkOffChat = await OfflineChat.findOne({ astro: astroId, user: myId })
            if (!checkOffChat) {
                const createdChat = await OfflineChat.create(chatData)
                createdChat.messages.push({ sender: myId, content: content })
                await createdChat.save()
                const fullChat = await OfflineChat.findOne({ _id: createdChat._id }).populate("astro", "-password -reviews").populate("user", "-password")
                res.status(200).json({ success: true, offChat: fullChat })
            } else {
                if (checkOffChat.isReplied == true){
                    checkOffChat.isReplied = false  
                }
                    checkOffChat.messages.push({ sender: myId, content: content })
                await checkOffChat.save()
                const fullChat = await OfflineChat.findOne({ _id: checkOffChat._id }).populate("astro", "-password -reviews").populate("user", "-password")
                res.status(200).json({ success: true, offChat: fullChat })
            }

        } catch (error) {
            throw new ErrorHandler(error.message, 400)
        }
    }

})
