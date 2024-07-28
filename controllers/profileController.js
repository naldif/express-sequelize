const asyncHandle = require('../middleware/asyncHandle')
const {
    Profile
} = require('../models')

exports.updateOrCreateProfile = asyncHandle(async (req, res) => {
    const {
        age,
        bio,
        address
    } = req.body;
    const idUser = req.user.id;

    let message = "";
    let dataProfile = "";

    const userData = await Profile.findOne({
        where: {
            userId: idUser
        }
    });

    if (userData) {
        // Update Profile
        await userData.update({
            age: age || userData.age,
            bio: bio || userData.bio,
            address: address || userData.address,
        });

        message = "Profile berhasil diupdate";
        dataProfile = userData
    } else {
        // Create Profile
        await Profile.create({
            age,
            bio,
            address,
            userId: idUser
        });

        message = "Profile berhasil dibuat";
        dataProfile = userData
    }

    return res.status(201).json({
        message: message,
        data: dataProfile

    });
});