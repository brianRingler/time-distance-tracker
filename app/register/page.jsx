"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RegisterForm from "./RegisterForm.jsx";
import Modal from "@/components/UI/Modal.jsx";
import ReCaptcha from "@/components/ReCaptcha.jsx";

export default function Page() {
  const [humanVerified, setHumanVerified] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {}, [humanVerified]);
  //TODO: IF user logged in and goes to this route, the modal flashes briefly, if user is logged in, this route should be unreachable
  return (
    <div>
      {!humanVerified ? (
        <Modal humanVerified={humanVerified} showModalState={true}>
          <ReCaptcha setHumanVerified={setHumanVerified} />
        </Modal>
      ) : (
        <RegisterForm title="Register" />
      )}
    </div>
  );
}
