import React from "react";
import Typewriter from "typewriter-effect";
import portfolio from "../../Portfolio";

function Type() {
  const highlights = [
    portfolio.title,
    portfolio.experience?.[0]?.title,
    ...(portfolio.skills?.aiMl?.slice(0, 2) || []),
    ...(portfolio.skills?.frontend?.slice(0, 2) || []),
  ]
    .filter(Boolean)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <Typewriter
      options={{
        strings: highlights.length ? highlights : ["Developer"],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
