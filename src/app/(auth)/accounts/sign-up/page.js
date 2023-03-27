"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zen_Dots } from "next/font/google";
import Button from "@/components/Button";
import TextInput from "@/components/Input/TextInput";
import { inputsForRegister } from "@/constants";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function SignUp() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <main className="h-screen flex">
      <div className="w-[40%] p-10 pr-20">
        <Link href={"/"}>
          <h1 className={zendots.className}>RANTAUWERS</h1>
        </Link>
        <div className="mt-20">
          <h1 className="font-semibold text-3xl">Sign Up to Rantauwers</h1>
          <h2 className="text-info mb-10">
            Selamat datang, silahkan daftarkan akun anda
          </h2>
          <form onSubmit={handleRegister}>
            {inputsForRegister.map((input, i) => (
              <TextInput
                key={i}
                {...input}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
            <Button
              text={"Register"}
              isPrimary={true}
              hasIcon={false}
              className="w-full mt-3"
            />
            <div className="text-center text-sm mt-5">
              <span>Sudah punya akun? </span>
              <span className="font-medium">
                <Link href={"/accounts/sign-in"}>Masuk Disini</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="w-[60%]">
        <Image
          src={"/assets/hero.jpg"}
          width={1280}
          height={720}
          alt="room"
          className="h-screen"
        />
      </div>
    </main>
  );
}
