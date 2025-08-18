import {createClient} from "redis"
const client = await createClient()
.on("error", (err) => {
    console.log("Redis Client Error", err)
})
.connect();

type websiteArgs = {url: string, id: string}

export async function xAdd({url, id}: websiteArgs){
    await client.xAdd(
        'statusbus:web', '*', {
            url,
            id
        })
}

export async function xAddBulk(websites : websiteArgs[]){
    // for(let i = 0; i < websites.length; i++){
    //     await xAdd({
    //         url: websites[i].url,
    //         id: websites[i].id
    //     })
    // }
    websites.map(async (website) => {
        await xAdd({
            url: website.url,
            id: website.id
        })
    })
}