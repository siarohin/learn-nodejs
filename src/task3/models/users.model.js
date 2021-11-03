import { DataTypes } from 'sequelize';
import { SEQUELIZE } from '../config';

export const UsersModel = SEQUELIZE.define('Users', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.CITEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
});
