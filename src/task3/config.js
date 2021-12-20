import process from 'process';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { nanoid } from 'nanoid';

dotenv.config();

const DB_CONNECTION = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fanny.db.elephantsql.com/${process.env.DB_NAME}`;

export const ROUTER_PATH = {
    user: '/user/:id',
    users: '/users',
    group: '/group/:id',
    groups: '/groups',
    authenticate: '/login',
    token: '/token'
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

export const CORS_OPTIONS = {
    'origin': '*',
    'methods': 'GET,PUT,PATCH,POST,DELETE',
    'preflightContinue': true,
    'credentials': true,
    'optionsSuccessStatus': 204
};

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || nanoid(48);

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || nanoid(64);

export const ACCESS_TOKEN_DURATION = process.env.ACCESS_TOKEN_DURATION || '10m';

export const REFRESH_TOKEN_DURATION = process.env.REFRESH_TOKEN_DURATION || '1d';
