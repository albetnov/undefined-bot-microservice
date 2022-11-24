const env = {
  get(key: string, defaultValue: string = "") {
    if (key in process.env && process.env[key]) {
      return process.env[key];
    }
    if (defaultValue) {
      return defaultValue;
    }

    return "";
  },

  getInt(key: string, defaultValue: number = 0) {
    const getEnv = this.get(key);
    return typeof getEnv === "string" ? +getEnv : defaultValue;
  },
};

export default env;
