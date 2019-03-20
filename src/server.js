const express = require("express");
const helmet = require("helmet");
const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");
const middlewares = require("./middlewares/index");

const app = express();

app.use(helmet());
app.use(express.json());

app.use(middlewares.handleEmptyPayload);
app.use(middlewares.contentTypeSet);
app.use(middlewares.contentTypeJson);
app.use(middlewares.handleErrors);
app.use(middlewares.setResponseHeaders);

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
