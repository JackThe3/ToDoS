// eslint-disable-next-line @typescript-eslint/no-var-requires
//const app = require('../../src/app');
require('dotenv').config()

const env = 'development';
const dialect = 'postgres';

module.exports = {
  [env]: {
    dialect,
    url:process.env.DB_URL,
    migrationStorageTableName: '_migrations'
  }
};
