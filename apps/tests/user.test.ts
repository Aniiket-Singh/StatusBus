import {describe, it, expect} from "bun:test";
import axios from "axios";

describe("Signup endpoints", () => {
    it("unable to sign up with incorrect body", async () => {
        try {
                const res = await axios.post(`${process.env.BACKEND_URL}/user/signup`, {
                    usrname: "aniket@email",
                    passwurd: "aniket@password"
                });
                expect(false, "control shouldnt reach here");
        } catch (error) {
            console.log(error)
        }
    })
})

describe("Signup endpoints", () => {
    it("able to sign up with correct body", async () => {
        const res = await axios.post(`${process.env.BACKEND_URL}/user/signup`, {
            username: "aniket@email",
            password: "aniket@password"
        });
        expect(res.status).toBe(200);
        expect(res.data.id).toBeDefined();
    })
})

describe("signin endpoints", () => {
    it("unable to sign in with incorrect body", async () => {
        try {
                const res = await axios.post(`${process.env.BACKEND_URL}/user/signin`, {
                    usrname: "aniket@email",
                    passwurd: "aniket@password"
                });
                expect(false, "control shouldnt reach here");
        } catch (error) {
            console.log(error)
        }
    })
})

describe("signin endpoints", () => {
    it("able to sign in with correct body", async () => {
        const res = await axios.post(`${process.env.BACKEND_URL}/user/signin`, {
            username: "aniket@email",
            password: "aniket@password"
        });
        expect(res.status).toBe(200);
    })
})