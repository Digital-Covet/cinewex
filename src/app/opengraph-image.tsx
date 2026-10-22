import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { HEADLINE, SERVICES } from "@/constants/landing";
import {
  ACCENT_COLOR,
  FG_COLOR,
  FG_MUTED_COLOR,
  SITE_TITLE,
  THEME_COLOR,
} from "@/constants/site";

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LETTERBOX = 44;
const FRAME_INSET = 72;
const CORNER = 36;

const corners = [
  { top: FRAME_INSET, left: FRAME_INSET, borderTop: true, borderLeft: true },
  { top: FRAME_INSET, right: FRAME_INSET, borderTop: true, borderRight: true },
  {
    bottom: FRAME_INSET,
    left: FRAME_INSET,
    borderBottom: true,
    borderLeft: true,
  },
  {
    bottom: FRAME_INSET,
    right: FRAME_INSET,
    borderBottom: true,
    borderRight: true,
  },
];

export default async function OpengraphImage() {
  const [font, wordmark] = await Promise.all([
    readFile(
      join(process.cwd(), "src/assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    ),
    readFile(join(process.cwd(), "public/cinewex.svg"), "utf8"),
  ]);

  // resvg ignores the SVG's <style> block, so inline the fill on each path.
  const logo = wordmark
    .replace(/<defs[\s\S]*?<\/defs>/, "")
    .replaceAll('class="cls-2"', `fill="${FG_COLOR}"`);
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

  const line = `2px solid ${ACCENT_COLOR}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: THEME_COLOR,
        color: FG_COLOR,
        fontFamily: "Bricolage Grotesque",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: LETTERBOX,
          background: "#000",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: LETTERBOX,
          background: "#000",
        }}
      />
      {corners.map(
        ({ borderTop, borderRight, borderBottom, borderLeft, ...pos }) => (
          <div
            key={JSON.stringify(pos)}
            style={{
              position: "absolute",
              width: CORNER,
              height: CORNER,
              ...pos,
              // satori chokes on `undefined` style values, so only spread set sides.
              ...(borderTop && { borderTop: line }),
              ...(borderRight && { borderRight: line }),
              ...(borderBottom && { borderBottom: line }),
              ...(borderLeft && { borderLeft: line }),
            }}
          />
        ),
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: "108px 112px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: rendered by next/og, not the browser */}
          <img src={logoSrc} alt="" width={227} height={32} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
              letterSpacing: "0.18em",
              color: FG_MUTED_COLOR,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: ACCENT_COLOR,
              }}
            />
            AI AD FILMS
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            lineHeight: 1,
            letterSpacing: "-0.035em",
          }}
        >
          {HEADLINE.map((text, i) => (
            <div
              key={text}
              style={{ color: i === 1 ? ACCENT_COLOR : FG_COLOR }}
            >
              {text}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: FG_MUTED_COLOR,
          }}
        >
          <div style={{ display: "flex" }}>
            {SERVICES.map((service) => service.title).join("  /  ")}
          </div>
          <div style={{ display: "flex", color: FG_COLOR }}>cinewex.com</div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: font,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
