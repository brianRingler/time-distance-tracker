"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function RegisterForm2({ title }) {
  const [data, setData] = useState();
  const [errMsgs, setErrMsgs] = useState();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = async (e) => {
    //e.preventDefault() not needed with react-hook-form because it is handled by the handleSubmit function from react-hook-form

    // e.preventDefault();

    console.log('submit data: ', e)

    //this creation of formData is not needed with react-hook-form
    //because the data is already in the e object

    // const formData = new FormData(e);
    // const { firstName, lastName, email, password, password2 } =
    //   Object.fromEntries(formData);


    //instead of this, we can just use the e object and destructure it to get the data
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
      <div className="mb-10">{title}</div>

      <div className="form__field-container">
        <input
          placeholder="First Name"
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded"
          {...register("firstName", { required: "First Name is required" })}
        />
        {errors.firstName?.message && (
          <p className="text-sm text-red-400">{errors.firstName.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Last Name"
          className="form__input"
          {...register("lastName", { required: "Last Name is required"})}
        />
        {errors.lastName?.message && (
          <p className="form__error">{errors.lastName.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Email"
          className="form__input"
          {...register("email", {
            required: "Email required"})}
        />
        {errors.email?.message && (
          <p className="form__error">{errors.email.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Password"
          className="form__input"
          {...register("password", {
            required: "Password required"})}
        />
        {errors.password?.message && (
          <p className="form__error">{errors.password.message}</p>
        )}
      </div>

      <div className="form__field-container">
        <input
          placeholder="Confirm Password"
          className="form__input"
          {...register("password2", {required: "Password required"})}
        />
        {errors.password2?.message && (
          <p className="form__error">{errors.password2.message}</p>
        )}
      </div>

      <button className=" btn form__submit-button">Submit</button>
    </form>
  );
}
