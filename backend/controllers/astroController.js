const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");
const Astro = require("../models/astroModel");
const Log = require("../models/loginActivity.js");
const Session = require('../models/SessionModel.js');
const User = require("../models/userModel");
const log = require("../models/loginActivity");
const jwt = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander.js");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const astroModel = require("../models/astroModel");
const userModel = require("../models/userModel");

const sunSignModel = require("../models/sunSignModel.js");

exports.getAstro = catchAsyncErrors(async (req, res) => {
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap array[i] and array[j]
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    let pipeline =[
        {
          '$match': {
            'status': 'verified'
          }
        }, {
          '$addFields': {
            'astroRating': {
              '$round': [
                {
                  '$let': {
                    'vars': {
                      'ratings': {
                        '$map': {
                          'input': '$reviews', 
                          'as': 'review', 
                          'in': '$$review.rating'
                        }
                      }
                    }, 
                    'in': {
                      '$cond': {
                        'if': {
                          '$gt': [
                            {
                              '$size': '$$ratings'
                            }, 0
                          ]
                        }, 
                        'then': {
                          '$divide': [
                            {
                              '$reduce': {
                                'input': '$$ratings', 
                                'initialValue': 0, 
                                'in': {
                                  '$add': [
                                    '$$value', '$$this'
                                  ]
                                }
                              }
                            }, {
                              '$size': '$$ratings'
                            }
                          ]
                        }, 
                        'else': null
                      }
                    }
                  }
                }, 1
              ]
            }, 
            // 'OnlineStatus': {
            //   '$switch': {
            //     'branches': [
            //       {
            //         'case': {
            //           '$eq': [
            //             '$isOnline', 'Online'
            //           ]
            //         }, 
            //         'then': '1'
            //       }, {
            //         'case': {
            //           '$eq': [
            //             '$isOnline', 'Busy'
            //           ]
            //         }, 
            //         'then': '2'
            //       }
            //     ], 
            //     'default': '3'
            //   }
            // }
          }
        },
        //  {
        //   '$sort': {
        //     'OnlineStatus': 1
        //   }
        // }
      ]
    // let astro = await Astro.find({status:"verified"})
    let astro = await Astro.aggregate(pipeline)

    shuffleArray(astro)
    const sortedArray = astro.sort((a, b) => {
        const order = { Online: 1, Busy: 2, Offline: 3 };
        return order[a.isOnline] - order[b.isOnline];
    });
    res.status(200).json({ astrologers: sortedArray, success: true })
})

exports.GetAstrologerLog = catchAsyncErrors(async (req, res) => {
    const astro = await Log.find({ astro: req.params.id })
    res.status(200).json({ logs: astro, success: true })
})

exports.newGetAstrologerLog = catchAsyncErrors(async (req, res) => {

    let { id, fromDate, endDate, type, page, limit } = req.body
    type = type ? type : "";

    page = page ? (page == 0 ? 1 : parseInt(page)) : 1;
    limit = limit ? parseInt(limit) : 10;
    let offset = (page - 1) * limit;

    let pipeline = [
        {
            '$match': {
                'astro': new mongoose.Types.ObjectId(id)
            }
        },
        {
            '$addFields': {
                'time_diff': {
                    '$cond': {
                        'if': {
                            '$eq': [
                                '$type', 'Login'
                            ]
                        },
                        'then': 0,
                        'else': {
                            '$subtract': [
                                '$endAt', '$createdAt'
                            ]
                        }
                    }
                }
            }
        }, {
            '$addFields': {
                'remainingMinutes': {
                    '$floor': {
                        '$divide': [
                            {
                                '$mod': [
                                    '$time_diff', 1000 * 60 * 60
                                ]
                            }, 1000 * 60
                        ]
                    }
                }
            }
        }, {
            '$project': {
                'work_time': {
                    '$cond': {
                        'if': {
                            '$eq': [
                                '$remainingMinutes', 0
                            ]
                        },
                        'then': 1,
                        'else': '$remainingMinutes'
                    }
                },
                'createdAt': 1,
                time_diff: 1,
                'endAt': 1,
                'type': 1
            }
        },
        {
            '$sort': {
                'createdAt': -1
            }
        }
    ]

    if (fromDate && endDate) {
        endDate = new Date(endDate)
        e_date = endDate.setDate(endDate.getDate() + 1);

        pipeline.push({ $match: { createdAt: { $gte: new Date(fromDate), $lte: new Date(e_date) } } })
    }
    if (type) {
        pipeline.push({ $match: { type: type } })
    }

    const count = (await Log.aggregate(pipeline)).length

    pipeline.push({ $skip: offset });
    pipeline.push({ $limit: limit });
    const list = await Log.aggregate(pipeline)

    res.status(200).json({ page, count, list, success: true })
})

