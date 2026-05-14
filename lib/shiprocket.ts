export async function getShiprocketToken() {

  const response =
    await fetch(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email:
            process.env
              .SHIPROCKET_EMAIL,

          password:
            process.env
              .SHIPROCKET_PASSWORD,
        }),
      }
    );

  const data =
    await response.json();

  if (!data.token) {

    console.error(
      "Shiprocket auth failed:",
      data
    );

    throw new Error(
      "Failed to authenticate Shiprocket"
    );
  }

  return data.token;
}