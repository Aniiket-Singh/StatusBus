import { xAck, xReadGroup,  } from "redisq/client"
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
    for(const {id, message} of responses) {
        const url = message.url
        const website_id = message.id
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
        })
        console.log('Event ID : ', id)
        xAck(REGION_ID, id);
    }
    // response.map(({id, message} : {id: string, message: MessageType}) => {
        
    // })
    

}

main()