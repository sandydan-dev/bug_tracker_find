const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../db/init");
// models
const User = require("../models/User.model");

// beforeAll hook
beforeAll(async () => {
  await sequelize.sync({ force: true });

  const userData = [
    {
      name: "John Doe",
      email: "k9V9o@example.com",
      password: "john12345",
      role: "developer",
    },
    {
      name: "Jane Doe",
      email: "5Tb4i@example.com",
      password: "jane12345",
      role: "admin",
    },
    {
      name: "danny",
      email: "danny@example.com",
      password: "danny12345",
      role: "developer",
    },
    {
      name: "santosh",
      email: "s1Ft8@example.com",
      password: "santosh12345",
      role: "admin",
    },
    {
      name: "kamal",
      email: "kamal@gmail.com",
      password: "kamal12345",
      role: "developer",
    },
  ];
  await User.bulkCreate(userData);
});

// afterAll hook
afterAll(async () => {
  await sequelize.close();
});

describe("User Controller API Test", () => {
  // post data
  it("should adding new user data", async () => {
    const res = await request(app).post("/api/v1/users/signup").send({
      name: "jay",
      email: "jay@example.com",
      password: "jay12345",
      role: "admin",
    });

    // expect response
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User created successfully");
    expect(res.body.success).toBe(true);

    // check database
    // find user by email
    const user = await User.findOne({ where: { email: "jay@example.com" } });
    expect(user.name).toBe("jay");
    expect(user.email).toBe("jay@example.com");
    expect(user.password).toBe("jay12345");
  });

  // if user already exist
  it("should return error if user already exist", async () => {
    const res = await request(app).post("/api/v1/users/signup").send({
      name: "danny",
      email: "danny@example.com",
      password: "danny12345",
      role: "developer",
    });

    // expect response
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("User already exist");
    expect(res.body.success).toBe(false);
  });
});
