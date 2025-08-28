import express from "express";
import jwt from "jsonwebtoken";
// import v1Router from "./routes/v1";
import { prismaClient } from "store/client";
import { AuthInput } from "./types";
import { authMiddleWare } from "./middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors())

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

app.post("/website", authMiddleWare, async (req, res) => {
    if(!req.body.url) {
        return res.status(411).json({});
    }
    const website = await prismaClient.website.create({
        data: {
            url: req.body.url,
            user_id: req.user_id,
            createdAt: new Date()
        }
    });

    res.json({ id:website.id });
});

app.get("/status/:websiteId", authMiddleWare, async (req, res) => {
    const website = await prismaClient.website.findFirst({
        where: {
            user_id: req.user_id,
            id: req.params.websiteId
        },
        include: {
            ticks: {
                orderBy: [{
                    createdAt: 'desc'
                }],
                take: 10
            }
        }
    })
    if(!website){
        res.status(409).json({
            message: "Not Found"
        })
        return;
    }
    res.json({
        url: website.url,
        id: website.id,
        user_id:website.user_id
    })
});

app.get("/websites", authMiddleWare, async (req, res) =>{
    const websites = await prismaClient.website.findMany({
        where:{
            user_id: req.user_id
        }
    })

    res.json({
        websites
    })
})

const PORT = Number(process.env.PORT) || 3000;
const HOST = '127.0.0.1';

app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
});