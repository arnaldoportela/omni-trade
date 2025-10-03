import type { SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const Options: SequelizeOptions = {
  dialect: "postgres",
  timezone: "+00:00",
  define: {
    timestamps: true,
  },
  dialectOptions: {
    useUTC: true
  },
};

export default Options;
