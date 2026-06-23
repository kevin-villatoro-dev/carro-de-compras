import { eq, desc, ilike, and, sql } from 'drizzle-orm'
import { db } from '@/db'
import { products, categories, brands } from '@/db/schema'

export class ProductService {
  async findAll(filters?: { categorySlug?: string; brandSlug?: string; search?: string }) {
    const conditions = [eq(products.isActive, true)]

    if (filters?.search) {
      conditions.push(ilike(products.name, `%${filters.search}%`))
    }

    if (filters?.categorySlug) {
      conditions.push(eq(categories.slug, filters.categorySlug))
    }

    if (filters?.brandSlug) {
      conditions.push(eq(brands.slug, filters.brandSlug))
    }

    const result = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        compareAtPrice: products.compareAtPrice,
        sku: products.sku,
        stock: products.stock,
        images: products.images,
        isActive: products.isActive,
        createdAt: products.createdAt,
        brand: {
          id: brands.id,
          name: brands.name,
          slug: brands.slug,
        },
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
      })
      .from(products)
      .leftJoin(brands, eq(products.brandId, brands.id))
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(...conditions))
      .orderBy(desc(products.createdAt))

    return result
  }

  async findBySlug(slug: string) {
    const result = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        compareAtPrice: products.compareAtPrice,
        sku: products.sku,
        stock: products.stock,
        images: products.images,
        isActive: products.isActive,
        createdAt: products.createdAt,
        brand: {
          id: brands.id,
          name: brands.name,
          slug: brands.slug,
        },
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
      })
      .from(products)
      .leftJoin(brands, eq(products.brandId, brands.id))
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.slug, slug))
      .limit(1)

    return result[0] || null
  }

  async findById(id: string) {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)

    return result[0] || null
  }

  async decrementStock(id: string, quantity: number) {
    const result = await db
      .update(products)
      .set({
        stock: sql`GREATEST(${products.stock} - ${quantity}, 0)`,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning()

    return result[0]
  }
}

export const productService = new ProductService()
