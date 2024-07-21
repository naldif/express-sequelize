const { Category } = require("../models")

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

exports.storeCategory = async(req, res) => {
    // let name = req.body.name;
    // let description = req.body.description;
    try {  
        let { name, description } = req.body
        const newCategory = await Category.create({
            name,
            description
        })

        res.status(200).json({
            status: "Success",
            data: newCategory
        })

    } catch (error) {   
        return res.status(400).json({
            status: "fail",
            error: error.errors
        })
    }
}