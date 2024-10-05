import express from 'express';
import {
  moveId,
  createId
} from './WarehouseController';

const router = express.Router();

router.post('/entity/move/:id', createId);
router.put('/entity/create/:id/:bin', moveId);

export default router;