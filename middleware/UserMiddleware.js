const jwt = require('jsonwebtoken');
const {
    User
} = require('../models');

exports.authMiddleware = async (req, res, next) => {
    // fungsi jika di header kita masukan token atau tidak

    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        return next(res.status(401).json({
            status: 401,
            message: "anda belum login/register token tidak ditemukan"
        }))
    }

    let decoded;
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return next(res.status(401).json({
            error: err,
            message: "Token yang di masukan tidak ditemukan/tidak ada"
        }))
    }

    // ambil data user berdasarkan kondisi decoded
    const currentUser = await User.findByPk(decoded.id)
    // console.log(currentUser)
    if(!currentUser){
        return next(res.status(401).json({
            status: 401,
            message: "User sudah terhapus token sudah tidak bisa di gunakan"
        }))
    }
    req.user;

    next()

}