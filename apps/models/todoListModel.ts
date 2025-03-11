/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from './index'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface TodoListAttributes extends ZygoteAttributes {
  todoListId: number
  todoListName: string
  todoListScheduleId: number
  todoListStatus?: boolean
}

type TodoListCreationAttributes = Optional<TodoListAttributes, 'createdAt' | 'updatedAt'>

export interface TodoListInstance
  extends Model<TodoListAttributes, TodoListCreationAttributes>,
    TodoListAttributes {}

export const TodoListModel = sequelize.define<TodoListInstance>(
  'TodoLists',
  {
    ...ZygoteModel,
    todoListId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    todoListName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    todoListScheduleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    todoListStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  },
  {
    tableName: 'todo_lists',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
)
