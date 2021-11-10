import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

export const ROUTER_PATH = {
    user: '/users/:id',
    users: '/users'
};

export const DB_CONNECTION = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fanny.db.elephantsql.com/${process.env.DB_NAME}`;
