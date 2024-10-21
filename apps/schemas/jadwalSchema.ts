import Joi from 'joi'

export const createJadwalSchema = Joi.object({
  jadwalName: Joi.string().max(100).required(), // Validasi nama jadwal
  jadwalDescription: Joi.string().required(), // Validasi deskripsi jadwal
  jadwalTokoId: Joi.number().integer().positive().required(), // Foreign key ke Toko
  jadwalSpgId: Joi.number().integer().positive().required(),
  jadwalStartDate: Joi.date().optional(), // Tanggal mulai opsional
  jadwalEndDate: Joi.date().optional(), // Tanggal selesai opsional
  jadwalStatus: Joi.string().valid('waiting', 'checkin', 'checkout').optional(), // Status dengan pilihan tertentu
  createdAt: Joi.date().optional()
})

export const updateJadwalSchema = Joi.object({
  jadwalId: Joi.number().integer().positive().required(), // ID wajib untuk update
  jadwalName: Joi.string().max(100).optional(),
  jadwalDescription: Joi.string().optional(),
  jadwalTokoId: Joi.number().integer().positive().optional(),
  jadwalSpgId: Joi.number().integer().positive().optional(),
  jadwalStartDate: Joi.date().optional(),
  jadwalEndDate: Joi.date().optional(),
  jadwalStatus: Joi.string().valid('waiting', 'checkin', 'checkout').optional(),
  updatedAt: Joi.date().optional()
})

export const deleteJadwalSchema = Joi.object({
  jadwalId: Joi.number().integer().positive().required() // Wajib untuk menghapus
})

export const findOneJadwalSchema = Joi.object({
  jadwalId: Joi.number().integer().positive().required()
})

export const findAllJadwalSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().optional(),
  pagination: Joi.boolean().optional()
})
