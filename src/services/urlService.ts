import crypto from 'crypto';
import prisma from '../prisma/client';

export class UrlService {
  async createShortUrl(originalUrl: string, baseUrl: string): Promise<string> {
    const hash = crypto
      .createHash('sha256')
      .update(originalUrl)
      .digest('hex')
      .substring(0, 8);

    const existingUrl = await prisma.url.findUnique({
      where: { hash },
    });

    if (existingUrl) {
      return existingUrl.shortenedUrl;
    }

    const shortenedUrl = `${baseUrl}/${hash}`;

    await prisma.url.create({
      data: {
        originalUrl,
        hash,
        shortenedUrl,
      },
    });

    return shortenedUrl;
  }

  async getOriginalUrl(hash: string): Promise<string> {
    const url = await prisma.url.findFirstOrThrow({
      where: { hash },
    });
    return url.originalUrl;
  }
}
