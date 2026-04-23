import React from "react";

const scenes = [
  {
    label: "Cricket",
    viewBox: "0 0 320 220",
    nodes: (
      <>
        <path d="M98 170c24 14 56 13 82 0" />
        <circle cx="140" cy="82" r="18" />
        <path d="M140 100v52M140 118l-42 18M140 120l34 32M120 152l-16 38M158 152l28 36" />
        <path d="M185 64l76-46M178 66l18 25" />
        <circle cx="260" cy="31" r="6" />
        <path d="M55 182h34M65 180v-46M78 180v-46M91 180v-46" />
        <path d="M38 198c60-10 138-10 244 0" />
      </>
    ),
  },
  {
    label: "Badminton",
    viewBox: "0 0 320 220",
    nodes: (
      <>
        <circle cx="120" cy="76" r="18" />
        <path d="M120 94v52M120 116l44-24M120 126l-28 28M120 146l-14 42M120 146l34 38" />
        <path d="M168 88l62-50M220 34l25 30M208 45l25 30" />
        <path d="M243 83l18 38 20-36M245 86l32-2M253 104l18-1" />
        <path d="M40 164h244M56 164v-42M264 164v-42M56 130h208" />
        <path d="M42 198c62-12 155-9 236 0" />
      </>
    ),
  },
  {
    label: "Chess",
    viewBox: "0 0 320 220",
    nodes: (
      <>
        <path d="M75 148h170v42H75zM75 158h170M75 169h170M75 180h170M96 148v42M117 148v42M138 148v42M159 148v42M180 148v42M201 148v42M222 148v42" />
        <path d="M116 142h42l-8-32h-26zM128 110h18M136 88v22M126 96h20" />
        <path d="M183 142h45l-10-28c12-13 8-34-13-38-16 3-24 14-23 31h16c-2-6 1-11 8-13" />
        <circle cx="206" cy="85" r="5" />
        <path d="M72 204c58-11 135-12 178 0" />
      </>
    ),
  },
  {
    label: "Laptop",
    viewBox: "0 0 320 220",
    nodes: (
      <>
        <circle cx="96" cy="74" r="17" />
        <path d="M96 92v50M96 110l36 28M96 112l-34 26M84 142l-24 36M108 142l27 36" />
        <path d="M142 122h96l18 54H122zM150 134h78M154 146h74M160 158h62" />
        <path d="M109 179h156" />
        <path d="M196 70c10-12 24-12 34 0M184 56c18-22 46-22 64 0M173 41c27-32 66-32 94 0" />
      </>
    ),
  },
  {
    label: "Whiteboard",
    viewBox: "0 0 320 220",
    nodes: (
      <>
        <path d="M118 48h156v104H118zM118 74h156" />
        <path d="M138 100h42M138 120h62M206 100l21 21 28-36" />
        <circle cx="72" cy="87" r="17" />
        <path d="M72 104v48M72 122l42-26M72 126l-30 20M62 152l-22 34M84 152l26 34" />
        <path d="M224 152l26 44M168 152l-22 44" />
        <path d="M40 198c78-9 165-9 238 0" />
      </>
    ),
  },
  {
    label: "Coffee",
    viewBox: "0 0 320 220",
    nodes: (
      <>
        <circle cx="105" cy="78" r="17" />
        <path d="M105 95v52M105 114l34 30M105 118l-34 24M92 147l-24 38M118 147l30 38" />
        <path d="M174 124h64v38c0 18-14 30-32 30s-32-12-32-30z" />
        <path d="M238 132h18c13 0 13 28 0 28h-18" />
        <path d="M187 98c-12-17 16-20 4-38M209 98c-12-17 16-20 4-38M231 98c-12-17 16-20 4-38" />
        <path d="M154 195h116" />
      </>
    ),
  },
  {
    label: "Music Walk",
    viewBox: "0 0 320 220",
    nodes: (
      <>
        <circle cx="132" cy="72" r="18" />
        <path d="M114 72c0-26 36-26 36 0M112 75v18M152 75v18" />
        <path d="M132 90v54M132 112l40 10M132 118l-34 24M125 144l-30 42M138 144l42 34" />
        <path d="M211 65v65M211 65h44v18h-44M255 83v48" />
        <circle cx="204" cy="139" r="10" />
        <circle cx="248" cy="140" r="10" />
        <path d="M42 196c54-13 112-10 165-1 24 4 47 4 72-1" />
      </>
    ),
  },
  {
    label: "Headphones",
    viewBox: "0 0 320 220",
    nodes: (
      <>
        <circle cx="162" cy="88" r="22" />
        <path d="M132 88c0-40 60-40 60 0M130 90v24c0 9 12 9 12 0V92M194 90v24c0 9-12 9-12 0V92" />
        <path d="M162 110v50M162 130l-44 20M162 130l48 20M146 160l-32 34M178 160l30 34" />
        <path d="M78 52c-16 17-24 39-24 64M244 52c16 17 24 39 24 64" />
        <path d="M93 54c-12 15-18 34-18 56M229 54c12 15 18 34 18 56" />
      </>
    ),
  },
];

function DoodleReel() {
  return (
    <div className="mela-doodle-reel" aria-hidden="true">
      {scenes.map((scene, index) => (
        <svg
          className="mela-doodle-scene"
          style={{ "--scene-index": index }}
          viewBox={scene.viewBox}
          key={scene.label}
        >
          <g className="mela-doodle-lines">{scene.nodes}</g>
          <text x="28" y="34">
            {scene.label}
          </text>
        </svg>
      ))}
    </div>
  );
}

export default DoodleReel;
