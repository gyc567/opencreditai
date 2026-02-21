type EnvVar = {
  name: string;
  required: boolean;
  defaultValue?: string;
  validate?: (value: string) => boolean;
};

const ENV_SCHEMA: EnvVar[] = [
  { name: "DATABASE_URL", required: true },
  { name: "JWT_SECRET", required: true },
  { name: "MOLTBOOK_API_KEY", required: false, defaultValue: "" },
  { name: "MOLTBOOK_API_URL", required: false, defaultValue: "https://api.moltbook.com" },
  { name: "NEXT_PUBLIC_APP_URL", required: false, defaultValue: "http://localhost:3000" },
];

function validateEnv(): Record<string, string | undefined> {
  const env: Record<string, string | undefined> = {};
  const missing: string[] = [];
  const isProduction = process.env.NODE_ENV === "production";

  for (const schema of ENV_SCHEMA) {
    const value = process.env[schema.name];

    if (!value) {
      if (schema.required && isProduction) {
        missing.push(schema.name);
      } else if (schema.defaultValue) {
        env[schema.name] = schema.defaultValue;
        if (!isProduction && schema.required) {
          console.warn(`WARNING: ${schema.name} not set, using default in development`);
        }
      } else {
        env[schema.name] = value;
      }
    } else {
      if (schema.validate && !schema.validate(value)) {
        throw new Error(`Invalid value for ${schema.name}`);
      }
      env[schema.name] = value;
    }
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return env;
}

let _env: Record<string, string | undefined> | null = null;

export function getEnv(): Record<string, string | undefined> {
  if (!_env) {
    _env = validateEnv();
  }
  return _env;
}

export function getEnvVar(name: string): string | undefined {
  return getEnv()[name];
}

export const config = {
  get databaseUrl() {
    return getEnvVar("DATABASE_URL");
  },
  get jwtSecret() {
    return getEnvVar("JWT_SECRET");
  },
  get moltbookApiKey() {
    return getEnvVar("MOLTBOOK_API_KEY") || "";
  },
  get moltbookApiUrl() {
    return getEnvVar("MOLTBOOK_API_URL") || "https://api.moltbook.com";
  },
  get appUrl() {
    return getEnvVar("NEXT_PUBLIC_APP_URL") || "http://localhost:3000";
  },
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
};
