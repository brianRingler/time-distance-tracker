"use client";
import { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm.jsx";
import Modal from "@/components/UI/Modal.jsx";
import ReCaptcha from "@/components/ReCaptcha.jsx";

export default function Page() {
  const [humanVerified, setHumanVerified] = useState(false);

  useEffect(() => {}, [humanVerified]);

  return (
    <div>
      {!humanVerified ? (
        <Modal humanVerified={humanVerified}>
          <ReCaptcha setHumanVerified={setHumanVerified} />
        </Modal>
      ) : (
        <RegisterForm title="Register" />
      )}
    </div>
  );
}
