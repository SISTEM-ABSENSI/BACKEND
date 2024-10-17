import { Router } from 'express'
import { spgControllers } from '../../controllers/spg'

const router = Router()

router.get('/', spgControllers.findAll)
router.get('/detail/:spgId', spgControllers.findOne)
router.post('/', spgControllers.create)
router.put('/', spgControllers.update)
router.delete('/:spgId', spgControllers.remove)

export default router
