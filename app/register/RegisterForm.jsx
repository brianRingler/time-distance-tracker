"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import MessageList from "components/MessageList";

export default function RegisterForm({ title }) {
  const [data, setData] = useState();
  const [errMsgs, setErrMsgs] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    console.log("submit data: ", e);

    const { firstName, lastName, email, password, password2 } = e;

    try {
      const res = await fetch("/api/auth/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          password2,
        }),
      });

      if (res.ok) {
        //reset form
        reset();
        router.push("/login");
      } else {
        const errData = await res.json();
        setErrMsgs(errData);
      }
    } catch (err) {
      console.log(`Error in app/register-user ${err}`);
      router.push("/error-page");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1
        id="login-header"
        className="text-4xl font-bold text-primary mb-4 text-center"
      >
        {title}
      </h1>

      <div className="form__field-container">
        <input
          placeholder="First Name"
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded"
          {...register("firstName", {
            required: "First Name is required",
            minLength: 2,
          })}
        />
        {errors.firstName?.message && (
          <p className="text-sm text-red-400">{errors.firstName.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Last Name"
          className="form__input"
          {...register("lastName", {
            required: "Last Name is required",
            minLength: 2,
          })}
        />
        {errors.lastName?.message && (
          <p className="form__error">{errors.lastName.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Email"
          className="form__input"
          type="email"
          {...register("email", {
            required: "Email required",
          })}
        />
        {errors.email?.message && (
          <p className="form__error">{errors.email.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Password"
          className="form__input"
          type="password"
          {...register("password", {
            required: "Password required",
            minLength: 8,
          })}
        />
        {errors.password?.message && (
          <p className="form__error">{errors.password.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Confirm Password"
          type="password"
          className="form__input"
          {...register("password2", {
            required: "Password required",
            minLength: 8,
          })}
        />
        {errors.password2?.message && (
          <p className="form__error">{errors.password2.message}</p>
        )}
      </div>

      {errMsgs && <MessageList errMsgs={errMsgs} />}

      <button className=" btn form__submit-button">Submit</button>
      <button className=" btn form__submit-button my-4">
        Register with Google
      </button>

      <Link
        href="/login"
        className="flex justify-center text-primary my-2 hover:font-bold"
      >
        Go To Login
      </Link>
    </form>
  );
}
