import { prisma } from '@/lib/prisma'

export const reviewService = {
    async createReview(data: {
        userId: string
        productId?: string
        storeId?: string
        rating: number
        content: string
        details?: any
    }) {
        return await prisma.review.create({
            data: {
                authorId: data.userId,
                productId: data.productId,
                storeId: data.storeId,
                rating: data.rating,
                content: data.content,
                details: data.details
            }
        })
    },

    async getReviewsForProduct(productId: string, page = 1, limit = 10) {
        const skip = (page - 1) * limit
        return await prisma.review.findMany({
            where: { productId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit
        })
    }
}
