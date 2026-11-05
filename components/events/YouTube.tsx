"use client";

import { useState } from "react";

/** Lightweight YouTube embed: thumbnail first, the real player loads only on click. */
export default function YouTube({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="video">
      {play ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
          <button type="button" onClick={() => setPlay(true)} aria-label={`Play recording: ${title}`}><span /></button>
        </>
      )}
    </div>
  );
}
