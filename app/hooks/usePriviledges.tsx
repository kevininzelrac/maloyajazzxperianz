import { Post, Role, User } from "@prisma/client";

const usePriviledges = (user: { id: User["id"]; role: Role } | null) => {
  return {
    isAdmin: Boolean(user?.role === "ADMIN"),
    isEditor: Boolean(user?.role === "EDITOR"),
    isAuthor(id: Post["authorId"]) {
      return user?.id === id;
    },
  };
};

export default usePriviledges;
