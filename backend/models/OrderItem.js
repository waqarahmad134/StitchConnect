module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        productId: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING(),
            allowNull: true,
        },

       
    });

// [{productid,qty,price},{productid,qty,price}]

    // Each user can have one email verification code
    OrderItem.associate = (models) => {
        
        // Order.hasMany(models.User);
        // models.User.belongsTo(Order);

    };

    return OrderItem;
};
