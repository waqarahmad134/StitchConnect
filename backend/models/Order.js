module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        price: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        paymentStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }, 
    });

    // Each user can have one email verification code
    Order.associate = (models) => {
        
        Order.hasMany(models.OrderItem);
        models.OrderItem.belongsTo(Order);

    };

    return Order;
};
