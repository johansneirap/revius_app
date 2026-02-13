import { prisma } from '@/lib/prisma'

export const productService = {
    async getProductBySlug(slug: string) {
        return await prisma.product.findUnique({
            where: { slug },
            include: {
                prices: {
                    include: {
                        store: true
                    },
                    orderBy: {
                        price: 'asc'
                    }
                },
                reviews: {
                    include: {
                        author: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    take: 3
                }
            }
        })
    },

    async searchProducts(query: string) {
        return await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                    { category: { contains: query, mode: 'insensitive' } }
                ]
            },
            include: {
                prices: {
                    orderBy: {
                        price: 'asc'
                    },
                    take: 1
                }
            },
            take: 20
        })
    },

    async getTrendingProducts() {
        return await prisma.product.findMany({
            orderBy: {
                rating: 'desc'
            },
            include: {
                prices: {
                    orderBy: {
                        price: 'asc'
                    },
                    take: 1
                }
            },
            take: 6
        })
    }
}
