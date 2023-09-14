import { Router } from 'express';
import {
  addService,
  getService,
  searchService,
} from '../controllers/serviceController.js';
import categorySchema, {
  searchServiceNameSchema,
} from '../validation/service.validation.js';

const router = Router();

router.post('/add', categorySchema, addService);
router.get('/get-service', getService);
router.get('/search', searchServiceNameSchema, searchService);

export default router;
