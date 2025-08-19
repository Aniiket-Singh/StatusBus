import axios from "axios";
import {BASE_URL} from "../tests/config";

export async function createUser(): Promise<{
    id: string,
    jwt: string
}> {
    const USRNAME = `test-${Date.now()}-${Math.random()}`;
    try {
        const signupRes = await axios.post(`${BASE_URL}/user/signup`, {
            username: USRNAME,
            password: "123123123"
        })

        const signinRes = await axios.post(`${BASE_URL}/user/signin`, {
            username: USRNAME,
            password: "123123123"
        })

        if (!signupRes.data.id || !signinRes.data.jwt) {
            throw new Error("Signup or signin failed to return the expected ID and JWT.");
        }

        return {
            id: signupRes.data.id,
            jwt: signinRes.data.jwt
        }
    }
    catch (e) {
        console.error("Error in createUser test utility:", e);
        throw e;
    }

}