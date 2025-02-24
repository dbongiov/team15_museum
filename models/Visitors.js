export default (sequelize, DataTypes) => {
  const Visitors = sequelize.define(
    'visitors',
    {
      visitor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      visitor_fn: {
        type: DataTypes.STRING
      },
      visitor_ln: {
        type: DataTypes.STRING
      },
      visitor_phone_num: {
        type: DataTypes.STRING
      },
      visitor_email: {
        type: DataTypes.STRING
      }
    },
    {freezeTableName: true, timestamps: false}
  );
  Visitors.associate = (models) => {
    Visitors.hasMany(models.VisitorTransactions, {
      foreignKey: 'visitor_id'
    });
    Visitors.hasMany(models.MuseumVisits, {
      foreignKey: 'visitor_id'
    });
  };
  return Visitors;
};
