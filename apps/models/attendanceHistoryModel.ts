/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from './index'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface AttendanceHistoryAttributes extends ZygoteAttributes {
  attendanceHistoryId: number
  attendanceHistoryUserId: number
  attendanceHistoryTime: string
  attendanceHistoryCategory: 'checkin' | 'checkout' | 'outside'
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
    attendanceHistoryUserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attendanceHistoryTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    attendanceHistoryCategory: {
      type: DataTypes.ENUM('checkin', 'checkout', 'outside'),
      allowNull: false
    }
  },
  {
    tableName: 'attendance_histories',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
