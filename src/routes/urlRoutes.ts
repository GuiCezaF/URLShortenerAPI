import { Router } from 'express';

const router = Router();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// router.post('urls', (req, res) => {});

export default router;
