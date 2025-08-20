import { xAck, xAckBulk, xReadGroup,  } from "redisq/client"
import { prismaClient } from "store/client";
import axios from "axios"
import type { MessageType } from "shared-types"
import { resolve } from "bun";

const REGION_ID = process.env.REGION_ID!;
const CONSUMER_ID = process.env.CONSUMER_ID!;

if(!REGION_ID){
    throw new Error("Region not provided");
}

if(!CONSUMER_ID){
    throw new Error("Consumer not provided");
}

async function main(){
    const responses = await xReadGroup(REGION_ID, CONSUMER_ID)
    let promisesArray = responses.map( async ({message}) => fetchWebsite(message.url, message.id)) 
    await Promise.all(promisesArray)
    xAckBulk(REGION_ID, responses.map(({id}) => id))
    }

async function fetchWebsite(messageUrl: string, messageId: string){
    return new Promise<void>((resolve, reject) => {
        const url = messageUrl
        const website_id = messageId
        let startTime = Date.now()
        axios.get(url)  
        .then( async ()=> {
            await prismaClient.websiteTick.create({
                data: {
                    rt_ms: Number(Date.now() - startTime),
                    status: "Up",
                    region_id: REGION_ID,
                    website_id
                }
            })
            // console.log('Event ID (success) : ', id)
            // xAck(REGION_ID, id);
            // resolve()
        }).catch( async () => {
            console.log("axios call failed")
            await prismaClient.websiteTick.create({
                data: {
                    rt_ms: Number(Date.now() - startTime),
                    status: "Down",
                    region_id: REGION_ID,
                    website_id
                }
            })
            // console.log('Event ID (fail) : ', id)
            // xAck(REGION_ID, id);
            // resolve();
        })
    })
}
main()