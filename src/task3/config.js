import process from 'process';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const DB_CONNECTION = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fanny.db.elephantsql.com/${process.env.DB_NAME}`;

export const ROUTER_PATH = {
    user: '/users/:id',
    users: '/users',
    group: '/group/:id',
    groups: '/groups'
};

export const SEQUELIZE = (function getSequelize() {
    let instance;
    return function getInstance() {
        if (instance) {
            return instance;
        }
        instance = new Sequelize(DB_CONNECTION, { logging: false });
        return instance;
    };
}());
