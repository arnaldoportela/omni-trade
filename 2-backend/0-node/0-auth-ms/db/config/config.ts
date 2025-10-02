import type { SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const Options: SequelizeOptions = {
  dialect: "postgres",
  define: {
    timestamps: true,
  },

  ...(process.env.DB_SSL === "true" && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
};

export default Options;
