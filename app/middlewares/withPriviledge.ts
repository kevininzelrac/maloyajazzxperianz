const withPriviledges = (user: any, where: any) => {
  return user && user.role === "ADMIN"
    ? {
        ...where,
      }
    : user && user.role === "EDITOR"
    ? {
        ...where,
        OR: [{ status: "PUBLISHED" }, { status: "DRAFT", authorId: user.id }],
      }
    : user && user.role === "BASIC"
    ? {
        ...where,
        status: "PUBLISHED",
      }
    : {
        ...where,
        status: "PUBLISHED",
        audience: "PUBLIC",
      };
};
export default withPriviledges;
