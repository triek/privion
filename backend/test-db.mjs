import pkg from '@prisma/client'
const { PrismaClient } = pkg

const prisma = new PrismaClient()

async function main() {
  const created = await prisma.workoutSession.create({
    data: {
      title: 'Test Session – From Script',
      notes: 'First SQLite test',
      completed: false,
    },
  })
  console.log('Created session:', created)

  const sessions = await prisma.workoutSession.findMany({
    orderBy: { date: 'desc' },
  })
  console.log('All sessions:', sessions)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => prisma.$disconnect())
