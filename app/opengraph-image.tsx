import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const alt = `${siteConfig.name} - AI and SaaS MVP Builder`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#f8fafc",
          background:
            "radial-gradient(circle at 16% 18%, rgba(20, 184, 166, 0.45), transparent 30%), radial-gradient(circle at 82% 20%, rgba(147, 51, 234, 0.55), transparent 34%), linear-gradient(135deg, #070712 0%, #17132f 48%, #071a1d 100%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 0,
          }}
        >
          <span>{siteConfig.name}</span>
          <span
            style={{
              padding: "12px 20px",
              border: "1px solid rgba(248, 250, 252, 0.22)",
              borderRadius: 999,
              color: "#5eead4",
              background: "rgba(15, 23, 42, 0.48)",
            }}
          >
            Gaza to global
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 14,
              padding: "12px 18px",
              border: "1px solid rgba(94, 234, 212, 0.34)",
              borderRadius: 999,
              color: "#99f6e4",
              background: "rgba(13, 148, 136, 0.14)",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            AI Product Builder
          </div>

          <div
            style={{
              maxWidth: 880,
              fontSize: 76,
              lineHeight: 0.98,
              fontWeight: 800,
              letterSpacing: 0,
            }}
          >
            I build AI and SaaS MVPs for founders.
          </div>

          <div
            style={{
              maxWidth: 820,
              color: "#cbd5e1",
              fontSize: 32,
              lineHeight: 1.35,
              fontWeight: 500,
            }}
          >
            From validated idea to working product in 3 to 6 weeks.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#94a3b8",
            fontSize: 26,
            fontWeight: 600,
          }}
        >
          <span>{siteConfig.url.replace("https://", "")}</span>
          <span>MVP Build / AI Engineering / Technical Advisory</span>
        </div>
      </div>
    ),
    size,
  );
}
