import {createClient} from "redis"
import {prismaClient} from "store/client"
import axios from "axios"

async function main (){
    const client = await createClient({
        url: "redis://localhost:6379"
    })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

    const response = await client.xReadGroup('india', 'india-1', {
        key: 'statusbus:web',
        id: '>'
    }, {
        COUNT: 2
    })

    console.log(response)
    //@ts-ignore
    let websitesToTrack = response[0].messages;
    //@ts-ignore
    websitesToTrack.forEach(website => {
        let startTime = Date.now()
        axios.get(website.url)
        .then(() => {
            prismaClient.websiteTick.create({
                status: "Up",
                rt_ms: Date.now() - startTime,
                region_id: "india",
                website_id: website.id
            })
        })
        .catch( () => {

        })
    })
}

main()