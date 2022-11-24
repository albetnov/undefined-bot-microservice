const env = {
  get(key: string, defaultValue: string = "") {
    if (process.env[key]) {
      return process.env[key];
    }
    if (defaultValue) {
      return defaultValue;
    }

    return "";
  },

  getInt(key: string, defaultValue: number = 3000) {
    const getEnv = this.get(key);
    return typeof getEnv === "string" && +getEnv !== 0 ? +getEnv : defaultValue;
  },
};

export default env;
