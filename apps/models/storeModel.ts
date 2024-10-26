/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from './index'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface StoreAttributes extends ZygoteAttributes {
  storeId: number
  storeName: string
  storeLongitude: string
  storeLatitude: string
}

type StoreCreationAttributes = Optional<StoreAttributes, 'createdAt' | 'updatedAt'>

export interface StoreInstance
  extends Model<StoreAttributes, StoreCreationAttributes>,
    StoreAttributes {}

export const StoreModel = sequelize.define<StoreInstance>(
  'Stores',
  {
    ...ZygoteModel,
    storeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    storeName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    storeLongitude: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    storeLatitude: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'stores',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
