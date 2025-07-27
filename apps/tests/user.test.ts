import {describe, it, expect} from "bun:test";
import axios from "axios";
import { BASE_URL } from "./config";

let USERNAME = Math.random().toString();
// let PASSWORD = `PSWRD--${Math.random().toString()}`

describe("Signup endpoints", () => {
    it("unable to sign up with incorrect body", async () => {
        try {
            const res = await axios.post(`${BASE_URL}/user/signup`, {
                email: USERNAME,
                password: "password"
            });
            expect(false, "control shouldnt reach here");
        } catch (error) {
            // console.log(error)
        }
    })

    it("able to sign up with correct body", async () => {
        try {
            const res = await axios.post(`${BASE_URL}/user/signup`, {
                username: USERNAME,
                password: "password"
            });
            expect(res.status).toBe(200);
            expect(res.data.id).toBeDefined();
        } catch (error) {
            console.log(error)
        }
    })
})

describe("signin endpoints", () => {
    it("unable to sign in with incorrect body", async () => {
        try {
            const res = await axios.post(`${BASE_URL}/user/signin`, {
                email: USERNAME,
                password: "password"
            });
            expect(false, "control shouldnt reach here");
        } catch (error) {
            // console.log(error)
        }
    })

    it("able to sign in with correct body", async () => {
        try {
            const res = await axios.post(`${BASE_URL}/user/signin`, {
                username: USERNAME,
                password: "password"
            });
            expect(res.status).toBe(200);
            expect(res.data.jwt).toBeDefined();
        } catch (error) {
            console.log(error)
        }
    })
})
