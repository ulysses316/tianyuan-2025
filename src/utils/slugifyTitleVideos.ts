import slugify from "slugify";

const slugifyNameVideo = (nameVideo: string): string => {
  return slugify(nameVideo, {
    replacement: "_",
    lower: true,
    strict: true,
    locale: "es",
    trim: true,
  });
};

export default slugifyNameVideo;
