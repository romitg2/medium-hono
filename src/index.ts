import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { User } from "@prisma/client";
import { userRouter } from "./routes/user";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user/signup", userRouter);

app.get("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = prisma.user.create({
      data: {
        name: body.username,
        password: body.password,
      },
    });

    const jwt = await sign(
      {
        id: user.id;
      },
      c.env.JWT_SECRET,
    );
    return c.text(jwt);

  } catch (e) {
    c.status(400);
    return c.json({ message: "User already exists" });
  }

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