exports.upload = catchAsyncErrors(async (req, res) => {
    const { profile, Id } = req.body
    const u = await Astro.findOne({ _id: Id })
    if (!u) {
        throw new ErrorHandler("user not found", 404)
    }
    if (profile) {
        let a = await cloudinary.v2.uploader.upload(profile, { folder: "avatar", })
        u.avatar = {
            public_id: a.public_id,
            url: a.secure_url
        }
    }
    await u.save()
    res.status(200).json({ astro: u, success: true })
})

exports.updateAstroPass = catchAsyncErrors(async (req, res) => {
    const { password, Id } = req.body
    const u = await Astro.findOne({ _id: Id })
    if (!u) {
        throw new ErrorHandler("user not found", 404)
    }
    u.password = password
    await u.save()
    res.status(200).json({ success: true })
})

exports.addAstro = catchAsyncErrors(async (req, res) => {
    try {
        const { number, panNumber, adhara, passport, accountNumber, spirituality, ifscCode, accountName, dob, bankName, name, password, picture, email, address, category, country, languages, gender, earnPrise, chargePrise, experience, bio } = req.body
        let avatar
        if (picture) {
            let a = await cloudinary.v2.uploader.upload(picture, { folder: "avatar", })
            avatar = {
                public_id: a.public_id,
                url: a.secure_url
            }
        }
        const astrologers = await Astro.create({ panNumber, adhara, passport, number: Number(number), dob, accountNumber, spirituality, ifscCode, accountName, bankName, avatar: avatar ? avatar : "", name, password, email, address, category, country, languages, gender, earnPrise: Number(earnPrise), chargePrise: Number(chargePrise), experience: Number(experience), bio })
        res.status(200).json({ astrologers, success: true })
    } catch (error) {
        console.log(error)
    }


})

exports.getAstroRequest = catchAsyncErrors(async (req, res) => {
    const astro = await Astro.find()
    res.status(200).json({ astro, success: true })
})

