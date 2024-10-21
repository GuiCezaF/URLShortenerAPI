import prisma from '../prisma/client';
import { generateHash } from '../utils/generateHash';

export class UrlService {
  async createShortUrl(originalUrl: string, baseUrl: string): Promise<string> {
    const hash = generateHash(originalUrl).toString();

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
