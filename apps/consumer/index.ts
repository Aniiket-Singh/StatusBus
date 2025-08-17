import {createClient} from "redis"

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
}

main()