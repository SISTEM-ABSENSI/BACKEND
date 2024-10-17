import { Router } from 'express'
import { tokoControllers } from '../../controllers/toko'

const router = Router()

router.get('/', tokoControllers.findAll)
router.get('/detail/:tokoId', tokoControllers.findOne)
router.post('/', tokoControllers.create)
router.put('/', tokoControllers.update)
router.delete('/:tokoId', tokoControllers.remove)

export default router
