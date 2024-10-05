import express from 'express';
import {
  moveId,
  createId
} from './WarehouseController';

const router = express.Router();

router.post('/move/:id:bin', moveId);
router.post('/move/:id', moveIdAuto)
router.put('/create/:id/', createId);

export default router;