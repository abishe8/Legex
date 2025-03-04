import bcryptjs from "bcryptjs"
import crypto from "crypto"

import { User } from "../models/user.model.js"
import { sendResetPasswordEmail, sendResetPasswordSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../Mails/mail.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"

export const checkAuth = async (req, res) => {
    try {
        const userId = req.userId
    
        const user = await User.findOne({ _id:userId })
    
        if(!user)  return res.status(400).json({success:false, message: "User not found"})
    
        res.status(200).json({success:true, message:"Authorized", user:{...user._doc, password:undefined}})
    } catch (error) {
        console.log("Error in check auth:", error);
        return res.status(500).json({success:false, message: "Server error"})
    }
}

export const signup = async (req, res) => {
    const { email, password } = req.body

    try {
        if(!email || !password ){
            return res.status(400).json({ success:false, message:"Please provide all the fields"})
        }
    
        const userAlreadyExists = await User.findOne({ email })
    
        if(userAlreadyExists){
            return res.status(400).json({ success: false, message:"Account already exists"})
        }
    
        const hashedPassword = await bcryptjs.hash(password, 10)
        const verificationToken = Math.floor( 100000 + Math.random() * 900000).toString()
        const verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000
    
        const user = new User({
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt
        })
    
        await user.save();

        generateTokenAndSetCookie(res, user._id)

        await sendVerificationEmail(user.email, user.verificationToken)
    
    
        res.status(201).json({ success:true, message:"Account created successfully", user: {...user._doc, password: undefined}})
    } catch (error) {
        console.log("Error Signing up", error);
        res.status(500).json({ success:false, message:"Server Error"})
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body

    try {
        const user = await User.findOne({ verificationToken:code, verificationTokenExpiresAt: { $gt: Date.now() } })

        if(!user){
            return res.status(400).json({ success:false, message:"Invalid or verification code expired"})
        }
    
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
    
        await user.save()

        await sendWelcomeEmail(user.email, process.env.CLIENT_URL)
    
        res.status(200).json({ success:true, message:"Email verification successfull", user: {...user._doc, password: undefined} })

    } catch (error) {
        console.log("Error in verifying email", error);
        res.status(500).json({ success:false, message:"Server Error"})
    }


}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if(!email || !password){
            return res.status(400).json({ success:false, message:"Please provide all fields"})
        }
        
        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({ success:false, message:"Invalid credentials"})
        }
        
        const isPasswordValid = await bcryptjs.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(400).json({ success:false, message:"Incorrect password"})
        }

        generateTokenAndSetCookie(res, user._id)

        res.status(200).json({ success:true, message: "Logged in successfully", user: {...user._doc, password: undefined}})

    } catch (error) {
        console.log("Error in login", error);
        res.status(500).json({ success:false, message:"Server Error"})
        
    }
}

export const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly:true,
        secure:true,
        sameSite:"none",
        expires:new Date(0),

    });
    res.json({success:true, message:"logged out successfully"})
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        if(!email){
            return res.status(400).json({ success:false, message:"Email cannot be empty"})
        }
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ success:false, message:"Invalid email"})
        }
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

        user.resetPasswordToken = resetToken
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt

        await user.save()

        await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${user.resetPasswordToken}`)

        res.status(200).json({ success:true, message: "Email sent to reset password", user: user._doc})


    } catch (error) {
        console.log("Error in sending reset password email", error);
        res.status(500).json({ success:false, message:"Server Error"})
    }
}

export const resetPassword = async (req, res) => {
    const { password } = req.body

    try {
        if(!password){
            return res.status(400).json({ success:false, message:"Password cannot be empty"})
        }
        const token = req.params.token
    
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiresAt: { $gt: Date.now() }})
    
        if(!user){
            return res.status(400).json({ success:false, message:"Invalid or Reset Link Expired"})
        }
    
        const hashedPassword = await bcryptjs.hash(password, 10)
    
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiresAt = undefined

        await user.save()

        await sendResetPasswordSuccessEmail(user.email)
    
        res.status(200).json({ success:true, message:"Password reset success", user: {...user._doc, password: undefined} })

    } catch (error) {
        console.log("Error resetting password",error);
        res.status(500).json({ success:false, message:"Server Error"})
    }
}