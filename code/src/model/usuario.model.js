import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db.js'

class Usuario extends Model { }
Usuario.init({
    Nome_Conta: { type: DataTypes.STRING, primaryKey: true },
    Senha:{ type: DataTypes.STRING, allowNull: false },
    Nome_usuario: { type: DataTypes.STRING, allowNull: false },
    Data_nascimento: { type: DataTypes.DATE, allowNull: false },
    Cidade: { type: DataTypes.STRING, allowNull: false },
    Estado: { type: DataTypes.STRING, allowNull: false },
    Endereço:{ type: DataTypes.STRING, allowNull: false },
    Preferências:{ type: DataTypes.STRING, allowNull: false },
    Sobre:{ type: DataTypes.STRING, allowNull: true },
    Foto:{ type: DataTypes.STRING, allowNull: false },
}, { sequelize: sequelize, timestamps: false })

export default Usuario