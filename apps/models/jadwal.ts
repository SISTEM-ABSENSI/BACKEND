import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface JadwalAttributes extends ZygoteAttributes {
  jadwalId: number
  tokoId: number
  spgId: number
  date: string
  checkIn: string
  checkOut: string
}

type JadwalCreationAttributes = Optional<JadwalAttributes, 'createdAt' | 'updatedAt'>

export interface JadwalInstance
  extends Model<JadwalAttributes, JadwalCreationAttributes>,
    JadwalAttributes {}

export const JadwalModel = sequelize.define<JadwalInstance>(
  'Jadwal',
  {
    ...ZygoteModel,
    jadwalId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    tokoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spgId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
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
    tableName: 'jadwal',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
