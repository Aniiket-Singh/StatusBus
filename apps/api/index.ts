import express from "express";
const app = express();
import v1Router from "./routes/v1";

app.use("/v1", v1Router);

app.post("/website", (req, res) => {

});

app.post("/status/:websiteId", (req, res) => {

});

app.listen(process.env.PORT || 3000);