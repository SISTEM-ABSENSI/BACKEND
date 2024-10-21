/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from '.'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface UserAttributes extends ZygoteAttributes {
  userId: string
  userName: string
  userEmail: string
  userPassword: string
  userRole: 'admin' | 'user'
}

// Specifying optional attributes for creation
type UserCreationAttributes = Optional<UserAttributes, 'createdAt' | 'updatedAt'>

// Extending Model with UserAttributes and UserCreationAttributes
export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

// Define the UserModel
export const UserModel = sequelize.define<UserInstance>(
  'User',
  {
    ...ZygoteModel,
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userRole: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    }
  },
  {
    tableName: 'users',
    timestamps: true, // Setting timestamps to true for createdAt and updatedAt
    paranoid: true, // Enables soft deletes with deletedAt
    underscored: true, // Converts camelCase to snake_case for columns
    freezeTableName: true, // Disables plural table names
    engine: 'InnoDB'
  }
)
