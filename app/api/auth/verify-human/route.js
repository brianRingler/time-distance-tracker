import { NextResponse } from "next/server";

export async function POST(request) {
  let reqBody = await request.json();

  try {
    const url = "https://www.google.com/recaptcha/api/siteverify";

    const params = new URLSearchParams();
    params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
    params.append("response", reqBody.recaptchaToken);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    return new NextResponse(
      JSON.stringify({ message: "User is human" }, { status: 200 })
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: `${err.message}` }, { status: 500 })
    );
  }
}
