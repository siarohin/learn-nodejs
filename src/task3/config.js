import { Sequelize } from 'sequelize';

export const ROUTER_PATH = {
    user: '/users/:id',
    users: '/users'
};

export const SEQUELIZE = new Sequelize('postgres://xsaszisc:63vDLfB5J2_b3FpUn_Ad5B14qVlMXixY@fanny.db.elephantsql.com/xsaszisc', { logging: false });
