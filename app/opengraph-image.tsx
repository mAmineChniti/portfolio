import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { author, site } from "@/lib/site";

export const alt = `${author.name} — Software Engineer building APIs, web applications, and developer tools.`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const palette = site.palette;

const fonts = await readFonts();

const technologies = [
  { label: "TypeScript", accent: palette.primary },
  { label: "Python", accent: palette.chart3 },
  { label: "Go", accent: palette.chart4 },
  { label: "Rust", accent: palette.chart2 },
  { label: "React", accent: palette.chart4 },
  { label: "Next.js", accent: palette.primary },
];

function Chip({ label, accent }: { label: string; accent: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "10px 20px 10px 16px",
        borderRadius: 11,
        border: `1px solid ${accent}59`,
        background: `${accent}1a`,
        color: palette.foreground,
        fontSize: 25,
      }}
    >
      <div
        style={{ width: 12, height: 12, borderRadius: 999, background: accent }}
      />
      {label}
    </div>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: palette.background,
        backgroundImage: `linear-gradient(158deg, #fbfdff 0%, ${palette.background} 45%, #eaf4fd 100%)`,
        color: palette.foreground,
        padding: "58px 68px",
        fontFamily: fonts.length > 0 ? "Geist" : "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -140,
          width: 660,
          height: 660,
          display: "flex",
          background: `radial-gradient(circle, ${palette.chart4}4d 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -260,
          left: -170,
          width: 700,
          height: 700,
          display: "flex",
          background: `radial-gradient(circle, ${palette.chart3}3d 0%, transparent 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -240,
          left: 380,
          width: 600,
          height: 600,
          display: "flex",
          background: `radial-gradient(circle, ${palette.chart2}33 0%, transparent 70%)`,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 15,
              background: site.brandColor,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              lineHeight: 1,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 30, color: palette.foreground }}>
            {site.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 13,
            padding: "11px 22px",
            borderRadius: 999,
            border: `1px solid ${palette.chart3}59`,
            background: `${palette.chart3}1a`,
            color: palette.foreground,
            fontSize: 24,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: palette.chart3,
            }}
          />
          Available for internships
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 25,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: palette.primary,
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 84,
            letterSpacing: -3,
            lineHeight: 1.04,
          }}
        >
          {author.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 39,
            lineHeight: 1.24,
            color: palette.foreground,
          }}
        >
          APIs, web applications, and developer tools.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            width: 200,
            height: 8,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${palette.primary} 0%, ${palette.chart3} 55%, ${palette.chart2} 100%)`,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 13 }}>
          {technologies.map((technology) => (
            <Chip
              key={technology.label}
              label={technology.label}
              accent={technology.accent}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 32,
            paddingTop: 24,
            borderTop: `1px solid ${palette.chart2}4d`,
            fontSize: 24,
            color: palette.foreground,
          }}
        >
          <div style={{ display: "flex", color: palette.primary }}>
            github.com/mAmineChniti
          </div>
          <div style={{ display: "flex" }}>Ariana, Tunisia</div>
        </div>
      </div>
    </div>,
    { ...size, ...(fonts.length > 0 && { fonts }) },
  );
}

async function readFonts() {
  try {
    return [
      {
        name: "Geist",
        data: await readFile(
          path.join(
            process.cwd(),
            "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf",
          ),
        ),
        style: "normal" as const,
        weight: 400 as const,
      },
    ];
  } catch {
    return [];
  }
}
