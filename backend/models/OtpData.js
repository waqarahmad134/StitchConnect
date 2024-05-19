module.exports = (sequelize, DataTypes) =>{
    const OtpData = sequelize.define('OtpData', {
        requestAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        otp: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
      
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
       
    });
   
   
    return OtpData;
};