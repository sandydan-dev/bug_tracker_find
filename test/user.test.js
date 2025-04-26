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
      email: "jenny@example.com",
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
  afterEach(() => {
    jest.clearAllMocks();
  });
  // post data
  it("should add new user data", async () => {
    const res = await request(app).post("/api/v1/users/signup").send({
      name: "jenny",
      email: "jenny@example.com",
      password: "jenny12345",
      role: "admin",
    });

    expect(res.status).toBe(201); // expect 201
    expect(res.body.success).toBe(true); // expect success true
    expect(res.body.message).toBe("User created successfully"); // expect message
    expect(res.body.user.name).toBe("jenny");
  });

  // login user
  // it("should login user", async () => {
  //   const res = await request(app).post("/api/v1/users/login").send({
  //     email: "k9V9o@example.com",
  //     password: "john12345",
  //   });
  //   expect(res.status).toBe(200); // expect 200
  //   expect(res.body.success).toBe(true); // expect success true
  //   expect(res.body.message).toBe("Login successfully"); // expect message
  // });

  // get all users
  // it("should get all users", async () => {
  //   const login = await request(app).post("/api/v1/users/login").send({
  //     email: "jenny@example.com",
  //     password: "jenny12345",
  //   });

  //   console.log(login.body); // 👈 add this line

  //   const token = login.body.token; // assuming you send token on login

  //   const res = await request(app)
  //     .get("/api/v1/users/data")
  //     .set("Authorization", `Bearer ${token}`); // 👈 sending token

  //   expect(res.status).toBe(200); // expect 200
  //   expect(res.body.success).toBe(true); // expect success true
  //   expect(res.body.message).toBe("All users"); // expect message
  // });

  // get user by id
 
});
