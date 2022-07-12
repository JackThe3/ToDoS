import { Model, Sequelize, DataTypes } from 'sequelize';
import Todo from "./todo";
import Task from "./task";

export interface UserAttributes {
    id?: number
    email: string
    password: string
}

export default class User extends Model<UserAttributes> implements UserAttributes{
    public id!: number;
    public email!: string;
    public password!: string;
    public Todos?: Todo[];
    public addTodo!: (todo : Todo) => Promise<void>
}

export const UserMap = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false
    });
    User.belongsToMany(Todo, { through: 'users_todos' });
    Todo.belongsToMany(User, { through: 'users_todos' });
    User.hasMany(Task, {
        foreignKey: 'UserId'
    });
    Task.belongsTo(User);
}
