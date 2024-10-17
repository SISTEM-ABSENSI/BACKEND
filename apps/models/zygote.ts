import { DataTypes, Sequelize } from 'sequelize'

export const ZygoteModel = {
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now')
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  deleted: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  }
}

export interface ZygoteAttributes {
  createdAt: string
  updatedAt: string | null
  deleted: number
}
