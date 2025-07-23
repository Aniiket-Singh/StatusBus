import express from "express";
const app = express();
// import v1Router from "./routes/v1";
import { prismaClient } from "store/client";

app.use(express.json());
// app.use("/v1", v1Router);

app.post("/website", async (req, res) => {
    if(!req.body.url) {
        return res.status(411).json({});
        return
    }
    const website = await prismaClient.website.create({
        data: {
            url: req.body.url
        }
    });

    res.json({ id:website.id });
});

app.get("/status/:websiteId", (req, res) => {
    prismaClient.websiteTick.findMany({
        where: {
            website_id: req.params.websiteId
        }
    }).then(ticks => {
        res.json(ticks);
    }).catch(err => {
        res.status(500).json({ error: "Internal server error" });
    });
});

app.listen(process.env.PORT || 3000);