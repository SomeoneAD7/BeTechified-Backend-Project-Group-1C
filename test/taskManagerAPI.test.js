const assert = require("node:assert/strict");
const { afterEach, beforeEach, test } = require("node:test");

const appPath = require.resolve("../taskManagerAPI");
let server;
let baseUrl;

beforeEach(async () => {
  delete require.cache[appPath];
  const app = require(appPath);
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterEach(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
  server = undefined;
});

const request = async (path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return response;
};

test("GET /api/tasks returns all tasks", async () => {
  const response = await request("/api/tasks");

  assert.equal(response.status, 200);
  assert.equal((await response.json()).length, 3);
});

test("GET /api/tasks/:id returns a task", async () => {
  const response = await request("/api/tasks/1");

  assert.equal(response.status, 200);
  assert.equal((await response.json()).title, "Study biology");
});

test("GET /api/tasks/:id returns 404 for a missing task", async () => {
  const response = await request("/api/tasks/999");

  assert.equal(response.status, 404);
});

test("POST /api/tasks creates a task", async () => {
  const response = await request("/api/tasks", {
    method: "POST",
    body: {
      title: "Write tests",
      description: "Cover the task API",
      status: "pending",
    },
  });
  const task = await response.json();

  assert.equal(response.status, 201);
  assert.equal(task.title, "Write tests");
  assert.equal(task.id, 4);
});

test("POST /api/tasks rejects invalid request bodies", async (t) => {
  const invalidBodies = [
    [{ description: "No title", status: "pending" }, "Missing title"],
    [{ title: "No description", status: "pending" }, "Missing description"],
    [
      { title: "Bad status", description: "Invalid", status: "blocked" },
      "Invalid status",
    ],
    [
      { title: "Bad status type", description: "Invalid", status: 1 },
      "Missing or invalid status",
    ],
  ];

  for (const [body, expectedError] of invalidBodies) {
    await t.test(expectedError, async () => {
      const response = await request("/api/tasks", { method: "POST", body });

      assert.equal(response.status, 400);
    });
  }
});

test("PUT /api/tasks/:id updates a task with a valid status", async () => {
  const response = await request("/api/tasks/1", {
    method: "PUT",
    body: { status: "completed" },
  });

  assert.equal(response.status, 200);
  assert.equal((await response.json()).status, "completed");
});

test("PUT and PATCH reject an invalid status without changing the task", async (t) => {
  for (const method of ["PUT", "PATCH"]) {
    await t.test(method, async () => {
      const response = await request("/api/tasks/1", {
        method,
        body: { status: "blocked" },
      });
      const task = await (await request("/api/tasks/1")).json();

      assert.equal(response.status, 400);
      assert.equal(task.status, "pending");
    });
  }
});

test("PUT /api/tasks/:id returns 404 for a missing task", async () => {
  const response = await request("/api/tasks/999", {
    method: "PUT",
    body: { status: "pending" },
  });

  assert.equal(response.status, 404);
});

test("PATCH /api/tasks/:id updates a task", async () => {
  const response = await request("/api/tasks/1", {
    method: "PATCH",
    body: { title: "Updated title" },
  });

  assert.equal(response.status, 200);
  assert.equal((await response.json()).title, "Updated title");
});

test("DELETE /api/tasks/:id removes a task", async () => {
  const response = await request("/api/tasks/1", { method: "DELETE" });
  const missingTask = await request("/api/tasks/1");

  assert.equal(response.status, 204);
  assert.equal(missingTask.status, 404);
});

test("DELETE /api/tasks/:id returns 404 for a missing task", async () => {
  const response = await request("/api/tasks/999", { method: "DELETE" });

  assert.equal(response.status, 404);
});
