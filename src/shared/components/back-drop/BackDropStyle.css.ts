import { style } from "@vanilla-extract/css";
import { f } from "@/shared/styles/functions";

export const backdropWrap = style([
  f.pFixed,
  {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: "20",
  },
]);
