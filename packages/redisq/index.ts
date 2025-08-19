import {createClient} from "redis"
import type { StreamEntry, MessageType} from "shared-types"

const client = await createClient()
.on("error", (err) => {
    console.log("Redis Client Error", err)
})
.connect();

type websiteArgs = {url: string, id: string}
const STREAM_NAME = 'statusbus:web'

export async function xAdd({url, id}: websiteArgs){
    await client.xAdd(
        STREAM_NAME, '*', {
            url,
            id
        })
}

export async function xAddBulk(websites : websiteArgs[]){
    websites.map(async (website) => {
        await xAdd({
            url: website.url,
            id: website.id
        })
    })
}

export async function xReadGroup(consumerGroup: string, consumerId: string){
    const response = await client.xReadGroup(consumerGroup, consumerId, {
        key: STREAM_NAME,
        id: '>'
    }, {
        'COUNT': 5
    } );
    //@ts-ignore
    const messages: StreamEntry<MessageType>[] = response[0].messages
    console.log(messages)
    return messages
}

export async function xAck(consumerGroup: string, eventId:string){
    const response = await client.xAck(STREAM_NAME, consumerGroup, eventId)
    console.log(response)
}