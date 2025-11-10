import express from "express";
import morgan from "morgan";
import tareasRoutes from "./router/tareas.routes.js";
import authRoutes from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { pool } from "./db.js";
import { ORIGIN } from "./config.js";

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "Bienvenidos" });
});
app.get("/api/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});
app.use("/api", tareasRoutes);
app.use("/api", authRoutes);

//Manejo de errores
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
