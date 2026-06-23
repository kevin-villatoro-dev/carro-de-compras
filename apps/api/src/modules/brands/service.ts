import { eq, desc } from 'drizzle-orm'
import { db } from '@/db'
import { brands } from '@/db/schema'

export class BrandService {
  async findAll() {
    return db
      .select()
      .from(brands)
      .orderBy(desc(brands.name))
  }

  async findBySlug(slug: string) {
    const result = await db
      .select()
      .from(brands)
      .where(eq(brands.slug, slug))
      .limit(1)

    return result[0] || null
  }
}

export const brandService = new BrandService()
