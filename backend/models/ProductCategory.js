module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define('ProductCategory', {
        title: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },  
    });

    // Each user can have one email verification code
    ProductCategory.associate = (models) => {
        
        ProductCategory.hasMany(models.Product);
        models.Product.belongsTo(ProductCategory);

    };

    return ProductCategory;
};
