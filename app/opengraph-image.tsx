import { ImageResponse } from "next/og";

export const alt = "Med Amine Chniti — Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f7f9fc",
        color: "#111827",
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "48px", height: "8px", background: "#2f9e73" }} />
        <div style={{ fontSize: "26px", fontWeight: 600 }}>
          mAmineChniti.dev
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ fontSize: "66px", fontWeight: 700, letterSpacing: "-3px" }}
        >
          Med Amine Chniti
        </div>
        <div style={{ marginTop: "22px", fontSize: "38px", color: "#52606d" }}>
          APIs, web applications, and developer tools.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #cbd2da",
          paddingTop: "24px",
          fontSize: "22px",
          color: "#52606d",
        }}
      >
        <span>TypeScript · Python · Go · Rust</span>
        <span>github.com/mAmineChniti</span>
      </div>
    </div>,
  );
}
