'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "name product sudah ada, silahkan masukan name product lain!"
      },
      validate: {
        notNull: {
           msg: "Inputan product harus diisi"
        }
      }
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
           msg: "Inputan price product harus diisi"
        }
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
           msg: "Inputan categoryId product harus diisi"
        },
        isInt: true,
        isExist(value) { 
          return sequelize.models.Category.findByPk(value).then((el) => {
            if(!el) {
              throw new Error("Category tidak ditemukan")
            }
          }) 
        }
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
           msg: "Inputan image product harus diisi"
        }
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    countReview: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};