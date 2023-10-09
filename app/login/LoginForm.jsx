"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import MessageList from "@/components/MessageList";

export default function LoginForm({ title }) {
  const [errMsgs, setErrMsgs] = useState(null);

  const router = useRouter();
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
    formState,
  } = useForm();

  const onSubmit = async (e) => {
    const { email, password } = e;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error === null) {
        clearErrors();
        router.push("/trips");
      } else {
        let errorMessage = res.error;

        if (errorMessage === "Wrong Password!") {
          setErrMsgs("Incorrect password. Please try again.");
        } else if (errorMessage === "User not found!") {
          setErrMsgs("User not found. Please check your email.");
        } else {
          setErrMsgs("An error occurred. Please try again.");
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      setError("backendError", {
        type: "server",
        message: error.message,
      });

      if (error.message == "Wrong Password!") {
        reset({ password: "" });
      } else {
        reset({ keepValues: true });
      }

      clearErrors();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} name="loginFrm">
      <h1
        id="login-header"
        className="text-4xl font-bold text-primary mb-4 text-center"
      >
        {title}
      </h1>
      <div className="form__field-container">
        <input
          className="form__input"
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>
      <div className="form__field-container">
        <input
          className="form__input"
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      {errMsgs && <p className="text-sm text-red-400">{errMsgs}</p>}

      <button className="btn form__submit-button">Submit</button>

      <button
        type="button"
        id="sub-btn-google"
        onClick={() => signIn("google")}
        className="btn form__submit-button my-4"
      >
        Sign in with Google
      </button>

      <Link
        href="/register"
        className="flex justify-center text-primary my-2 hover:font-bold"
      >
        Go To Registration
      </Link>
    </form>
  );
}
