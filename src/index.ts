import { fromHono } from "chanfana";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { bearerAuth } from "hono/bearer-auth";

import {
  AssetCreate,
  AssetGet,
  AssetPut,
  AssetDelete,
} from "./endpoints/asset";

// Start a Hono app
const app = new Hono();

const signupToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InNpZ251cCIsImlhdCI6MTUxNjIzOTAyMn0.dCCwxiuLIylhi-8ninb8NqtN3eD_USfW7LHE4xWuZkk";
const privilegedToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFsbCIsImlhdCI6MTUxNjIzOTAyMn0.nAmkIg1PaT5gKL9Lr14Ssx85NHHF1KhVw275E94Jdso";
const privilegedMethods = ["POST", "PUT", "PATCH", "DELETE", "GET", "OPTIONS"];

app.use(
  "/api/*",
  cors({
    origin: [
      "https://simulator-backend.eocadm2025.workers.dev",
      "http://localhost:4173",
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// app.on(privilegedMethods, "/api/v1/*", async (c, next) => {
//   // Single valid privileged token
//   // const bearer = bearerAuth({ token: privilegedToken });
//   // return bearer(c, next);
//   return next();
// });

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/doc",
});

// asset
openapi.get("/api/v1/asset/:id", AssetGet);
openapi.post("/api/v1/asset", AssetCreate);
openapi.put("/api/v1/asset/:id", AssetPut);
openapi.delete("/api/v1/asset/:id", AssetDelete);

export default app;
