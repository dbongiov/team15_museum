export default (sequelize, DataTypes) => {
  const StaffRole = sequelize.define(
    'staff_role',
    {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      role_title: {
        type: DataTypes.STRING
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return StaffRole;
};