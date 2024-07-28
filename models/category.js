'use strict';
const {
  Model
} = require('sequelize');
const { options } = require('../routes/categories');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products' // Alias to use when including
      }); 
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'name kategori sudah ada, silahkan masukan kategori lain'
      },
      validate: {
        notNull: {
          msg: 'inputan data name kategori tidak boleh kosong'
        }
      }
    },
    description: DataTypes.TEXT
  }, {
    hooks: {
      afterValidate: (category, options) => {
        if(category.name) {

          category.name = category.name.toLowerCase() ;
        }
      }
    }, 

    sequelize,
    modelName: 'Category',
  });
  return Category;
};