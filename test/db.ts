// import { pool, Connection } from '../lib/jt400'
const pool = require('../lib/jt400').pool;
// const Connection = require('../lib/jt400').Connection;
export const jt400 = pool({
    'date format': 'iso'
})