/* eslint-disable @typescript-eslint/indent */
import { DataTypes, type Model, type Optional } from 'sequelize'
import { sequelize } from './index'
import { type ZygoteAttributes, ZygoteModel } from './zygote'

export interface SupplierAttributes extends ZygoteAttributes {
  supplierId: number
  supplierName: number
  supplierContact: number
}

type SuplierCreationAttributes = Optional<SupplierAttributes, 'createdAt' | 'updatedAt'>

export interface SaleInstance
  extends Model<SupplierAttributes, SuplierCreationAttributes>,
    SupplierAttributes {}

export const SupplierModel = sequelize.define<SaleInstance>(
  'Suppliers',
  {
    ...ZygoteModel,
    supplierId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    supplierName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    supplierContact: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'suppliers',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  }
)
