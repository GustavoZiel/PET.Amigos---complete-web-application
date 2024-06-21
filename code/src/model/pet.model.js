import { Model, DataTypes } from "sequelize"
import sequelize from '../db/db.js'

class Pet extends Model { }
Pet.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    birth: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING },
    sex: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false },
    photos: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: false },
    temperament: { type: DataTypes.ARRAY(DataTypes.STRING) },
    vacinated: { type: DataTypes.BOOLEAN, allowNull: false },
    adopted: { type: DataTypes.BOOLEAN, allowNull: false }
  },
  { sequelize: sequelize, timestamps: false },
);

export default Pet;