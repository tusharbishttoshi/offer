const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const jwt = require('jsonwebtoken');
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander.js");
const bcrypt = require("bcryptjs");
const sessionModel = require('../models/SessionModel.js');
const userModel = require("../models/userModel");
const reasonModel = require("../models/reasonModel.js");
const sunSignModel = require("../models/sunSignModel.js");

exports.allUserGet = catchAsyncErrors(async (req, res) => {
    const users = await User.find()
    res.status(200).json({ success: true, users })
})
exports.registerUser = catchAsyncErrors(async (req, res) => {
    let { name, password, email, dob, zodiac, bt, bp, firebase_token, bonus } = req.body;
    email = email.toLowerCase()
    let exUser = await User.findOne({ email: email });
    if (exUser) {
        return res.status(200).send({ success: false, msg: "User already exist!" })
    }
    else if (!exUser?.verify && exUser?._id) {
        const token = exUser.getJWTToken()
        console.log({ token });

        const html = `<!DOCTYPE html>
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
                   <!-- <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0; text-align:center">YOUR OPT : ***</p>
                        </td>
                    </tr>-->
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 30px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#eba12c"><a href="https://unzziptruth.com/auth?verify-email=true&token=${token}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #eba12c; display: inline-block;">Activate Account</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">Unzzip Truth is a helping hand in the journey of your life with
                                best levels of honesty, quality and true readings as service.
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
        exUser.name = name
        exUser.password = password
        exUser.dob = dob
        exUser.bt = bt
        exUser.bp = bp
        exUser.zodiac = zodiac
        exUser.firebase_token = firebase_token
        exUser.bonus = bonus
        exUser.save()
        sendEmail({
            email: email,
            subject: " Verification Email",
            html
        })
        return res.status(200).send({ success: true, msg: "The Verification email has been sent to your email id please check your email!" })
    }
    else {
        let xh = await User.find()
        const exUse = await User.create({ email: email, id: xh.length + 100000, name, zodiac, password, dob, bp, bt, firebase_token: firebase_token, bonus })
        const token = exUse.getJWTToken()
        console.log({ token });
        const html = `<!DOCTYPE html>
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
                   <!-- <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0; text-align:center">YOUR OPT : ***</p>
                        </td>
                    </tr>-->
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 30px 30px;">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="border-radius: 3px;" bgcolor="#eba12c"><a href="https://unzziptruth.com/auth?verify-email=true&token=${token}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #eba12c; display: inline-block;">Activate Account</a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr> <!-- COPY -->
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0;">Unzzip Truth is a helping hand in the journey of your life with
                                best levels of honesty, quality and true readings as service.
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
            subject: " Verification Email",
            html
        })
        return res.status(200).send({ success: true, msg: "The Verification email has been sent to your email id please check your email!" })

    }
})
exports.verifyUser = catchAsyncErrors(async (req, res) => {
    const { token } = req.body
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!verifyToken) {
        throw new ErrorHandle("Your link is Expired", 400)
    }
    let user = await User.findByIdAndUpdate({ _id: verifyToken.id }, { verify: true }, { new: true })
    const a = user.getJWTToken()
    res.status(200).json({
        user, success: true, token: a
    })
})
exports.login = catchAsyncErrors(async (req, res) => {
    let { c, p, firebase_token } = req.body
    c = c.toLowerCase()
    console.log({c});
    let user = await User.findOne({ email: c }).select("+password")
    if (!user) {
        // throw new ErrorHandler("Invalid email ", 401)
        return res.status(200).send({ success: false, msg: "Invalid email or password" })
    }
    if (!user?.verify) {
        // throw new ErrorHandler("Invalid email ", 401)
        return res.status(200).send({ success: false, msg: "please verify your account fisrt" })
    }

    const isPasswordMatched = await user.comparePassword(p);
    if (!isPasswordMatched) {
        // throw new ErrorHandler("Invalid  password", 401)
        return res.status(200).send({ success: false, msg: "Invalid  password or password" })

    }
    let update = await User.findByIdAndUpdate(user._id, { firebase_token: firebase_token }, { new: true })
    const token = user.getJWTToken();
    res.status(200).json({
        success: true,
        user,
        token
    })
})
exports.tokenLogin = catchAsyncErrors(async (req, res) => {
    const token = req.body.token
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
        throw new ErrorHandler("Session is Expired", 401)
    }
    const user = await User.findById(verifyToken.id)
    if (!user?.verify) {
        throw new ErrorHandler("Session is Expired", 401)
    }
    res.status(200).json({
        success: true,
        user,
    })
})
exports.forgotPassword = catchAsyncErrors(async (req, res) => {
    const { c, p } = req.body
    let user = await User.findOne({ email: c });
    if (!user) {
        throw new ErrorHandler(`User not exist Please check your Email`, 400)
    }
    const token = user.getJWTToken()
    const html = `<html>

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
        <div
            style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
            We're thrilled to have you here! Get ready to dive into your new account. </div>
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
                            <td bgcolor="#ffffff" align="center" valign="top"
                                style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Change Password</h1> <img
                                    src="https://unzziptruth.com/UnzipLogo.jpeg" width="125" height="120"
                                    style="display: block; border: 0px;" />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <!-- <tr>
                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                            <p style="margin: 0; text-align:center">YOUR OPT : ***</p>
                        </td>
                    </tr>-->
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Please Click On Button To Confirm Your New Password</p>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#ffffff" align="left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 30px 30px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 3px;" bgcolor="#eba12c"><a
                                                            href="https://unzziptruth.com/auth?reset-password=true&token=${token}&p=${p}"
                                                            target="_blank"
                                                            style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #eba12c; display: inline-block;">Confirm
                                                            Password</a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr> <!-- COPY -->
                        <tr>
                            <td bgcolor="#ffffff" align="left"
                                style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                <p style="margin: 0;">Unzzip Truth is a helping hand in the journey of your life with
                                    best levels of honesty, quality and true readings as service.
                                    <br>
                                    Thank you,<br>
                                    UNZZIP TRUTH <br>
                                    customer service department,<br>
                                    support@unzziptruth.com
                                </p>
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
        email: c,
        subject: "Forgot password",
        html
    })
    res.status(200).json({
        success: true,
    })
})
exports.taro = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const date = new Date()
    user = await User.findOneAndUpdate({ _id: id }, { taro: date }, { new: true });
    res.status(200).json({
        success: true,
        user
    })
})
exports.resetPassword = catchAsyncErrors(async (req, res) => {
    const { password, token } = req.body
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!verifyToken) {
        throw new ErrorHandler("Link expired Try again", 401)
    }
    const user = await User.findOne({ _id: verifyToken.id })
    user.password = password
    await user.save()
    res.status(200).json({
        user, success: true
    })
})
exports.Search = catchAsyncErrors(async (req, res) => {
    const { q } = req.body
    const astrologers = await User.find({
        $and: [
            { $text: { $search: q } },
            { astrologer: "approved" }
        ]
    })
    // .find({ _id: { $ne: _id } })
    res.status(200).json({
        success: true,
        astrologers,
    })

})
exports.weekly = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysUntilNextSaturday = 6 - currentDayOfWeek;
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilNextSaturday);
    const a = await User.findByIdAndUpdate({ _id: id }, {
        $set: { week: nextSaturday }, // Set the new value for the week field
        $inc: { balance: -8 } // Subtract amountToSubtract from the balance field
    }, { new: true })
    res.status(200).json({ success: true, user: a })

})
exports.monthly = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const today = new Date();
    const a = await User.findByIdAndUpdate({ _id: id }, { $set: { month: today.getMonth() + 1 }, $inc: { balance: -16 } }, { new: true })
    res.status(200).json({ success: true, user: a })


})
exports.yearly = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const today = new Date();
    const a = await User.findByIdAndUpdate({ _id: id }, { $set: { year: today.getFullYear() }, $inc: { balance: -27 } }, { new: true })
    res.status(200).json({ success: true, user: a })
})
exports.ApplyForAstro = catchAsyncErrors(async (req, res) => {
    const { id, ...r } = req.body
    const s = await User.findOneAndUpdate({ _id: id }, { astrologer: "applied", ...r }, { new: true })
    res.status(200).json({
        success: true,
        user: s,
    })
})
exports.AcceptAstroRequest = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const s = await User.findOneAndUpdate({ _id: id }, { astrologer: "approved" }, { new: true })
    const a = await User.find({ astrologer: "applied" })
    res.status(200).json({
        success: true,
        astrologer: s,
        astrologerRequest: a,
    })
})
exports.RejectAstroRequest = catchAsyncErrors(async (req, res) => {
    const { id } = req.body
    const s = await User.findOneAndUpdate({ _id: id }, { astrologer: "rejected" }, { new: true })
    const a = await User.find({ astrologer: "applied" })
    res.status(200).json({
        success: true,
        astrologer: s,
        astrologerRequest: a,
    })
})
exports.GetAstrologerRequest = catchAsyncErrors(async (req, res) => {
    const a = await User.find({ astrologer: "applied" })
    res.status(200).json({
        success: true,
        astrologerRequest: a,
    })
})
exports.GetAstrologers = catchAsyncErrors(async (req, res) => {
    const a = await User.find({ astrologer: "approved" })
    res.status(200).json({
        success: true,
        astrologers: a,
    })
})
exports.GetAstrologer = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const Astrologer = await User.findOne({ _id: id }).select("-password")
    res.status(200).json({ astrologer: Astrologer, success: true })
})
exports.Update = catchAsyncErrors(async (req, res, next) => {
    const { name, dob, zodiac, country, profile, id } = req.body
    const u = {}
    if (name) u.name = name
    if (dob) u.dob = dob
    if (country) u.country = country
    if (zodiac) u.zodiac = zodiac
    if (profile) {
        let a = await cloudinary.v2.uploader.upload(profile, { folder: "avatar", })
        u.avatar = {
            public_id: a.public_id,
            url: a.secure_url
        }
    }
    const user = await User.findOneAndUpdate({ _id: id }, { ...u }, { new: true })
    res.status(200).json({
        success: true,
        user,
    })
})
exports.refundRequest = catchAsyncErrors(async (req, res, next) => {
    let { userId, sessionId, reason, title, description } = req.body;

    if (!sessionId) {
        res.status(200).json({ status: false, msg: "session id required." })
    }

    let checkSession = await sessionModel.findOne({ _id: sessionId, refundId: null });

    if (!checkSession) {
        res.status(200).json({ status: false, msg: "Refund request already send!" })
    }
    let createReason
    if (!reason) {
        let obj = {
            title,
            description,
            user: userId
        }
        createReason = await reasonModel.create(obj)
    }
    reason = reason ? reason : createReason._id
    let refundRequest = await sessionModel.findByIdAndUpdate(sessionId, { refundStatus: "pending", userReason: reason }, { new: true });
    if (refundRequest) {
        res.status(200).json({ success: true, refundRequest })
    }
    else {
        res.status(200).json({ success: false })
    }



})
exports.viewRefundStatus = catchAsyncErrors(async (req, res, next) => {
    let { userId, sessionId } = req.body;

    if (!userId) {
        res.status(200).json({ status: false, msg: "user id required." })
    }

    if (!sessionId) {
        res.status(200).json({ status: false, msg: "session id required." })
    }

    let checkSession = await sessionModel.findOne({ $and: [{ _id: sessionId }, { user: userId }] });

    if (checkSession) {
        res.status(200).json({ success: true, sessionId, requestStatus: checkSession.refundStatus })
    }

})

// exports.addID = catchAsyncErrors(async (req, res, next) => {
//     // let { userId, sessionId } = req.body;


//     let users = await userModel.find()
//     let id = 99999
//     for (let index = 0; index < users.length; index++) {
//         id = id +1
//         console.log(id);

//         let update = await userModel.findByIdAndUpdate({_id:users[index]._id}, { $set: { id: id } }, { new: true })
//         console.log(update);

//     }
//     res.status(200).json({ success: true })

// })
exports.GetUserProfile = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params
    const user = await User.findOne({ _id: id }).select("-password")
    user.balance = user.balance.toFixed(2)
    res.status(200).json({ success: true, user: user })
})

exports.changePassword = async (req, res) => {
    try {

        const { userId, oldPassword, newPassword, confirmPassword } = req.body;
        if (!userId) {
            return res.status(200).json({ status: false, msg: "userId is required!" });
        }
        if (!oldPassword) {
            return res.status(200).json({ status: false, msg: "old password is required!" });
        }
        if (!newPassword) {
            return res.status(200).json({ status: false, msg: "newPassword is required!" });
        }
        if (!confirmPassword) {
            return res.status(200).json({ status: false, msg: "confirmPassword is required!" });
        }
        if (oldPassword == newPassword) {
            return res.status(200).json({ status: false, msg: "old password and new password should not be same!" });
        }

        let check = await userModel.findById(userId)
        if (!check) {
            return res.status(200).json({ status: false, msg: "user not found!" });
        }
        let decryptpassword = await bcrypt.compare(oldPassword, check.password);
        if (!decryptpassword) {
            return res.status(200).json({ status: false, msg: "Invalid oldPassword!" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        let update = await userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true })

        if (update) {
            return res.status(200).json({ status: true, msg: "Password changed successfully" });
        } else {
            return res.status(200).json({ status: false, msg: "Something went wrong!" });

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, msg: "server error" });
    }
};


exports.calculateSunSign = async (req, res) => {
    try {

        let date = req.body.dob
        if (!date) {
            return res.status(200).json({ status: false, msg: "Please enter Date of Birth!" })
        }
        function calculateSunSignn(date) {
            // Extract month and day from the date
            let dateofbirth = new Date(date)
            const month = dateofbirth.getMonth() + 1; // getMonth() returns 0-11
            const day = dateofbirth.getDate();

            console.log({ month, day });
            // Define the ranges for each sun sign
            const signRanges = [
                { sign: "Capricorn", startMonth: 1, startDay: 1, endMonth: 1, endDay: 19 },
                { sign: "Aquarius", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
                { sign: "Pisces", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
                { sign: "Aries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
                { sign: "Taurus", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
                { sign: "Gemini", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
                { sign: "Cancer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
                { sign: "Leo", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
                { sign: "Virgo", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
                { sign: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
                { sign: "Scorpio", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
                { sign: "Sagittarius", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
                { sign: "Capricorn", startMonth: 12, startDay: 22, endMonth: 12, endDay: 31 }
            ];

            // Find the sign that corresponds to the date
            for (const signRange of signRanges) {
                if ((month === signRange.startMonth && day >= signRange.startDay) ||
                    (month === signRange.endMonth && day <= signRange.endDay)) {
                    return signRange.sign;
                }
            }

            // Default return
            return "";
        }

        // Example usage

        // Function to calculate moon sign
        function calculateMoonSign(date) {
            let dateofbirth = new Date(date)

            // Define the zodiac signs and their degrees
            const signs = [
                "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
                "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
            ];
            const degreesPerSign = 30; // Each sign spans 30 degrees

            // Determine the moon's position in the zodiac
            const birthMonth = dateofbirth.getMonth() + 1;
            const birthDay = dateofbirth.getDate();
            const moonPositions = [
                360, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330
            ]; // Moon positions in each sign (0-360 degrees)

            // Calculate the moon's position in degrees
            const position = (birthDay - 1) * (360 / new Date(dateofbirth.getFullYear(), birthMonth, 0).getDate());

            // Determine the moon sign based on its position
            for (let i = 0; i < moonPositions.length; i++) {
                if (position < moonPositions[i]) {
                    return signs[i];
                }
            }

            // Default return
            return "Unknown";
        }

        // Example usage
        const moonSign = calculateMoonSign(date);
        console.log("Moon sign:", moonSign);


        const sunSign = calculateSunSignn(date);
        return res.status(200).json({ status: true, msg: "Success!", sunSign, moonSign })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, msg: "server error" })
    }
}

exports.sunSign = async (req, res) => {
    try {
        let { userId } = req.body;

        if (!userId) { return res.status(200).json({ status: false, message: "user Id is required!" }); }

        let user = await userModel.findById(userId);
        if (!user) { return res.status(200).json({ status: false, message: "no user found!" }); }
        let dob = user.dob


        const formattedDob = await formatDateToDayMonth(dob);

        const zodiacSigns = await sunSignModel.find().lean();

        const matchingSign = zodiacSigns.find(sign => {
            const { startDate, endDate } = sign;
            const start = parseDate(startDate);
            const end = parseDate(endDate);
            const dobDate = parseDate(formattedDob);

            if (start > end) { return dobDate >= start || dobDate <= end; }
            return dobDate >= start && dobDate <= end;
        });


        if (matchingSign) {
            return res.status(200).json({ status: true, message: "success", data: matchingSign });
        }
        else { return res.status(200).json({ status: false, message: "unsuccess" }); }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};

async function formatDateToDayMonth(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long' };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
}

function parseDate(dateStr) {
    const [day, month] = dateStr.split(' ');
    return new Date(Date.parse(`${day} ${month} 2000`)); // Use a non-leap year for simplicity
}


exports.updateSunsign = async (req, res) => {
    try {
        let { id, image } = req.body
        const u = {}
        if (image) {
            let a = await cloudinary.v2.uploader.upload(image, { folder: "avatar", })
            u.image = {
                public_id: a.public_id,
                url: a.secure_url
            }
        }
        let update = await sunSignModel.findByIdAndUpdate(id, { ...u }, { new: true })
        console.log({ update });
        return res.status(200).send({ status: true, message: "Success", update })


    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: "server error" })
    }
}


