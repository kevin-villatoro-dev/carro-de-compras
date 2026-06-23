import { eq, and, sql } from 'drizzle-orm'
import { db } from '@/db'
import { orders, orderItems, products } from '@/db/schema'

interface CartItem {
  productId: string
  quantity: number
}

interface CheckoutInput {
  userId: string
  shippingAddress: string
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal'
  items: CartItem[]
}

export class OrderService {
  async checkout(input: CheckoutInput) {
    const { userId, shippingAddress, paymentMethod, items } = input

    // Validate all items have sufficient stock
    for (const item of items) {
      const product = await db
        .select({ id: products.id, stock: products.stock, name: products.name })
        .from(products)
        .where(eq(products.id, item.productId))
        .limit(1)

      if (!product.length) {
        throw new Error(`Product ${item.productId} not found`)
      }

      if (product[0].stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product[0].name}. Available: ${product[0].stock}, Requested: ${item.quantity}`)
      }
    }

    // Calculate total
    let total = 0
    const orderItemsData: Array<{
      productId: string
      quantity: number
      price: string
    }> = []

    for (const item of items) {
      const product = await db
        .select({ id: products.id, price: products.price })
        .from(products)
        .where(eq(products.id, item.productId))
        .limit(1)

      const price = parseFloat(product[0].price)
      total += price * item.quantity
      orderItemsData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product[0].price,
      })
    }

    // Create order in a transaction
    const order = await db.transaction(async (tx) => {
      // Create order
      const newOrder = await tx
        .insert(orders)
        .values({
          userId,
          total: total.toString(),
          shippingAddress,
          status: 'pending',
        })
        .returning()

      const orderId = newOrder[0].id

      // Create order items
      await tx.insert(orderItems).values(
        orderItemsData.map((item) => ({
          orderId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))
      )

      // Decrement stock for each product
      for (const item of items) {
        await tx
          .update(products)
          .set({
            stock: sql`GREATEST(${products.stock} - ${item.quantity}, 0)`,
            updatedAt: new Date(),
          })
          .where(eq(products.id, item.productId))
      }

      return newOrder[0]
    })

    return {
      orderId: order.id,
      total: order.total,
      status: order.status,
      message: 'Order created successfully',
    }
  }

  async findById(id: string) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1)

    return result[0] || null
  }
}

export const orderService = new OrderService()