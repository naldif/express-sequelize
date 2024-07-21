const { Category } = require("../models")

exports.getAllCategories = async(req, res) => {
   
    try {
        const categories = await Category.findAll();

        return res.status(200).json({
            status: "success",
            data: categories
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error: "Server down"
        })
    }
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
            status: "success",
            data: newCategory
        })

    } catch (error) {   
        return res.status(400).json({
            status: "fail",
            error: error.errors
        })
    }
}

exports.detailCategory = async(req, res) => {
   
    try {
        const detailCategory = await Category.findByPk(req.params.id);
        if(!detailCategory){
            return res.status(404).json({
                status: "fail",
                message: "Data tidak di temukan"
            })
        }
        res.status(200).json({
            status: "success",
            data: detailCategory
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            error: 'server down'
        })
    }
}