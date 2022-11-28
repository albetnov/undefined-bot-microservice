const env = {
  safeGet(key: string, defaultValue: string = ""): string {
    if (process.env[key] && typeof process.env[key] === "string") {
      return process.env[key] === "" ? defaultValue : (process.env[key] as string);
    }

    return defaultValue;
  },

  get(key: string, defaultValue: string = "") {
    if (process.env[key]) {
      return process.env[key];
    }
    if (defaultValue) {
      return defaultValue;
    }

    return null;
  },

  getInt(key: string, defaultValue: number = 3000) {
    const getEnv = this.get(key);
    return typeof getEnv === "string" && +getEnv !== 0 ? +getEnv : defaultValue;
  },
};

export default env;
