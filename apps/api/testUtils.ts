import axios from "axios";
import { password } from "bun";

const USRNAME = Math.random().toString();

export async function createUser(): Promise<{
    id: string,
    jwt: string
}> {
    const signupRes = await axios.post(`${process.env.BACKEND_URL}/user/signup`, {
        username: USRNAME,
        password: "123123123"
    })

    const signinRes = await axios.post(`${process.env.BACKEND_URL}/user/signin`, {
        username: USRNAME,
        password: "123123123"
    })

    return {
        id: signupRes.data.id,
        jwt: signinRes.data.jwt
    }
}