exports.sendAstro = catchAsyncErrors(async (req, res) => {
    try {
        const { name, email, number, category, price, languages, country, address, experience, gender, dateOfBirth, dailyHours, platform, onboard, interviewDate, interviewTime, bio, image, idProof,
            howDidYouHear, techSkills, commitment, readingStyle, socialMediaLink, educationLevel, trainingsCertifications, psychicAbilities, discoverYourAbility, platformsInfo, spirituality
        } = req.body

        let astro_date = await astroModel.findOne({ email })
        const html = `<h2>New Astro Application Form Submission</h2>
    <p><strong>Name: </strong> ${name}</p>
    <p><strong>Email: </strong> ${email}</p>
    <p><strong>Number: </strong> ${number}</p>
    <p><strong>Price: </strong> ${price}</p>
    <p><strong>Languages: </strong> ${languages}</p>
    <p><strong>Category: </strong> ${category}</p>
    <p><strong>spirituality: </strong> ${spirituality}</p>
    <p><strong>Country: </strong> ${country}</p>
    <p><strong>Address: </strong> ${address}</p>
    <p><strong>Experience: </strong> ${experience}</p>
    <p><strong>Gender: </strong> ${gender}</p>
    <p><strong>Date of Birth: </strong> ${dateOfBirth}</p>
    <p><strong>Daily Hours: </strong> ${dailyHours}</p>
    <p><strong>How did you hear about us? : </strong> ${howDidYouHear}</p>
    <p><strong>How do you consider your tech skills? : </strong> ${techSkills}</p>
    <p><strong>Are you able to commit 21 hours a week? : </strong> ${commitment}</p>
    <p><strong>What is your reading style? : </strong> ${readingStyle}</p>
    <p><strong>Do you have a laptop/computer and a secure internet connection? : </strong> ${platform}</p>
    <p><strong>What is the highest level of Education you do have? : </strong> ${educationLevel}</p>
    <p><strong>What trainings/certifications do you have? : </strong> ${trainingsCertifications}</p>
    <p><strong>Do you use Social Media to promote yourself? : </strong> ${socialMediaLink}</p>
    <p><strong>How did you come to know that you do have psychic abilities? : </strong> ${psychicAbilities}</p>
    <p><strong>When & how did you discover that you do have special psychic abilities and how do you describe your reading style? : </strong> ${discoverYourAbility}</p>
    <p><strong>If you have operated a private reading service or you are working with any other psychic reading platforms, please list the names of any other services you have worked on with your stage name. Please provide a direct link to all your current profiles on other psychic platforms? : </strong> ${platformsInfo}</p>
    <p><strong>Onboard: </strong> ${onboard}</p>
    <p><strong>Interview Date: </strong> ${interviewDate}</p>
    <p><strong>Interview Time: </strong> ${interviewTime}</p>
    <p><strong>Bio: </strong> ${bio}</p>
    <p><strong>Profile image: </strong> <img src=${astro_date?.avatar?.url} style="width:200px; height:auto;" alt="logo"></p>
    <p><strong>ID Proof image: </strong> <img src=${astro_date?.idProof.url} style="width:200px; height:auto;" alt="logo"></p>`

        sendEmail({
            email: "unzziptruth@gmail.com",
            subject: "New Application form",
            html
        })
        sendEmail({
            email: "ankittale720@gmail.com",
            subject: "New astro Apply Application form",
            html
        })
        sendEmail({
            email: email,
            subject: "Stage two onboarding Unzziptruth",
            html: `
        <h1>Dear ${name},</h1><br/>
        <br/>
        <p>As Unzzip Truth is an International Astrology Chat Application, in which Astrologer will deliver their expertise to International Customer, So it is Important for Our Adviser to reply to Our Client on time with correct communication over the Chat. So We request you to visit typingtest.com and give a 3 Minutes medium level Typing test and Share the Result with Us on specialist@unzziptruth.com or You can reply to this email with test result</p>
        <br/>
        <br/>
        <button style="background-color: yellow;outline: none;border: 1px solid black;border-radius: 4px;padding: 6px 20px;"><a style="font-size: 18px ;font-weight: 700;text-decoration: none;color: black;" href="https://www.typingtest.com/test.html?minutes=3&textfile=mediumText.txt&mode=sent&result_url=result.html&bt=0&darkmode=1">Test Now</a></button>
         <br/>
        <br/>
        <p>With Regards, </p>
        <img src="https://unzziptruth.com/UnzipLogo.jpeg" style="width:200px; height:auto;" alt="logo">
        `
        })
        sendEmail({
            email: email,
            subject: "Form has been successfully submitted",
            html: `
        <h1>Dear ${name},</h1><br/>
        <br/>
        <p>Thank You for applying to Unzzip Truth. Here is how our onboarding process works. You will be assigned an Onboarding specialist within 5 working days. Post that, we generally take 2-3 days to make your profile live! We will initiate a chat window for you to get you all the updates about the following process. On final selection (post third round), we will send you a congratulatory mail as feedback and ensure further process.</p>
        <ol>
        <li>Profile level shortlisting (Current stage)</li>
        <li>First round (Typing Test)</li>
        <li>Second round (Audio/Video call)</li>
        <li>Document verification (on selection only)</li>
        <li>Astrologer Application Training session (on selection only)</li>
        <li>Sample customer call/chat (on selection only)</li>
        <li>Your profile is live!</li>
        </ol>
        <br/>
        <br/>
        <p>With Regards, </p>
        <img src="https://unzziptruth.com/UnzipLogo.jpeg" style="width:200px; height:auto;" alt="logo">
        `
        })
        res.status(200).json({ success: true, message: "applied successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "server error" })

    }
})

exports.loginAstro = catchAsyncErrors(async (req, res) => {
    const { email, password } = req.body
    let astro = await Astro.findOne({ email: email }).select("+password")
    if (!astro) {
        throw new ErrorHandler("Invalid email or password", 401)
    }
    let isPasswordMatched = await astro.comparePassword(password);
    console.log({isPasswordMatched});
    if (!isPasswordMatched) {
        throw new ErrorHandler("Invalid email, number or password", 401)
    }
    const token = astro.getJWTToken();
    astro.isOnline = "Online"
    astro.save()
    await log.create({ astro: astro._id, type: "Login" })
    const a = await log.create({ astro: astro._id, type: "WorkTime" })

    res.status(200).json({
        success: true,
        astro: astro,
        token
    })
})

exports.TokenAstro = catchAsyncErrors(async (req, res) => {
    const { token } = req.params
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
        throw new ErrorHandler("Session is Expired", 401)
    }
    const user = await Astro.findOne({ _id: verifyToken.id })
    res.status(200).json({
        success: true,
        astro: user,
    })
})

exports.StartAstro = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    const a = await log.create({ astro: id, type: "WorkTime" })
    const astro = await Astro.findOneAndUpdate({ _id: id }, { isOnline: "Online" })
    res.status(200).json({
        success: true,
        astro,
        a,
    })
})

