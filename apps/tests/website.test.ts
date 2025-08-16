import { describe, it, expect, beforeAll } from "bun:test";
import axios from "axios";
import * as dotenv from "dotenv";
import path from "path";
import { createUser } from "../api/testUtils";
import { BASE_URL } from "./config";

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
describe("To fetch website", () => {
    let token1: string, id1: string;
    let token2: string, id2: string;
    beforeAll(async () => {
        const data1 = await createUser();
        id1 = data1.id;
        token1 = data1.jwt;
        const data2 = await createUser();
        id2 = data2.id;
        token2 = data2.jwt;
    })
    it("able to fetch a website that user creates", async () => {
        const response = await axios.post(`${BASE_URL}/website`, {
            url: "https://excalidrawoo.com"
        }, {
            headers: {
                Authorization: token1
            }
        })
        const getWebsiteResponse = await axios.get(`${BASE_URL}/status/${response.data.id}`, {
            headers: {
                Authorization: token1
            }
        })
        console.log(response.data)
        console.log(getWebsiteResponse.data)
        expect(getWebsiteResponse.data.id).toBe(response.data.id);
        expect(getWebsiteResponse.data.user_id).toBe(id1);
    })
    it("cant access website created by other user", async () => {
        const response = await axios.post(`${BASE_URL}/website`, {
            url: "https://excalidrawoo.com"
            }, {
            headers: {
                Authorization: token1
            }
        })
        try {
            const getWebsiteResponse = await axios.get(`${BASE_URL}/status/${response.data.id}`, {
                headers: {
                    Authorization: token2
                }
            });
            expect(false, "should be able to access website of a different user");
        } catch (error) {
            console.log("Cant access website of a different user");
        }
    })
})