"use client";
import { FormEvent, useState, useRef } from "react";
import slugifyNameVideo from "@/utils/slugifyTitleVideos";
import Button from "../shared/Button";

export default function SlufigyNameVideo() {
  const copyToClipboard = useRef<HTMLInputElement>(null);
  const [nameVideo, setNameVideo] = useState<string>("");
  const [nameSlugyfy, setNameSlugyfy] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (nameVideo === "") return;

    const slugyfied = slugifyNameVideo(nameVideo);
    setNameSlugyfy(slugyfied);
  };

  const handdleCopy = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const input = copyToClipboard.current;
    if (!input) return;

    input?.select();
    input?.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(input?.value);
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
    }, 5000);
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-4">
        <input
          className="rounded-md border-2 border-ty-0 bg-transparent px-2 py-2 outline-none"
          value={nameVideo}
          onChange={(e) => setNameVideo(e.target.value)}
          type="text"
        />
        <Button type="submit">Obtener nombre del video</Button>
      </form>
      <div className="flex flex-col gap-4">
        <input
          className="rounded-md border-2 border-ty-0 bg-transparent px-2 py-2 outline-none"
          ref={copyToClipboard}
          readOnly
          value={nameSlugyfy}
          onClick={handdleCopy}
        />
        {notification && (
          <div className="rounded-md border border-blue-600 bg-blue-100 p-2 text-blue-600">
            <span>Se copio el nombre del video.</span>
          </div>
        )}
      </div>
    </>
  );
}
