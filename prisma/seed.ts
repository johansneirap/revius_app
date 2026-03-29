import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding...')

  // Create User (Store Owner)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@revius.cl' },
    update: {},
    create: {
      email: 'admin@revius.cl',
      name: 'Admin Revius',
      role: 'ADMIN',
      bio: 'Administrator del sistema',
    },
  })

  // Create Store
  const techNova = await prisma.store.upsert({
    where: { slug: 'technova-direct' },
    update: {},
    create: {
      name: 'TechNova Direct',
      slug: 'technova-direct',
      category: 'Tecnología',
      description: 'Líderes en hardware high-end.',
      verified: true,
      ownerId: admin.id,
      reputation: {
        shipping: 4.8,
        support: 4.5,
      },
    },
  })

  // Create Product
  const headphones = await prisma.product.upsert({
    where: { slug: 'sonicpro-ultra-x1' },
    update: {},
    create: {
      name: 'SonicPro Ultra X1',
      slug: 'sonicpro-ultra-x1',
      description: 'Audífonos con cancelación de ruido de última generación.',
      category: 'Audio',
      specs: {
        battery: '40h',
        connectivity: 'Bluetooth 5.3',
      },
      prices: {
        create: {
          storeId: techNova.id,
          price: 249990,
          url: 'https://technova.cl/sonicpro-x1',
        },
      },
    },
  })

  console.log({ admin, techNova, headphones })
  console.log('✅ Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
