const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../db/init");
const { connectDB } = require("../db/init");
const User = require("../models/User.model");

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
beforeAll(async () => {
  await connectDB();
  await User.sync({ force: true });
  await User.bulkCreate(userData);
});

afterAll(async () => {
  await sequelize.close();
});

describe("user api test", () => {
  // signup new user
  it("should create a new user", async () => {
    const response = await request(app).post("/api/v1/users/signup").send({
      name: "jenny",
      email: "jenny@example.com",
      password: "jenny12345",
      role: "developer",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.user.name).toBe("jenny");
    expect(response.body.user.email).toBe("jenny@example.com");
    expect(response.body.user.role).toBe("developer");

    // Add a check to make sure the user exists in the database
    const createdUser = await User.findOne({
      where: { email: "jenny@example.com" },
    });
    expect(createdUser).toBeDefined();
  });

  // login existing user
  it("should return a token and login user", async () => {
    const response = await request(app).post("/api/v1/users/login").send({
      email: "danny@example.com",
      password: "danny12345",
    });
    // token should be returned

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login successfully");
  });

  // get all users details
  it("should return all users details", async () => {
    const loginUser = await request(app).post("/api/v1/users/login").send({
      email: "jenny@example.com",
      password: "jenny12345",
    });

    const token = loginUser.body.token; // Assuming your login returns a token
    console.log("token user", loginUser.body);

    const response = await request(app)
      .get("/api/v1/users/data")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("All users");
  });

  // get user by id
  it("should return user by id", async () => {
    const loginUser = await request(app).post("/api/v1/users/login").send({
      email: "jenny@example.com",
      password: "jenny12345",
    });

    const token = loginUser.body.token; // Assuming your login returns a token

    const response = await request(app)
      .get("/api/v1/users/data/6")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // update user by id
  it("should update user by id", async () => {
    const loginUser = await request(app).post("/api/v1/users/login").send({
      email: "jenny@example.com",
      password: "jenny12345",
    });

    const token = loginUser.body.token; // Assuming your login returns a token

    const response = await request(app)
      .put("/api/v1/users/update/6")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "jenny",
        email: "jenny@example.com",
        password: "jenny12345",
        role: "developer",
      });
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // delete user by id
  it("should delete user by id", async () => {
    const loginUser = await request(app).post("/api/v1/users/login").send({
      email: "jenny@example.com",
      password: "jenny12345",
    });

    const token = loginUser.body.token; // Assuming your login returns a token

    const response = await request(app)
      .delete("/api/v1/users/delete/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // find user by name
  it("should find user by name", async () => {
    // login user
    const loginUser = await request(app).post("/api/v1/users/login").send({
      email: "jenny@example.com",
      password: "jenny12345",
    });

    // Debugging: log the login response to inspect the error
    console.log("Login Response:", loginUser.body);

    // Check if login was successful
    expect(loginUser.status).toBe(200); // Ensure that the login is successful
    expect(loginUser.body.token).toBeDefined(); // Ensure the token is defined

    const token = loginUser.body.token; // Assuming your login returns a token

    // Make the request to find the user by name
    const response = await request(app)
      .get("/api/v1/users/find/jenny")
      .set("Authorization", `Bearer ${token}`);

    // Check the find response
    console.log("Find User Response:", response.body);

    expect(response.status).toBe(200); // Ensure status is 200
    expect(response.body.success).toBe(true); // Ensure the response has success
    expect(response.body.user.name).toBe("jenny"); // Ensure the correct user is returned
  });
});


