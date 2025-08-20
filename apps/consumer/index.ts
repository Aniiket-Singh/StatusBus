import { xAck, xAckBulk, xReadGroup,  } from "redisq/client"
import { prismaClient } from "store/client";
import axios from "axios"
import type { MessageType } from "shared-types"

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
    const promisesArray = responses.map( async ({id, message}) => await fetchWebsite(id, message.url, message.id)) 
    await Promise.all(promisesArray)
    }

async function fetchWebsite(id: string, messageUrl: string, messageId: string){
    const url = messageUrl
    const website_id = messageId
    let startTime = Date.now()
    await axios.get(url)  
    .then( async ()=> {
        await prismaClient.websiteTick.create({
            data: {
                rt_ms: Number(Date.now() - startTime),
                status: "Up",
                region_id: REGION_ID,
                website_id
            }
        })
        console.log('Event ID (success) : ', id)
    }).catch( async () => {
        await prismaClient.websiteTick.create({
            data: {
                rt_ms: Number(Date.now() - startTime),
                status: "Down",
                region_id: REGION_ID,
                website_id
            }
        })
        console.log('Event ID (fail) : ', id)
    }).finally(async () => {
        try{
            await xAck(REGION_ID, id)
        } catch (ackError) {
            console.log("couldnt ack the message with ID : ", id)
            console.log(ackError)
        }
    })
}

main()