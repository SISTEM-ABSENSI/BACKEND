/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from './index'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { StoreModel } from './storeModel'
import { UserModel } from './user'
import { AttendanceHistoryModel } from './attendanceHistoryModel'
import { TodoListModel } from './todoListModel'

export interface ScheduleAttributes extends ZygoteAttributes {
  scheduleId: number
  scheduleName: string
  scheduleDescription: string
  scheduleStoreId: number // Foreign key to Toko
  scheduleUserId: number
  scheduleStartDate: string
  scheduleEndDate: string
  scheduleStatus: 'waiting' | 'checkin' | 'checkout' | 'outside'
  scheduleOntime: boolean
}

type ScheduleCreationAttributes = Optional<ScheduleAttributes, 'createdAt' | 'updatedAt'>

export interface ScheduleInstance
  extends Model<ScheduleAttributes, ScheduleCreationAttributes>,
    ScheduleAttributes {}

export const ScheduleModel = sequelize.define<ScheduleInstance>(
  'Schedules',
  {
    ...ZygoteModel,
    scheduleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    scheduleName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    scheduleDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    scheduleStoreId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Stores', // Relation with the Toko model
        key: 'storeId'
      }
    },
    scheduleUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scheduleStartDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    scheduleEndDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    scheduleStatus: {
      type: DataTypes.ENUM('waiting', 'checkin', 'checkout', 'outside'),
      allowNull: true,
      defaultValue: 'waiting'
    },
    scheduleOntime: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  },
  {
    tableName: 'schedules',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
)

// One-to-One relation between Schedule and Toko
ScheduleModel.belongsTo(StoreModel, { foreignKey: 'scheduleStoreId', as: 'store' })
StoreModel.hasOne(ScheduleModel, { foreignKey: 'scheduleStoreId', as: 'schedule' })
ScheduleModel.belongsTo(UserModel, { foreignKey: 'scheduleUserId', as: 'user' })
UserModel.hasOne(ScheduleModel, { foreignKey: 'scheduleUserId', as: 'schedule' })

ScheduleModel.hasOne(AttendanceHistoryModel, {
  foreignKey: 'attendanceHistoryScheduleId',
  as: 'attendanceHistory'
})

ScheduleModel.hasMany(TodoListModel, {
  foreignKey: 'todoListScheduleId',
  as: 'todoList'
})
