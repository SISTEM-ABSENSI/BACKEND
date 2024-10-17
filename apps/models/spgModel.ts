import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from './index'
import { ZygoteAttributes, ZygoteModel } from './zygote'

export interface spgAttributes extends ZygoteAttributes {
  spgId: number
  spgName: string
  spgDeviceId: string
  spgContact: string
  spgSupplierId: string
  spgPassword: string
}

type spgCreationAttributes = Optional<spgAttributes, 'createdAt' | 'updatedAt'>

export interface SpgInstance
  extends Model<spgAttributes, spgCreationAttributes>,
    spgAttributes {}

export const SpgModel = sequelize.define<SpgInstance>(
  'Spg',
  {
    ...ZygoteModel,
    spgId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    spgName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    spgDeviceId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    spgContact: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    spgSupplierId: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    spgPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'spg',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
