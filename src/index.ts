import { Hono } from "hono";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  return c.text("Hello World");
});

app.post("/api/v1/user/signup", (c) => {
  return c.text("Hello World");
});

app.post("/api/v1/user/login", (c) => {});

app.post("api/v1/blog", (c) => {});

app.put("api/v1/blog/:id", (c) => {});

app.get("api/v1/blog", (c) => {});

app.get("api/v1/blog/:id", (c) => {});

export default app;

// postgresql://medium_owner:WtTaMhw54bDF@ep-summer-forest-a1v70opm.ap-southeast-1.aws.neon.tech/medium?sslmode=require
