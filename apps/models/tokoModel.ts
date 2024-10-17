import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface TokoAttributes extends ZygoteAttributes {
  tokoId: number
  tokoName: string
  tokoPosition: string
}

type TokoCreationAttributes = Optional<TokoAttributes, 'createdAt' | 'updatedAt'>

export interface TokoInstance
  extends Model<TokoAttributes, TokoCreationAttributes>,
    TokoAttributes {}

export const TokoModel = sequelize.define<TokoInstance>(
  'Toko',
  {
    ...ZygoteModel,
    tokoId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    tokoName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tokoPosition: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'supplier',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
