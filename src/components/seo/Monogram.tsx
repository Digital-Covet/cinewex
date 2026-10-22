import { ACCENT_COLOR, THEME_COLOR } from "@/constants/site";

/** Gold "C" on canvas, shared by the generated favicon and Apple touch icon. */
export default function Monogram({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: THEME_COLOR,
        color: ACCENT_COLOR,
        fontSize: size * 0.78,
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: "-0.04em",
      }}
    >
      C
    </div>
  );
}
