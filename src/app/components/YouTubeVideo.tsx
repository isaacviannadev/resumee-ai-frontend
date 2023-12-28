import youtubeRegex from "../utils/regex";

type YouTubeVideoProps = {
  videoURL: string;
};

export default function YouTubeVideo({ videoURL }: YouTubeVideoProps) {
  const decodedUrl = decodeURIComponent(videoURL);
  const match = new RegExp(youtubeRegex).exec(decodedUrl);

  if (!match || !match[6]) {
    return <>Vídeo não reconhecido</>;
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${match[6]}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={true}
      className="aspect-video w-full rounded-lg shadow"
    />
  );
}
