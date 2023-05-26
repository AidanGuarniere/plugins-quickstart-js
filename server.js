const express = require("express");
const cors = require("cors");
const openApiValidator = require("express-openapi-validator");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const SERVICE_AUTH_KEY = process.env.SERVICE_AUTH_KEY;

function assertAuthHeader(req, res, next) {
  if (req.headers.authorization !== `Bearer ${SERVICE_AUTH_KEY}`) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
}

app.use(cors());
app.use(express.json());

app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));
app.use("/openapi.json", express.static(path.join(__dirname, "openapi.json")));
app.use("/logo.png", express.static(path.join(__dirname, "logo.png")));

const todos = {};

app.get("/route", assertAuthHeader, (req, res) => {
  const getFunction = () => {
    // logic
  };
  try {
    getFunction();
    res.json(200, { data });
  } catch (error) {
    res.json(500, { error });
  }
});

app.post("/route", assertAuthHeader, (req, res) => {
  const { data } = req.body;

  const postFunction = (data) => {
    // logic
  };
  try {
    postFunction();
    res.json(200, { data });
  } catch (error) {
    res.json(500, { error });
  }
});

app.delete("/route", assertAuthHeader, (req, res) => {
  const { data } = req.body;
  const deleteFunction = (data) => {
    // logic
  };
  try {
    deleteFunction();
    res.json(200, { data });
  } catch (error) {
    res.json(500, { error });
  }
});

app.use(
  openApiValidator.middleware({
    apiSpec: path.join(__dirname, "openapi.json"),
    validateRequests: true,
    validateResponses: true,
  })
);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
