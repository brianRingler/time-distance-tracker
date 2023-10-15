"use client";

import Link from "next/link";
import ReCaptcha from "../ReCaptcha";
import { useState } from "react";

export default function Modal({ children, showModalState }) {
  const [showModal, setShowModal] = useState(showModalState);

  return (
    <div>
      {showModal && (
        <div className="h-screen flex mt-20 justify-center">
          <div>
            <h1>Please Verify Your Humanity</h1>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
