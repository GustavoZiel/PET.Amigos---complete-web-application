import { Model, DataTypes } from "sequelize"
import sequelize from '../config/db.js'

class Pet extends Model { }

Pet.init({
    Id_pet: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Nome_pet: { type: DataTypes.STRING, allowNull: false },
    Status_adoção: { type: DataTypes.BOOLEAN, allowNull: false}.allowNull,
    Nascimento: { type: DataTypes.DATE, allowNull: true },
    Cidade: { type: DataTypes.STRING, allowNull: false },
    Estado: { type: DataTypes.STRING, allowNull: false },
    Espécie:{ type: DataTypes.STRING, allowNull: false },
    Raça:{ type: DataTypes.STRING, allowNull: true },
    Porte:{ type: DataTypes.STRING, allowNull: true },
    Sobre:{ type: DataTypes.STRING, allowNull: true },
    Foto:{ type: DataTypes.STRING, allowNull: false },
}, { sequelize: sequelize, timestamps: false })

export default Pet 