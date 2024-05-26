import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

class ONG extends Model { }
ONG.init({
    Nome_conta: { type: DataTypes.STRING, primaryKey: true },
    Senha:{ type: DataTypes.STRING, allowNull: false },
    Nome_ONG: { type: DataTypes.STRING, allowNull: false },
    Ano_criação: { type: DataTypes.DATE, allowNull: false },
    Cidade: { type: DataTypes.STRING, allowNull: false },
    Estado: { type: DataTypes.STRING, allowNull: false },
    Endereço:{ type: DataTypes.STRING, allowNull: false },
    CNPJ:{ type: DataTypes.STRING, allowNull: true },
    PETS:{ type: DataTypes.STRING, allowNull: false },
    Sobre:{ type: DataTypes.STRING, allowNull: true },
    Foto:{ type: DataTypes.STRING, allowNull: false },
}, { sequelize: sequelize, timestamps: false })

export default ONG