const request = require("supertest");
const app = require("../server");

describe("Test the Users API", () => {
  let token; // Variable to store the authentication token
  let _id;

  test("POST /api/users/login", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "sapatel@scu.edu",
      password: "test123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("token");
    token = response.body.token; // Store the token for future requests
    _id = response.body._id;
  });

  test("GET /api/users/getUsers", async () => {
    const response = await request(app)
      .get("/api/users/getUsers")
      .set("Authorization", `JWT ${token}`);
    expect(response.statusCode).toBe(200);
    // expect(response.body).toHaveProperty("users");
    expect(Array.isArray(response.body)).toBe(true); // Expecting an array

    response.body.forEach((user) => {
      expect(user).toHaveProperty("_id");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("firstName");
      expect(user).toHaveProperty("lastName");
    });
  });

  test("GET /api/users/getOneUser", async () => {
    const response = await request(app)
      .get("/api/users/getOneUser")
      .set("Authorization", `JWT ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("password");
    expect(response.body).toHaveProperty("firstName");
    expect(response.body).toHaveProperty("lastName");
  });

  test("PUT /api/users/updateUserProfile", async () => {
    const response = await request(app)
      .put("/api/users/updateUserProfile")
      .set("Authorization", `JWT ${token}`)
      .send({
        _id: _id,
        firstName: "Smit",
        lastName: "Patel",
        phoneNo: "408-581-2764",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("firstName");
    expect(response.body).toHaveProperty("lastName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phoneNo");
  });
});

describe("Test the Posts API", () => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDY2N2Q5OTQ2NzEwOWY2ZDdkNzBmODIiLCJlbWFpbCI6InNhcGF0ZWxAc2N1LmVkdSIsImlhdCI6MTY4NDQ3ODcyM30.G1_l0Ee-bgzR1Z-RfD2dZ1mpswRaoES1Zx5NoaA1ts4"; // Variable to store the authentication token
  let postId; // Variable to store the ID of the created post

  test("POST /api/posts/createPost", async () => {
    const response = await request(app)
      .post("/api/posts/createPost")
      .set("Authorization", `JWT ${token}`)
      .send({
        address: "address",
        moveIn: "date in",
        moveOut: "date out",
        userId: "64667d99467109f6d7d70f82",
        userPhone: "phone",
        userEmail: "name",
        rent: "rent",
        comments: "comments",
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("moveIn");
    expect(response.body).toHaveProperty("moveOut");
    expect(response.body).toHaveProperty("userId");
    expect(response.body).toHaveProperty("userPhone");
    expect(response.body).toHaveProperty("userEmail");
    expect(response.body).toHaveProperty("rent");
    expect(response.body).toHaveProperty("comments");
    expect(response.body).toHaveProperty("_id");
    postId = response.body._id; // Store the post ID for future requests
  });

  test("GET /api/posts/getAllPosts", async () => {
    const response = await request(app)
      .get("/api/posts/getAllPosts")
      .set("Authorization", `JWT ${token}`);
    expect(response.statusCode).toBe(200);
    // expect(response.body).toHaveProperty("posts");
    expect(Array.isArray(response.body)).toBe(true); // Expecting an array

    response.body.forEach((post) => {
      expect(post).toHaveProperty("_id");
      expect(post).toHaveProperty("address");
      expect(post).toHaveProperty("moveIn");
      expect(post).toHaveProperty("moveOut");
      expect(post).toHaveProperty("userId");
      expect(post).toHaveProperty("userPhone");
      expect(post).toHaveProperty("userEmail");
      expect(post).toHaveProperty("rent");
      expect(post).toHaveProperty("comments");
    });
  });

  test("GET /api/posts/getPostByUserId", async () => {
    const response = await request(app)
      .get("/api/posts/getPostByUserId")
      .set("Authorization", `JWT ${token}`);
    expect(response.statusCode).toBe(200);
    // expect(response.body).toHaveProperty("posts");
    expect(Array.isArray(response.body)).toBe(true); // Expecting an array

    response.body.forEach((post) => {
      expect(post).toHaveProperty("_id");
      expect(post).toHaveProperty("address");
      expect(post).toHaveProperty("moveIn");
      expect(post).toHaveProperty("moveOut");
      expect(post).toHaveProperty("userId");
      expect(post).toHaveProperty("userPhone");
      expect(post).toHaveProperty("userEmail");
      expect(post).toHaveProperty("rent");
      expect(post).toHaveProperty("comments");
    });
  });

  test("PUT /api/posts/updatePost", async () => {
    const response = await request(app)
      .put(`/api/posts/updatePost`)
      .set("Authorization", `JWT ${token}`)
      .send({
        _id: postId,
        address: "test",
        moveIn: "test",
        moveOut: "test",
        userPhone: "test",
        userEmail: "test",
        rent: "test",
        comments: "test",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("moveIn");
    expect(response.body).toHaveProperty("moveOut");
    expect(response.body).toHaveProperty("userPhone");
    expect(response.body).toHaveProperty("userEmail");
    expect(response.body).toHaveProperty("rent");
    expect(response.body).toHaveProperty("comments");
  });

  test("DELETE /api/posts/deletePost", async () => {
    const response = await request(app)
      .delete(`/api/posts/deletePost`)
      .set("Authorization", `JWT ${token}`)
      .send({
        _id: postId,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
