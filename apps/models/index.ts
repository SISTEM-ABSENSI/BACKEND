import dotenv from 'dotenv'
import { type Options, Sequelize } from 'sequelize'
import { APP_CONFIGS } from '../configs'
dotenv.config()

const dataBaseConfig: Options | any = APP_CONFIGS.dataBase.development

export const sequelize = new Sequelize(dataBaseConfig)
