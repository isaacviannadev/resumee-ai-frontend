"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import Logo from "./components/Logo";
import youtubeRegex from "./utils/regex";

type Inputs = {
  url: string;
};

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const encodedUrl = encodeURIComponent(data.url);

    router.push(`/summary?url=${encodedUrl}`);
  };

  return (
    <main className="flex flex-col items-center w-max min-h-screen flex-1 p-24 text-center m-auto">
      <div className="pb-24">
        <Logo />
      </div>

      <form className="mb-10 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full rounded-full bg-dark-gun-metal">
          <input
            className="h-20 w-full rounded-full bg-dark-gun-metal focus:outline-none px-6 text-2xl text-white placeholder-gray-500"
            type="text"
            id="url"
            placeholder="Cole o endereço do vídeo..."
            aria-label="Cole o endereço do vídeo..."
            {...register("url", {
              required: "Um endereço de vídeo do Youtube é obrigatório!",
              pattern: {
                value: youtubeRegex,
                message: "O endereço de vídeo do Youtube é inválido!",
              },
            })}
          />
          <button
            type="submit"
            role="button"
            className="flex items-center justify-center shrink-0 w-20 h-20 bg-green-yellow border-4 border-rich-black text-gray-500 rounded-full transition-all hover:brightness-105 hover:scale-110"
          >
            <ArrowRight className="h-10 w-10 fill-black" />
          </button>
        </div>

        {errors.url && (
          <p className="mt-2 text-center text-white">{errors.url.message}</p>
        )}
      </form>
    </main>
  );
}
