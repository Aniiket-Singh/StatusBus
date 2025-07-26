import axios from "axios";

const USRNAME = `test-${Math.random().toString()}`;

export async function createUser(): Promise<{
    id: string,
    jwt: string
}> {
    const signupRes = await axios.post(`http://127.0.0.1:3000/user/signup`, {
        username: USRNAME,
        password: "123123123"
    })

    const signinRes = await axios.post(`http://127.0.0.1:3000/user/signin`, {
        username: USRNAME,
        password: "123123123"
    })

    return {
        id: signupRes.data.id,
        jwt: signinRes.data.jwt
    }
}