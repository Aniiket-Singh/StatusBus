import express from "express";
import jwt from "jsonwebtoken";
const app = express();
// import v1Router from "./routes/v1";
import { prismaClient } from "store/client";
import { AuthInput } from "./types";

app.use(express.json());
// app.use("/v1", v1Router);

app.post("/user/signup", async (req, res) => {
    const user_data = AuthInput.safeParse(req.body);
    if (!user_data.success){
        res.status(403).send("");
        return;
    }
    try {
        let user = await prismaClient.user.create({
            data: {
                username: user_data.data.username,
                password: user_data.data.password
            }
        })
        res.json({
            id: user.id
        })
    } catch (error) {
        res.status(403).send("");
        return;
    }
})

app.post("/user/signin", async (req, res) => {
    const user_data = AuthInput.safeParse(req.body);
    if (!user_data.success){
        res.status(403).send("");
        return;
    }
    try {
        let user = await prismaClient.user.findFirst({
            where: {
                username: user_data.data.username,
                password: user_data.data.password
            }
        })
        let token = jwt.sign({
            sub: user?.id
        }, process.env.JWT_SECRET!)
        res.json({
            jwt: token
        })
    } catch (error) {
        res.status(403).send("");
        return;
    }
})

// app.post("/website", async (req, res) => {
//     if(!req.body.url) {
//         return res.status(411).json({});
//     }
//     const website = await prismaClient.website.create({
//         data: {
//             url: req.body.url
//         }
//     });

//     res.json({ id:website.id });
// });

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