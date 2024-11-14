import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import type { PluginAPI } from 'tailwindcss/types/config';
const plugin = require("tailwindcss/plugin");

export default {
  darkMode: "class",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        orangered: '#ff4500',
        orange: '#ffA000',
      },
      fontFamily: {
        'jetbrains-mono': ['"JetBrains Mono"', 'monospace', 'sans-serif'],
        'jetbrains-bold': ['"JetBrains Mono Bold"', 'monospace', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }: PluginAPI) {
      // this class is applied to `html` by `app/theme-efect.ts`, similar
      // to how `dark:` gets enabled
      addVariant("theme-system", ".theme-system &");
    }),
  ],
} satisfies Config;
