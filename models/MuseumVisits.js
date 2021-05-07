export default (sequelize, DataTypes) => {
  const MuseumVisits = sequelize.define(
    'museum_visits',
    {
      visitor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      museum_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      visit_date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true
      },
      member_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {freezeTableName: true, timestamps: false}
  );
  MuseumVisits.associate = (models) => {
    MuseumVisits.belongsTo(models.Visitors, {
      foreignKey: 'visitor_id'
    });
    MuseumVisits.belongsTo(models.MuseumInfo, {
      foreignKey: 'museum_id'
    });
    MuseumVisits.belongsTo(models.VisitorTransactions, {
      through: models.Visitors,
      foreignKey: 'visitor_id'
    });
  };
  return MuseumVisits;
};
