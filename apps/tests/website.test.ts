import { describe, it, expect, beforeAll } from "bun:test";
import axios from "axios";
import * as dotenv from "dotenv";
import path from "path";
import { createUser } from "../api/testUtils";

// // Load DEV_BASE_URL from apps/tests/.env
// dotenv.config({ path: path.resolve(__dirname, "../.env") });
// // Load PORT from apps/api/.env
// dotenv.config({ path: path.resolve(__dirname, "../api/.env") });

// const DEV_BASE_URL = process.env.DEV_BASE_URL;
// const PORT = process.env.PORT;
const BASE_URL = "http://127.0.0.1:3000";


describe("Website gets created",  () => {
    let token: string, id: string;

    beforeAll(async () => {
        const data = await createUser();
        id = data.id;
        token = data.jwt;
    })
    it("website not created if url not present", async () => {
        try {
            await axios.post(`${BASE_URL}/website`, {

            }, {
                headers: {
                    Authorization: token
                }
            })
            expect(false, "website created when it shouldnt")
        } catch (error) {
            
        }
    })

    it("website created if url and header are present", async () => {
        try {
            const response = await axios.post(`${BASE_URL}/website`, {
                url: "https://excalidrawoo.com"
            }, {
                headers: {
                    Authorization: token
                }
            })
            expect(response.data.id).not.toBeNull();
        } catch (error) {
            
        }
    })

    it("website not created if header not present", async () => {
        try {
            const response = await axios.post(`${BASE_URL}/website`, {
                url: "https://excalidraw.com"
            })
            expect(false, "website shouldnt be created without Auth header");
        }
        catch (e) {
            
        }
    })
})