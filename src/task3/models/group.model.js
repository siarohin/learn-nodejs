import _ from 'lodash';
import { DataTypes } from 'sequelize';
import { SEQUELIZE } from '../config';


export const GroupModel = SEQUELIZE().define('Group', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
}, {
    timestamps: false
});
