"use client";
import React from "react";
import { useRef, useEffect } from "react";

type Video = {
  src: string;
  className?: string;
};

export default function Video({ className, src }: Video) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("contextmenu", (e: MouseEvent) => {
        e.preventDefault();
      });
    }
  }, []);

  return (
    <video ref={videoRef} controls className={`object-cover ${className}`} controlsList="nodownload" preload="auto">
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
