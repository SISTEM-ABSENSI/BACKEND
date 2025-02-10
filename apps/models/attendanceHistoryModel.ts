/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from './index'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface AttendanceHistoryAttributes extends ZygoteAttributes {
  attendanceHistoryId: number
  attendanceHistoryScheduleId: number
  attendanceHistoryUserId: number
  attendanceHistoryTime: string
  attendanceHistoryPhoto: string
  attendanceHistoryCategory: 'checkin' | 'checkout'
}

type AttendanceHistoryCreationAttributes = Optional<
  AttendanceHistoryAttributes,
  'createdAt' | 'updatedAt'
>

export interface AttendanceHistoryInstance
  extends Model<AttendanceHistoryAttributes, AttendanceHistoryCreationAttributes>,
    AttendanceHistoryAttributes {}

export const AttendanceHistoryModel = sequelize.define<AttendanceHistoryInstance>(
  'AttendanceHistory',
  {
    ...ZygoteModel,
    attendanceHistoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    attendanceHistoryScheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attendanceHistoryUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attendanceHistoryTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    attendanceHistoryCategory: {
      type: DataTypes.ENUM('checkin', 'checkout'),
      allowNull: false
    },
    attendanceHistoryPhoto: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'attendance_histories',
    timestamps: true,
    underscored: true,
    freezeTableName: true
  }
)
