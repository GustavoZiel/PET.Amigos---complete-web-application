import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/db.js'
import Pet from './pet.model.js'

class ONG extends Model { }
ONG.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true },
    accountName: { type: DataTypes.STRING, primaryKey: true },
    password:{ type: DataTypes.STRING, allowNull: false },
    ongName: { type: DataTypes.STRING, allowNull: false },
    creationYear: { type: DataTypes.DATE, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    address:{ type: DataTypes.STRING, allowNull: false },
    CNPJ:{ type: DataTypes.STRING, allowNull: true },
    pets:{ type: DataTypes.STRING, allowNull: false },
    about:{ type: DataTypes.STRING, allowNull: true },
    photo:{ type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    website: { type: DataTypes.STRING, allowNull: true},
    instagram: { type: DataTypes.STRING, allowNull: true },
    facebook: { type: DataTypes.STRING, allowNull: true },
    twitter: { type: DataTypes.STRING, allowNull: true },
    whatsapp: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: false },
}, { sequelize: sequelize, timestamps: false });

ONG.hasMany(Pet);
Pet.belongsTo(ONG);

export default ONG;