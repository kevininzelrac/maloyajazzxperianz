const convertFormData = async (request: Request) => {
  //return json({ error: "error during formData conversion" }, { status: 500 });
  const formData = await request.formData();
  const formDataEntries = Array.from(formData.entries());
  return Object.fromEntries(
    formDataEntries.map(([key, value]) => {
      const convert = typeMapping[key];
      return [key, convert ? convert(value as any) : value];
    })
  );
};
export default convertFormData;

const typeMapping: Record<string, (value: string) => any> = {
  id: (value: string) => value,
  title: (value: string) => value,
  content: (value: string) => value,
  status: (value: string) => value,
  audience: (value: string) => value,
  authorId: (value: string) => value,
  category: (value: string) => JSON.parse(value),
  categoryId: (value: string) => value,
  type: (value: string) => JSON.parse(value),
};
