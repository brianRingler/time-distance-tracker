import { pool } from "models/dbconfig";

export async function GET(request) {
  const { email } = request.query;

  const verifyEmail = {
    text: `UPDATE user_profiles SET email_authenticated = true WHERE user_name_email = $1;`,
    values: [email],
  };

  try {
    await pool.query(verifyEmail);
    return new NextResponse(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log(`Error when verifying the email`);
    return new NextResponse({ error: `${err.message}` }, { status: 500 });
  }
}
