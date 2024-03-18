type ErrorProps<T extends { data: any }> = {
  data: T;
  children: (data: T["data"]) => JSX.Element;
};

const Error = <T extends { data: any }>({
  data,
  children,
}: ErrorProps<T>): JSX.Element => {
  if ("error" in data && data.error) {
    return <span data-error>{(data.error as any).message}</span>;
  }
  return children(data.data);
};

export default Error;
