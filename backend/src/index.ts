import express from "express";
import cors from "cors";
import path from "path";
import { ENV } from "./config/env";
import { clerkMiddleware } from '@clerk/express'
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors({
  origin: ENV.FRONTEND_URL, 
  credentials: true 
}));

app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.json({
    message: "Welcome to Cartify API",
    endpoints: {
      users: "/api/users",
      products: "/api/products",
      comments: "/api/comments",
    },
  });
});


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);


if (ENV.NODE_ENV === "production") {

  const frontendPath = path.join(__dirname, "../../frontend/dist");
  
  app.use(express.static(frontendPath));

  
  app.get("/*splat", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(ENV.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));