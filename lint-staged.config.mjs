const config = {
  "*.{ts,tsx,js,mjs}": (filenames) => `next lint --fix --file ${filenames.map((name) => `"${name}"`).join(" --file ")}`,
  "*.{json,md,css}": ["prettier --write"],
};

export default config;
