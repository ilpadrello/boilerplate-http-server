import Knex from 'knex';
import config from '../config';

const dbconfig = config.databases;

if (!dbconfig) {
  console.log(config, dbconfig);
  throw new Error("Couldn't find configuration for Database");
}

const knex = Knex(dbconfig);

export default knex;
