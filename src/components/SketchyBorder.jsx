export default function SketchyBorder() {
  return (
    <svg
      style={{ position: "absolute", width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="sketchy" x="-20%" y="-20%" width="140%" height="140%">
          {/* 1. Generate high-detail noise */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="50"
            seed="5"
            result="noise"
          />

          {/* 2. Warps the border shape dramatically */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            result="displaced"
          />

          {/* 3. Thins and roughens the edges like a dry brush */}
          <feMorphology
            operator="erode"
            radius="0.5"
            in="displaced"
            result="eroded"
          />

          {/* 4. Softens the "ink" slightly so it's not pixelated */}
          <feGaussianBlur in="eroded" stdDeviation="0.3" result="soft-ink" />
        </filter>
      </defs>
    </svg>
  );
}
