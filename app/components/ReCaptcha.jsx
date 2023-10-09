import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ setHumanVerified }) => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  function onChange(value) {
    setRecaptchaToken(value);
  }

  useEffect(() => {
    if (recaptchaToken) {
      getRecaptchaResponse();
    }
  }, [recaptchaToken]);

  const getRecaptchaResponse = async () => {
    try {
      const response = await fetch("/api/auth/verify-human", {
        method: "POST",
        body: JSON.stringify({
          recaptchaToken: recaptchaToken,
        }),
      });

      const data = await response.json();
      console.log("recaptcha response ", data);
      setHumanVerified(true);
      return data;
    } catch (error) {
      console.log("recaptcha error", error);
    }
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={onChange}
      />
    </div>
  );
};

export default ReCaptcha;
