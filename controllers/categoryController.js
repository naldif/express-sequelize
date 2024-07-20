exports.getAllCategories = (req, res) => {
    // console.log(req.requestTime)
    res.status(200).json({
        status: "success",
        data: [{
                "id": "01",
                "name": "ipone"
            },
            {
                "id": "02",
                "name": "PC"
            },
            {
                "id": "03",
                "name": "Laptop"
            },
        ]
    })
}

exports.storeCategory = (req, res) => {
    let name = req.body.name;
    let description = req.body.description;

    if (!name && !description) {
        return res.status(400).json({
            status: "false",
            error: "validasi gagal"
        })
    }

    return res.status(200).json({
        status: "true",
        message: "validasi Berhasil"
    })
}