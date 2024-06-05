import { Model, DataTypes } from "sequelize"
import sequelize from '../db/db.js'

class Pet extends Model {}
Pet.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: true },
    birth: { type: DataTypes.STRING, allowNull: true  },
    city: {type: DataTypes.STRING, allowNull: true},
    state: {type: DataTypes.STRING, allowNull: true},
    type: { type: DataTypes.STRING, allowNull: true },
    breed: { type: DataTypes.STRING, allowNull: true  },
    sex: {type: DataTypes.STRING, allowNull: true},
    size: {type: DataTypes.STRING, allowNull: true},
    // Faltando foto
    comment: { type: DataTypes.STRING, allowNull: true  },
    // Faltando temperamento (vetor)
    vacinated: {type: DataTypes.BOOLEAN, allowNull: true},
    adopted: {type: DataTypes.BOOLEAN, allowNull: true}
  },
  { sequelize: sequelize, timestamps: false },
);

export default Pet;