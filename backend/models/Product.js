module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        userType: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING(),
            allowNull: true,
        },

       
    });

    Product.associate = (models) => {
        Product.hasMany(models.Color);
        models.Color.belongsTo(Product);

        Product.hasMany(models.Image);
        models.Image.belongsTo(Product);

    };

    return Product;
};
