module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(72),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    backgroundColor: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    productDisplay: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    lat: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    lng: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    userType: {
      type: DataTypes.STRING(),
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Product);
    models.Product.belongsTo(User);

    User.hasMany(models.Order);
    models.Order.belongsTo(User);

    User.hasMany(models.Chat, { onDelete: "cascade", foreignKey: "senderId" });
    models.Chat.belongsTo(User, { as: "Sender", foreignKey: "senderId" });
    
    User.hasMany(models.Chat, { onDelete: "cascade", foreignKey: "recieverId" });
    models.Chat.belongsTo(User, { as: "Reciever", foreignKey: "recieverId" });
  };

  return User;
};
