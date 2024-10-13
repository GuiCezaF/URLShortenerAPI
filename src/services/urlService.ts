import crypto from 'crypto';
import prisma from '../prisma/client';

export class UrlService {
  async createShortUrl(originalUrl: string, baseUrl: string): Promise<string> {
    const hash = crypto.createHash('sha-256').update(originalUrl).digest('hex');
    const shortenedUrl = `http://${baseUrl}/${hash}`;

    await prisma.url.create({
      data: {
        originalUrl,
        hash,
        shortenedUrl,
      },
    });

    return shortenedUrl;
  }

  async getOriginalUrl(hash: string): Promise<string | null> {
    const url = await prisma.url.findFirstOrThrow({
      where: { hash },
    });

    return url ? url.originalUrl : null;
  }
}