exports.StopAstro = catchAsyncErrors(async (req, res) => {
    const { id, workId } = req.body
    const b = new Date()
    const a = await log.findOneAndUpdate({ _id: workId }, { endAt: b }, { new: true })
    const astro = await Astro.findOneAndUpdate({ _id: id }, { isOnline: "Offline" })
    res.status(200).json({
        success: true,
        astro,
    })
})
exports.findWorkID = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    let workId = await log.find({ astro: id, type: "WorkTime" }).sort({ _id: -1 })
    workId = workId.length > 0 ? workId[0] : {}
    res.status(200).json({
        success: true,
        workId
    })
})

exports.BusyAstro = catchAsyncErrors(async (req, res) => {
    const { id, work } = req.body
    const astro = await Astro.findOneAndUpdate({ _id: id }, { isOnline: work ? work : "Busy" })
    res.status(200).json({
        success: true,
    })
})

exports.Search = catchAsyncErrors(async (req, res) => {
    const { q } = req.body
    const astrologers = await Astro.find({
        $and: [
            { $text: { $search: q } },
        ]
    })
    res.status(200).json({
        success: true,
        astrologers,
    })

})

exports.updateAstro = catchAsyncErrors(async (req, res) => {
    const { id, ...updates } = req.body
    const a = await Astro.findOneAndUpdate({ _id: id }, { $set: updates })
    res.status(200).json({ success: true })
})

exports.deleteAstro = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    await Astro.findOneAndDelete({ _id: id })
    res.status(200).json({ success: true })
})

exports.GetAstrologer = catchAsyncErrors(async (req, res) => {
    const { id } = req.params
    let astrologer = await Astro.findOne({ _id: id }).populate("reviews.user", "name")
    let reviews = astrologer?.reviews
    reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, astrologer })
})

exports.Astro = catchAsyncErrors(async (req, res) => {
})

exports.getSessionEarnAndInvoiceHistory = async (req, res) => {
    const { astroID, } = req.query;
    const { page, limit } = req.body;

    let pipeline = [
        {
            '$match': {
                'astro': new mongoose.Types.ObjectId('65e99745650ddad3b8dded08')
            }
        }, {
            '$lookup': {
                'from': 'users',
                'localField': 'user',
                'foreignField': '_id',
                'as': 'userDetails'
            }
        }, {
            '$unwind': {
                'path': '$userDetails',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            '$addFields': {
                'astroPrevBalance': {
                    '$trunc': [
                        '$astroPrevBalance', 2
                    ]
                }
            }
        },
        {
            '$addFields': {
                'adminEarn': {
                    '$trunc': [
                        '$adminEarn', 2
                    ]
                }
            }
        },
        {
            '$sort': {
                'createdAt': -1
            }
        }
    ]

    let astroSessionEarn = await Session.aggregate(pipeline)
    let astorBankInvoice = await bankModel.find({ astro: '65e99745650ddad3b8dded08' }).sort({ createdAt: 1 });

    astorBankInvoice = astorBankInvoice.map(invoice => {
        invoice.balance = parseFloat(invoice.balance.toFixed(2));
        return invoice;
    });

    const astroEarningHistory = [...astroSessionEarn, ...astorBankInvoice];
    astroEarningHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ success: true, astroEarningHistory });




}



