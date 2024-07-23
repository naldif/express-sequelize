const {
    User
} = require('../models')
const jwt = require('jsonwebtoken')

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.registerUser = async (req, res) => {
    try {

        if (req.body.password != req.body.passwordConfirm) {
            return res.status(400).json({
                message: "Validasi Error",
                error: ["Password dan Password Confirm tidak sama"]
            })
        }

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        const token = signToken(newUser.id)

        return res.status(201).json({
            message: "Berhasil Register",
            token,
            data: newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "validasi error",
            error: error.errors.map(err => err.message)
        })
    }
}

exports.loginUser = async (req, res) => {

    // fungsi validasi
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: "Fail",
            message: "Error Validasi",
            error: "Please input Email or Password"
        })
    }

    // check jika user email yang di masukan di req sudah ada di DB dan password sudah benar yang di input di req
    const userData = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(!userData || !(await userData.CorrectPassword(req.body.password, userData.password))) {
        return res.status(400).json({
            status: "Fail",
            message: "Error Login",
            error: "Invalid Email or Password"
        })
    }

    const { password, ...userWithoutPassword } = userData.toJSON();

    // token di res pada login
    const token = signToken(userData.id)
    return res.status(200).json({
        status: "Success",
        message: "Berhasil Login",
        data: {
            user: userWithoutPassword,
            token: token
        },
        
    })
}