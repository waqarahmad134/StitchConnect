module.exports = (sequelize, DataTypes) => {
    const TailorCategory = sequelize.define('TailorCategory', {
        title: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    });

    TailorCategory.associate = (models) => {  
        TailorCategory.hasMany(models.User);
        models.User.belongsTo(TailorCategory);

    };
    return TailorCategory;
};
