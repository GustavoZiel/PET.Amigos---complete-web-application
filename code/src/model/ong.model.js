import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/db.js'
import Pet from './pet.model.js'

class ONG extends Model { }
ONG.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true  },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password:{ type: DataTypes.STRING, allowNull: false },
    ongName: { type: DataTypes.STRING, allowNull: false },
    creationYear: { type: DataTypes.DATE, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    address:{ type: DataTypes.STRING, allowNull: false },
    CNPJ:{ type: DataTypes.STRING, allowNull: true },
    pets:{ type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
    about:{ type: DataTypes.STRING, allowNull: false },
    photo:{ type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    website: { type: DataTypes.STRING, allowNull: true},
    instagram: { type: DataTypes.STRING, allowNull: true },
    facebook: { type: DataTypes.STRING, allowNull: true },
    whatsapp: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: false },
    pix: { type: DataTypes.STRING, allowNull: true },
    contribute: { type: DataTypes.STRING, allowNull: true },
}, { sequelize: sequelize, timestamps: false });


ONG.hasMany(Pet, { onDelete: 'CASCADE' });
Pet.belongsTo(ONG);

export default ONG;