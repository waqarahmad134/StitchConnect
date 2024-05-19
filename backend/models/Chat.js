module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        message: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

       
    });

    // Each user can have one email verification code
    Chat.associate = (models) => {
        
        // Category.hasMany(models.User);
        // models.User.belongsTo(Category);

    };

    return Chat;
};
