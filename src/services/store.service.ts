import { prisma } from '@/lib/prisma'

export const storeService = {
    async getStoreBySlug(slug: string) {
        return await prisma.store.findUnique({
            where: { slug },
            include: {
                products: {
                    include: {
                        product: true
                    },
                    take: 6
                },
                reviews: {
                    orderBy: { createdAt: 'desc' },
                    take: 5
                },
                owner: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
    },

    async getStoreDashboardStats(storeId: string) {
        // This would aggregate real data in production
        const store = await prisma.store.findUnique({
            where: { id: storeId },
            include: {
                _count: {
                    select: {
                        reviews: true,
                        products: true
                    }
                }
            }
        })

        return {
            totalReviews: store?._count.reviews || 0,
            totalProducts: store?._count.products || 0,
            rating: store?.rating || 0
        }
    }
}
