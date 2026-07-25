import { useEffect, useState } from "react";

type Options = {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
};

export function useTypewriter(
  words: readonly string[],
  { typeSpeed = 75, deleteSpeed = 40, pauseMs = 1600 }: Options = {},
) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const word = words[index % words.length];

    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 0);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting
            ? word.slice(0, prev.length - 1)
            : word.slice(0, prev.length + 1),
        );
      },
      deleting ? deleteSpeed : typeSpeed,
    );

    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}
