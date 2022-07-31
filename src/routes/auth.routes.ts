import express, { Request, Response } from 'express'
import { createSessionHanlder, refreshAcessTokenHandler } from '../controller/auth.controller';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/auth.schema';

const router = express.Router()

router.post('/api/sessions', validateResource(createSessionSchema), createSessionHanlder)
router.post('/api/sessions/refresh', refreshAcessTokenHandler)

export default router;
