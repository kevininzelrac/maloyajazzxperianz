import { Prisma } from "@prisma/client";

export default function Header({
  title,
  category,
}: Prisma.PostGetPayload<{
  select: { title: true; category: true };
}>) {
  return (
    <header>
      <h3>{title}</h3>
      <p>{category}</p>
    </header>
  );
}
