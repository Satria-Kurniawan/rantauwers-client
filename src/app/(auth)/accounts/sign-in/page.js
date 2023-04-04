"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Zen_Dots } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import Button from "@/components/Button";
import TextInput from "@/components/Input/TextInput";
import Loading from "@/components/Loading";
import { inputsForLogin } from "@/constants";

const zendots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response) setIsLoading(false);

    if (!response.ok) return console.log(response);

    const callBackUrl = searchParams.get("callbackUrl");

    if (callBackUrl) return router.push(callBackUrl);

    router.push("/");
  };

  return (
    <main className="h-screen bg-white flex">
      <div className="w-[40%] p-10 pr-20">
        <Link href={"/"}>
          <h1 className={zendots.className}>RANTAUWERS</h1>
        </Link>
        <div className="mt-20">
          <h1 className="font-semibold text-3xl">Welcome to Rantauwers</h1>
          <h2 className="text-info mb-10">
            Selamat datang, silahkan masukan akun anda
          </h2>
          <Button
            text={"Login With Google"}
            hasIcon={true}
            leftIcon={true}
            icon={<FcGoogle size={25} />}
            className="w-full border font-medium"
          />
          <div className="flex gap-x-3 items-center my-5">
            <hr className="w-full" />
            <span className="text-info">OR</span>
            <hr className="w-full" />
          </div>
          <form onSubmit={handleLogin}>
            {inputsForLogin.map((input, i) => (
              <TextInput
                {...input}
                key={i}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
            <h6 className="text-end text-sm font-medium my-5">Lupa Password</h6>

            {isLoading ? (
              <div className="flex justify-center mt-5">
                <Loading className="w-16 h-16" />
              </div>
            ) : (
              <Button
                text={"Login"}
                isPrimary={true}
                hasIcon={false}
                className="w-full"
              />
            )}

            <div className="text-center text-sm mt-5">
              <span>Belum punya akun? </span>
              <Link href={"/accounts/sign-up"}>
                <span className="font-medium">Daftar gratis disini</span>
              </Link>
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
