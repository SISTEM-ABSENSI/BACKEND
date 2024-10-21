/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from './index'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface AbsenAttributes extends ZygoteAttributes {
  absenId: number
  spgId: number
  tokoId: number
  position: string
  checkIn: string
  checkOut: string
}

type AbsenCreationAttributes = Optional<AbsenAttributes, 'createdAt' | 'updatedAt'>

export interface AbsenInstance
  extends Model<AbsenAttributes, AbsenCreationAttributes>,
    AbsenAttributes {}

export const AbsenModel = sequelize.define<AbsenInstance>(
  'Absen',
  {
    ...ZygoteModel,
    absenId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    spgId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tokoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    checkIn: {
      type: DataTypes.DATE,
      allowNull: true
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'absen',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
