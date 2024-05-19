module.exports = (sequelize, DataTypes) => {
    const ShopCategory = sequelize.define('ShopCategory', {
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
    ShopCategory.associate = (models) => {
        
        ShopCategory.hasMany(models.User);
        models.User.belongsTo(ShopCategory);

    };

    return ShopCategory;
};
