const express = require("express");
const swaggerDoc = require("swagger-ui-express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("./db/mongoose");

const swaggerDoccs = require("./helper/documentation");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const fleetRouter = require("./routers/fleet");
const activityRouter = require("./routers/activity");

const app = express();

app.use(
  cors({
    origin: "https://localhost:3000",
        methods: "GET,POST,PATCH , DELETE",
    credentials: true,
  })
);
const port = process.env.port || 5000;
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/documentatins", swaggerDoc.serve);
app.use("/documentatins", swaggerDoc.setup(swaggerDoccs));

app.use(userRouter);
app.use(taskRouter);
app.use(fleetRouter);
 app.use(activityRouter);

app.listen(port, () => {
  console.log("running at 5000");
});
