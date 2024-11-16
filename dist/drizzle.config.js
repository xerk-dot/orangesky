// drizzle.config.ts
var config = {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "jeremyj",
    database: "orangesky"
  },
  tablesFilter: ["orangesky_*"],
  verbose: true
};
var drizzle_config_default = config;
export {
  drizzle_config_default as default
};
