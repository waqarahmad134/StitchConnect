module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
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
    Category.associate = (models) => {
        
        Category.hasMany(models.User);
        models.User.belongsTo(Category);

    };

    return Category;
};
