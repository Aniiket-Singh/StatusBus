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
    throw new Error("Region not provided");
}

async function main(){

    const response = await xReadGroup(REGION_ID, CONSUMER_ID)
    response.map(({id, message} : {id: string, message: MessageType}) => {
        const url = message.url
        const website_id = message.id
        let startTime = Date.now()
        axios.get(url)  
        .then( ()=> {
            prismaClient.websiteTick.create({
                data: {
                    rt_ms: Number(Date.now() - startTime),
                    status: "Up",
                    region_id: REGION_ID,
                    website_id, 
                }
            })
        }).catch( () => {
            console.log("axios call failed")
        })
    })
    
    xAck(REGION_ID, "a");
}

main()