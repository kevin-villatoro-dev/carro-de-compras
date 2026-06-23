import { eq, desc } from 'drizzle-orm'
import { db } from '@/db'
import { categories } from '@/db/schema'

export class CategoryService {
  async findAll() {
    return db
      .select()
      .from(categories)
      .orderBy(desc(categories.name))
  }

  async findBySlug(slug: string) {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1)

    return result[0] || null
  }
}

export const categoryService = new CategoryService()
