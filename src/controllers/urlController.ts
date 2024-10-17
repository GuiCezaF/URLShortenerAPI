import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { UrlService } from '../services/urlService';

const urlService = new UrlService();

export class UrlController {
  async shortenUrl(req: Request, res: Response): Promise<void> {
    const { original_url } = req.body;

    if (!original_url) {
      res.status(400).json({ message: 'URL is required' });
      return;
    }

    try {
      const shortened_url = await urlService.createShortUrl(
        original_url,
        `${req.protocol}://${req.get('host')}`,
      );
      logger.info('Url criada', shortened_url);
      res.status(201).json({ shortened_url });
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Error creating short URL' });
    }
  }

  async redirectToOriginal(req: Request, res: Response): Promise<void> {
    const { hash } = req.params;

    try {
      const originalUrl = await urlService.getOriginalUrl(hash);
      if (originalUrl) {
        res.redirect(originalUrl);
        logger.info('Redirecionando para URL original', originalUrl);
      } else {
        res.status(404).json({ message: 'URL not found' });
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: 'Error retrieving URL' });
    }
  }
}
