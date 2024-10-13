import { Router } from 'express';
import { UrlController } from '../controllers/urlController';

const router = Router();
const linkController = new UrlController();

router.get('/status', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

router.post('/shorten', linkController.shortenUrl);

router.get('/:hash', linkController.redirectToOriginal);

export default router;
