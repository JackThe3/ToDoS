import { Model, Sequelize, DataTypes } from 'sequelize';

export interface TaskAttributes {
    id?: number
    title: string
    description?: string
    deadline?: Date
    status: string
    UserId: number
    TodoId: number
}

export default class Task extends Model<TaskAttributes> implements TaskAttributes{
    public id!: number;
    public deadline!: Date;
    public description!: string;
    public status!: string;
    public title!: string;
    public UserId!: number;
    public TodoId!: number;

}

export const TaskMap = (sequelize: Sequelize) => {
    Task.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        deadline:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        TodoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'task',
        timestamps: false
    });

}

