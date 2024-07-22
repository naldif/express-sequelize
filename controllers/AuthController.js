const {
    User
} = require('../models')

exports.registerUser = async (req, res) => {
    try {
        let {
            name,
            email,
            password,
            passwordConfirm
        } = req.body

        if (password != passwordConfirm) {
            return res.status(400).json({
                message: "password dan password confirm tidak sama"
            })
        }

        const newUser = await User.create({
            name,
            email,
            password
        })

        return res.status(201).json({
            message: "Berhasil Register",
            data: newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "validasi error",
            error
        })
    }
}