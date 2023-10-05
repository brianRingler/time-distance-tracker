import { pool } from "models/dbconfig";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server.js";
import validator from "email-validator";

export async function POST(request) {
  const { firstName, lastName, email, password, password2 } =
    await request.json();

  let errors = [];
  // VALIDATION CHECKS - This is always done server side but can be done client side, too

  if (!email || !firstName || !lastName || !password || !password2) {
    errors.push({ massage: "Please populate all fields" });
  }

  if (!validator.validate(email)) {
    errors.push({ message: `Email provided is not valid ${email}` });
  }

  if (firstName.length < 2) {
    errors.push({ message: "First name must be at least 2 letters" });
  }

  if (lastName.length < 2) {
    errors.push({ message: "Last name must be at least 2 letters" });
  }

  if (password.length < 8) {
    errors.push({ message: "Password length must be 8 or more characters" });
  }

  if (password !== password2) {
    errors.push({ message: "Passwords do not match" });
  }

  // Check if user email already exists
  const existingUser = await pool.query(
    "SELECT * FROM user_profiles WHERE user_name_email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    errors.push({ message: "Email already exists" });
  }

  if (errors.length > 0) {
    const jsonString = JSON.stringify(errors);
    return new NextResponse(jsonString, { status: 422 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const registerNewUser = {
    text: `INSERT INTO user_profiles (first_name, last_name, user_name_email, password)
           VALUES ($1, $2, $3, $4);`,
    values: [firstName, lastName, email, hashedPassword],
  };
  try {
    await pool.query(registerNewUser);
    return new NextResponse({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.log(`Error when posting to the new database`);
    return new NextResponse({ error: `${err.message}` }, { status: 500 });
  }
}
