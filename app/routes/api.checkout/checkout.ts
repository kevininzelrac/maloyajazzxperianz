const checkout = async ({
  access_token,
  item,
  amount,
  firstname,
  lastname,
  email,
}: {
  access_token: string;
  item: string;
  amount: number;
  firstname?: string;
  lastname?: string;
  email?: string;
}) => {
  const response = await fetch(
    "https://api.helloasso-sandbox.com/v5/organizations/le-charbon/checkout-intents",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        totalAmount: amount,
        initialAmount: amount,
        itemName: item,
        backUrl: "https://kevinontherock.freeboxos.fr",
        errorUrl: "https://kevinontherock.freeboxos.fr",
        returnUrl: "https://kevinontherock.freeboxos.fr",
        containsDonation: false,

        payer: {
          firstName: firstname || null,
          lastName: lastname || null,
          email: email || null,
          //dateOfBirth: null,
          //address: null,
          //city: null,
          //zipCode: null,
          //country: null,
          //companyName: null,
        },
      }),
    }
  );
  if (!response.ok)
    throw new Error(`Error ${response.status} ${response.statusText}`);

  return await response.json();
};

export default checkout;
