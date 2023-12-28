"use client";

import { CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import YouTubeVideo from "../components/YouTubeVideo";

type SearchParamsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

type SummarizeResult = {
  summary: string;
  topics: string[];
  coverImage?: string;
};

export default function Summary({ searchParams }: SearchParamsProps) {
  const [data, setData] = useState<SummarizeResult>({
    summary: "",
    topics: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/summarize?url=${searchParams.url}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response: SummarizeResult) => {
        setData(response);
      })
      .catch((error) => {
        setIsError(true);
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams.url]);

  return (
    <main className="flex flex-col items-center  min-h-screen flex-1 py-10 px-24  m-auto">
      <Link href={"/"} className="pb-8 md:pb-14">
        <Logo isLoading={isLoading} />
      </Link>
      {isError && (
        <>
          <h1 className="text-2xl font-semibold text-dim-gray">
            🤖 Ocorreu um erro ao resumir o vídeo volte a home e tente novamente
          </h1>
        </>
      )}

      {isLoading && (
        <>
          <h1 className="text-2xl font-semibold text-dim-gray">
            🤖 Trabalhando no resumo do vídeo...
          </h1>
        </>
      )}
      {!isLoading && !isError && (
        <div className="flex flex-col w-full gap-6 md:flex-row text-white">
          <div className="basis-1/2">
            <YouTubeVideo videoURL={searchParams.url as string} />
          </div>

          <div className="basis-1/2">
            <h1 className="text-2xl font-semibold text-dim-gray">
              Resumo do vídeo
            </h1>
            <div className="my-2 text-quick-silver">{data.summary}</div>

            <ul className="text-white pt-4">
              {data.topics.map((topic, index) => (
                <li
                  key={`topic-${index}`}
                  className="flex items-start gap-2 pb-2"
                >
                  <span>
                    <CheckCircle className="h-6 w-6 fill-medium-purple" />
                  </span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
