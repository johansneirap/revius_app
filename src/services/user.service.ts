import { prisma } from '@/lib/prisma'

export const userService = {
    async getUserProfile(id: string) {
        return await prisma.user.findUnique({
            where: { id },
            include: {
                reviews: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                    include: {
                        product: true,
                        store: true
                    }
                },
                favorites: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        reviews: true
                    }
                }
            }
        })
    },

    async toggleFavorite(userId: string, productId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { favorites: true }
        })

        const isFavorite = user?.favorites.some(p => p.id === productId)

        if (isFavorite) {
            return await prisma.user.update({
                where: { id: userId },
                data: {
                    favorites: {
                        disconnect: { id: productId }
                    }
                }
            })
        } else {
            return await prisma.user.update({
                where: { id: userId },
                data: {
                    favorites: {
                        connect: { id: productId }
                    }
                }
            })
        }
    }
}
