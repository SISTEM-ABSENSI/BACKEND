/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { jadwalControllers } from '../../controllers/jadwal'

const router = Router()

router.get('/', jadwalControllers.findAll)
router.get('/detail/:jadwalId', jadwalControllers.findOne)
router.post('/', jadwalControllers.create)
router.put('/', jadwalControllers.update)
router.delete('/:jadwalId', jadwalControllers.remove)

export default router