exports.otpSentAstro = catchAsyncErrors(async (req, res) => {
    const { name, email, number, category, price, languages, country, address, experience, gender, dateOfBirth, dailyHours, platform, onboard, interviewDate, interviewTime, bio, spirituality, password, confirmPassword, image, idProof,
        howDidYouHear, techSkills, commitment, readingStyle, socialMediaLink, educationLevel, trainingsCertifications, psychicAbilities, discoverYourAbility
    } = req.body

    generateRandomString = (length) => {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    let otp = await generateRandomString(6)

    let obj = {
        name, otp, email, number, category, price, languages, country, address, experience, gender, dateOfBirth, dailyHours, platform, onboard, interviewDate, interviewTime, bio, spirituality, password, confirmPassword, image, idProof,
        howDidYouHear, techSkills, commitment, readingStyle, socialMediaLink, educationLevel, trainingsCertifications, psychicAbilities, discoverYourAbility
    }


    if (image) {
        let a = await cloudinary.v2.uploader.upload(image, { folder: "avatar", })
        obj.avatar = {
            public_id: a.public_id,
            url: a.secure_url
        }
    }
    if (idProof) {
        let a = await cloudinary.v2.uploader.upload(idProof, { folder: "avatar", })
        obj.idProof = {
            public_id: a.public_id,
            url: a.secure_url
        }
    }

    let astro;
    if (password != confirmPassword) {
        res.status(200).json({ success: false, message: "password and confirmPassword are not match!" })
    }
    astro = await astroModel.findOne({ email: email })
    if (!astro) {
        astro = await astroModel.create(obj)
    } else {
        astro = await astroModel.findOneAndUpdate({ email }, { otp: otp }, { new: true })
    }

    let html = `<!DOCTYPE html>
    <html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
      
            @media screen {
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 400;
                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                }
    
                @font-face {
                    font-family: 'Lato';
                    font-style: italic;
                    font-weight: 700;
                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                }
            }
    
            /* CLIENT-SPECIFIC STYLES */
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            /* RESET STYLES */
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }
    
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* MOBILE STYLES */
            @media screen and (max-width:600px) {
                h1 {
                    font-size: 32px !important;
                    line-height: 32px !important;
                }
            }
    
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    </head>
    
    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
    <!-- HIDDEN PREHEADER TEXT -->
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- LOGO -->
        <tr>
            <td bgcolor="#eba12c" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#eba12c" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src="https://unzziptruth.com/UnzipLogo.jpeg" width="125" height="120" style="display: block; border: 0px;" />
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0; text-align:center">YOUR OTP FOR EMAIL VERIFICATION : ${otp}</p>
                        </td>
                    </tr>
                    <tr>
                  
                    </tr> <!-- COPY -->
                    <tr>
                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                        <p style="margin: 0; text-align:center">
                        <br>
                                Thank you,<br>
                                UNZZIP TRUTH <br>
                                customer service department,<br>
                                support@unzziptruth.com</p>
                    </td>
                </tr>
         
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                <tr>
                <td bgcolor="#eba12c" align="center"
                 style="padding: 30px; border-radius: 4px; color: #fff; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                   <h2 style="font-size: 20px; font-weight: 400; color: #fff; margin: 0;">Need more help?</h2>
                     <p style="margin: 0;"><a href="mailto:account@unzziptruth.com" target="_blank"
                      style="color: #fff;">We’re here to help you out</a></p>
                       </td>
              </tr>
                </table>
            </td>
        </tr>
       
    </table>
    </body>
    </html>`
    sendEmail({
        email: email,
        subject: "Verification Email",
        html: html
    })

    res.status(200).json({ success: true, message: "Otp send your email!", astro })
})

exports.verifyOtp = async (req, res) => {
    try {
        let { id, otp } = req.body
        if (!id) {
            return res.status(200).send({ status: false, message: "Please enter userId!" })
        }
        if (!otp) {
            return res.status(200).send({ status: false, message: "Please enter OTP!" })
        }
        let findAstro = await astroModel.findById(id)
        if (!findAstro) {
            return res.status(200).send({ status: false, message: "User not found!" })
        } else if (findAstro.otp != otp) {
            return res.status(200).send({ status: false, message: "Invalid OTP!" })
        } else {
            delete findAstro._doc.otp
            return res.status(200).send({ status: true, message: "Success!", findAstro })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "server error" })
    }
}



