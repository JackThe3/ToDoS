import { db_url } from "./config";
import { Sequelize } from 'sequelize';
import {UserMap} from "./models/user";
import {TodoMap} from "./models/todo";
import {TaskMap} from "./models/task";

const database = new Sequelize(db_url,{dialect: "postgres"});

export function databaseInit() {
    TaskMap(database);
    TodoMap(database);
    UserMap(database);
}

console.log("connected to database")

export default database