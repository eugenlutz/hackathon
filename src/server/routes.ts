import express from 'express';
import {
  moveId,
  createId
} from './WarehouseController';

const router = express.Router();

router.post('/move/:id', moveId);
router.put('/create/:id/:bin', createId);

export default router;