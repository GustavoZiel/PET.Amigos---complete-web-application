import { Model, DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
class Contato extends Model { }
Contato.init({
    Num_tel: { type: DataTypes.STRING, primaryKey: true },
    Site: { type: DataTypes.STRING, allowNull: true},
    Instagram: { type: DataTypes.STRING, allowNull: true },
    Facebook: { type: DataTypes.STRING, allowNull: true },
    Twitter: { type: DataTypes.STRING, allowNull: true },
    Whatsapp: { type: DataTypes.STRING, allowNull: true },
}, { sequelize: sequelize, timestamps: false })

export default Contato