import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {},
        colors: {
            "default-white": "#f5f5f5",
            "soft-white": "#f9f9f9",
            "off-white": "#f3f3f3",
            "custom-black": "#1B1B1B",
            borders: "#686868",
            "borders-light": "#cccccc",
            "soft-gray": "#4A4A4A",
            "softw-gray": "#8B8B8B",
            "text-gray": "#898989",
            gray: "#3B3B3B",
            "gray-box": "#ecebeb",
            "dark-gray": "#2B2B2B",
            "soft-green": "#75f0a0",
            green: "#1CCC5B",
            "dark-green": "#117a37",
            "soft-blue": "#729cff",
            blue: "#2D6BFF",
            "dark-blue": "#1F4AB2",
            "soft-red": "#d55a67",
            red: "#990000",
            "dark-red": "#540000",
            "soft-purple": "#540000",
            purple: "#612D8A",
            "dark-purple": "#381850",
            "soft-primary": "#d55a67",
            primary: "#990000",
            "dark-primary": "#540000",
            hover: "#e9e9e9",
            "soft-shadow": "0px 0px 6px rgba(33, 13, 5, 0.14)",
            shadow: "0px 4px 8px rgba(33, 13, 5, 0.16)",
            "strong-shadow": "0 9px 32px -1px rgba(0, 0, 0, 0.5)",
            transition: "all 0.3s ease",
            "input-shadow": "0px 0px 0px 3px #771ccc41",
        },
    },
    darkMode: "class",
    plugins: [nextui({
        themes: {
            light: {
                colors: {
                    primary: { DEFAULT: "#990000", foreground: "#ffff" },

                    secondary: { DEFAULT: "#540000", foreground: "#ffff" },
                    danger: "#990000",
                    focus: "#990000",
                },
            },
        },
    })],
};
export default config;

