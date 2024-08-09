import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: 'Some post',
    slug: 'some-post',
    content: 'Content of this post',
    author: {
      connectOrCreate: {
        where: {
          email: 'ex@email.com'
        },
        create: {
          email: 'ex@email.com',
          hashedPassword: 'ejlajfsjfsio'
        }
      }
    }
  },
]


async function main() {
  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post
    });
  }
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