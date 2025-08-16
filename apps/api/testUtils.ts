import axios from "axios";
import {BASE_URL} from "../tests/config";

export async function createUser(): Promise<{
    id: string,
    jwt: string
}> {
    const USRNAME = `test-${Math.random().toString()}`;
    const signupRes = await axios.post(`${BASE_URL}/user/signup`, {
        username: USRNAME,
        password: "123123123"
    })

    const signinRes = await axios.post(`${BASE_URL}/user/signin`, {
        username: USRNAME,
        password: "123123123"
    })

    return {
        id: signupRes.data.id,
        jwt: signinRes.data.jwt
    }
}