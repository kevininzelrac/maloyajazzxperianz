import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "kevin@prisma.io" },
    update: {},
    create: {
      email: "kevin@prisma.io",
      fullName: "Kevin The Dude",
      firstname: "Kevin",
      lastname: "The Dude",
      avatar:
        "https://fastly.picsum.photos/id/962/200/200.jpg?hmac=XehF7z9JYkgC-2ZfSP05h7eyumIq9wNKUDoCLklIhr4",
      Credential: {
        create: {
          passwordHash: process.env.PWD_HASH,
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { email: "sebastian@prisma.io" },
    update: {},
    create: {
      email: "sebastian@prisma.io",
      fullName: "Sebastian eL Patron",
      firstname: "Sebastian",
      lastname: "El Patron",
      avatar:
        "https://fastly.picsum.photos/id/249/200/200.jpg?hmac=75zqoHvrxGGVnJnS8h0gUzZ3zniIk6PggG38GjmyOto",
      Credential: {
        create: {
          passwordHash: process.env.PWD_HASH,
        },
      },
    },
  });

  const authorId = async (email: string) => {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
    if (!user) throw new Error("Can't find authorId");
    return user.id;
  };

  await prisma.post.createMany({
    data: [
      {
        type: "category",
        title: "Art",
        content: "Art cat",
        category: "post",
        authorId: await authorId("kevin@prisma.io"),
        createdAt: new Date("2023-01-01T10:00:00"),
      },
      {
        type: "category",
        title: "Music",
        content: "Music cat",
        category: "post",
        authorId: await authorId("kevin@prisma.io"),
        createdAt: new Date("2023-01-01T10:00:00"),
      },
      {
        type: "category",
        title: "Remix",
        content: "Remix cat",
        category: "post",
        authorId: await authorId("kevin@prisma.io"),
        createdAt: new Date("2023-01-01T10:00:00"),
      },
      {
        type: "post",
        title: "Introduction to JavaScript",
        content: "Lorem ipsum...",
        category: "Art",
        authorId: await authorId("kevin@prisma.io"),
        createdAt: new Date("2023-01-01T10:00:00"),
      },
      {
        type: "post",
        title: "The wonders of the universe",
        content: "Lorem ipsum...",
        category: "Art",
        authorId: await authorId("sebastian@prisma.io"),
        createdAt: new Date("2023-02-15T14:30:00"),
      },
      {
        type: "post",
        title: "Exploring new places",
        content: "Lorem ipsum...",
        category: "Art",
        authorId: await authorId("sebastian@prisma.io"),
        createdAt: new Date("2023-03-10T08:45:00"),
      },
      {
        type: "post",
        title: "Cooking adventures",
        authorId: await authorId("kevin@prisma.io"),
        category: "Music",
        content: "Lorem ipsum...",
        createdAt: new Date("2023-04-05T18:20:00"),
      },
      {
        type: "post",
        title: "Staying fit and healthy",
        content: "Lorem ipsum...",
        category: "Music",
        authorId: await authorId("sebastian@prisma.io"),
        createdAt: new Date("2023-05-20T12:15:00"),
      },
      {
        type: "post",
        title: "The power of music",
        content: "Lorem ipsum...",
        category: "Music",
        authorId: await authorId("kevin@prisma.io"),
        createdAt: new Date("2023-06-30T22:00:00"),
      },
      {
        type: "post",
        title: "Thrilling sports moments",
        content: "Lorem ipsum...",
        category: "Remix",
        authorId: await authorId("sebastian@prisma.io"),
        createdAt: new Date("2023-07-12T16:10:00"),
      },
      {
        type: "post",
        title: "Fashion trends of the season",
        content: "Lorem ipsum...",
        category: "Remix",
        authorId: await authorId("sebastian@prisma.io"),
        createdAt: new Date("2023-08-25T09:30:00"),
      },
      {
        type: "post",
        title: "Exploring the world of art",
        content: "Lorem ipsum...",
        category: "Remix",
        authorId: await authorId("kevin@prisma.io"),
        createdAt: new Date("2023-09-18T17:45:00"),
      },
      {
        type: "post",
        title: "Connecting with nature",
        content: "Lorem ipsum...",
        category: "Art",
        authorId: await authorId("sebastian@prisma.io"),
        createdAt: new Date("2023-10-05T11:55:00"),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
