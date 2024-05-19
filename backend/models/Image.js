module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        image: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },

       
    });

    // Each user can have one email verification code
    Image.associate = (models) => {
        
       
    };

    return Image;
};
