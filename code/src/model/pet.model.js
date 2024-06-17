import { Model, DataTypes } from "sequelize"
import sequelize from '../db/db.js'

class Pet extends Model { }
Pet.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    birth: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    breed: { type: DataTypes.STRING },
    sex: { type: DataTypes.STRING },
    size: { type: DataTypes.STRING },
    photos: { type: DataTypes.STRING },
    comment: { type: DataTypes.STRING },
    temperament: { type: DataTypes.ARRAY(DataTypes.STRING) },
    vacinated: { type: DataTypes.BOOLEAN },
    adopted: { type: DataTypes.BOOLEAN }
  },
  { sequelize: sequelize, timestamps: false },
);

export default Pet;