import { Model, Sequelize, DataTypes } from 'sequelize';
import Task from "./task";

export interface TodoAttributes {
    id?: number
    name: string
}

export default class Todo extends Model<TodoAttributes> implements TodoAttributes{
    public id!: number;
    public name!: string;
}

export const TodoMap = (sequelize: Sequelize) => {
    Todo.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'todos',
        timestamps: false
    });
    Todo.hasMany(Task, {
        foreignKey: 'TodoId'
    });
    Task.belongsTo(Todo);
}

