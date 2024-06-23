import { Model, DataTypes } from 'sequelize'
import sequelize from '../db/db.js'
import Pet from './pet.model.js'

class Usuario extends Model { }
Usuario.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false  },
    password: { type: DataTypes.STRING, allowNull: false },
    userName: { type: DataTypes.STRING, allowNull: false },
    birthDate: { type: DataTypes.DATE, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    home: { type: DataTypes.STRING, allowNull: true },
    preferences: { type: DataTypes.STRING, allowNull: false },
    about: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING, allowNull: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, allowNull: true }
}, { sequelize: sequelize, timestamps: false });

const UsuarioPet = sequelize.define('UsuarioPet', {}, { timestamps: false });


Usuario.belongsToMany(Pet, {
    through: UsuarioPet,
    foreignKey: 'accountName',
    otherKey: 'petId'
});
Pet.belongsToMany(Usuario, {
    through: UsuarioPet,
    foreignKey: 'petId',
    otherKey: 'accountName'
});

export { Usuario };
export { UsuarioPet };