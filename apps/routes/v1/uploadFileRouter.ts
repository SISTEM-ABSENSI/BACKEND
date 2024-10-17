// src/routes/v1/uploadFileRouter.ts

import { Router, Request, Response, NextFunction } from 'express'
import { uploadFile } from '../../controllers/upload-file'
import { uploadMiddleware } from '../../middlewares/upload-file'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { APP_CONFIGS } from '../../configs'

const router = Router()

const checkFileSizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (req.file) {
      const fileSizeInKiloBytes = req.file.size / 1024
      if (fileSizeInKiloBytes > +APP_CONFIGS.maximumUploadFile) {
        throw new Error('Maximum file size is 2MB')
      }
    }
    next()
  } catch (error: any) {
    const message = 'Maximum file size is 2MB'
    const response = ResponseData.error(message)
    res.status(StatusCodes.UNAUTHORIZED).json(response)
  }
}

router.post(
  '/',
  checkFileSizeMiddleware,
  uploadMiddleware.single('file'),
  async (req: Request, res: Response) => await uploadFile(req, res)
)

export default router
