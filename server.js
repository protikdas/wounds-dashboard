/* <------------IMPORTS------------> */
import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";

/* <------------ROUTES--------------> */
import apiRouter from "./routes";

/* <-----PORT SETTINGS-----> */
const PORT = process.env.SERVER_PORT || 5000;

/* <----------EXPRESS SETTINGS----------> */
const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* <------------STATIC SETTINGS------------> */
app.use(express.static(__dirname + "/build"));

/* <------------PROXY REQUESTS--------------> */
app.use("/api", apiRouter);

/* <------------SERVE BUILD--------------> */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

/* <------------SERVER LISTEN------------> */
app.listen(PORT, () => console.log("Server started on port " + PORT));
