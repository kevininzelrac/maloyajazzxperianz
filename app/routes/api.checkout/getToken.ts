const getToken = async () => {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.HELLO_ASSO_CLIENT_ID,
    client_secret: process.env.HELLO_ASSO_CLIENT_SECRET,
  });
  const response = await fetch(
    "https://api.helloasso-sandbox.com/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    }
  );
  if (!response.ok)
    throw new Error(`Error ${response.status} ${response.statusText}`);
  //console.log(await response.json());
  return await response.json();
};
export default getToken;
