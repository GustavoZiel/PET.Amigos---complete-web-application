import { Model, DataTypes } from 'sequelize'
import sequelize from '../base_dados/db.js'
import Pet from './pet.model.js'

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
    Num_tel: { type: DataTypes.STRING, allowNull: false },
    Site: { type: DataTypes.STRING, allowNull: true},
    Instagram: { type: DataTypes.STRING, allowNull: true },
    Facebook: { type: DataTypes.STRING, allowNull: true },
    Twitter: { type: DataTypes.STRING, allowNull: true },
    Whatsapp: { type: DataTypes.STRING, allowNull: true },
}, { sequelize: sequelize, timestamps: false })

ONG.hasMany(Pet)
Pet.belongsTo(ONG)

export default ONG