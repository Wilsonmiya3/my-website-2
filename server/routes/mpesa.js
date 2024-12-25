import express from 'express';
import { initializePayment, confirmPayment, checkStatus } from '../controllers/mpesa.js';

const router = express.Router();

router.post('/initialize', initializePayment);
router.post('/confirm', confirmPayment);
router.post('/status', checkStatus);

export default router;