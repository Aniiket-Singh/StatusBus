import { describe, it, expect } from "bun:test";
import axios from "axios";
import * as dotenv from "dotenv";
import path from "path";

// Load DEV_BASE_URL from apps/tests/.env
dotenv.config({ path: path.resolve(__dirname, "../tests/.env") });
// Load PORT from apps/api/.env
dotenv.config({ path: path.resolve(__dirname, "../api/.env") });

const DEV_BASE_URL = process.env.DEV_BASE_URL?.replace(/"/g, "");
const PORT = process.env.PORT;
const BASE_URL = `${DEV_BASE_URL}:${PORT}`;

describe("Website gets created",  () => {
    it("website not created if url not present", async () => {
        try {
            await axios.post(`${BASE_URL}/website`, {})
            expect(false, "website created when it shouldnt")
        } catch (error) {
            
        }
    })
    it("website created if url is present", async () => {
        const response = await axios.post(`${BASE_URL}/website`, {
            url: "https://excalidraw.com"
        })
        expect(response.data.id).not.toBeNull();
    })
})