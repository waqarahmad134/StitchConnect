module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
        color: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

       
    });

    // Each user can have one email verification code
    Color.associate = (models) => {
        
       
    };

    return Color;
};
