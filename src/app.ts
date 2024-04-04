import express from "express";
import routes from "./routes";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Export the app instance
export default app;