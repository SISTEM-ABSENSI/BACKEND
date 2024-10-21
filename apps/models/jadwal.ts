/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from './index'
import { type ZygoteAttributes, ZygoteModel } from './zygote'
import { TokoModel } from './tokoModel'

export interface jadwalAttributes extends ZygoteAttributes {
  jadwalId: number
  jadwalName: string
  jadwalDescription: string
  jadwalTokoId: number // Foreign key ke Toko
  jadwalSpgId: number
  jadwalStartDate: string
  jadwalEndDate: string
  jadwalStatus: 'waiting' | 'checkin' | 'checkout'
}

type jadwalCreationAttributes = Optional<jadwalAttributes, 'createdAt' | 'updatedAt'>

export interface jadwalInstance
  extends Model<jadwalAttributes, jadwalCreationAttributes>,
    jadwalAttributes {}

export const JadwalModel = sequelize.define<jadwalInstance>(
  'Jadwal',
  {
    ...ZygoteModel,
    jadwalId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    jadwalName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    jadwalDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    jadwalTokoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Toko', // Relasi dengan model Toko
        key: 'tokoId'
      }
    },
    jadwalSpgId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jadwalStartDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jadwalEndDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jadwalStatus: {
      type: DataTypes.ENUM('waiting', 'checkin', 'checkout'),
      allowNull: true,
      defaultValue: 'waiting'
    }
  },
  {
    tableName: 'jadwal',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)

// Relasi One-to-One antara Jadwal dan Toko
JadwalModel.belongsTo(TokoModel, { foreignKey: 'jadwalTokoId', as: 'toko' })
TokoModel.hasOne(JadwalModel, { foreignKey: 'jadwalTokoId', as: 'jadwal' })
