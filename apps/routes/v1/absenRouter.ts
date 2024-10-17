import { Router } from 'express'
import { absenControllers } from '../../controllers/absen'

const router = Router()

router.get('/', absenControllers.findAll)
router.get('/detail/:absenId', absenControllers.findOne)
router.post('/', absenControllers.create)
router.put('/', absenControllers.update)
router.delete('/:absenId', absenControllers.remove)

export default router
