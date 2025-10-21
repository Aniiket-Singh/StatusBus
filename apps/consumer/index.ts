import { xAck, xAckBulk, xReadGroup, xGroupCreate } from "redisq/client"
import { prismaClient } from "store/client";
import axios from "axios"
import type { MessageType, StreamEntry } from "shared-types"

const REGION_ID = process.env.REGION_ID!;
const CONSUMER_ID = process.env.CONSUMER_ID!;

if (!REGION_ID) {
    throw new Error("Region not provided");
}

if (!CONSUMER_ID) {
    throw new Error("Consumer not provided");
}

class WebsiteListConsumer{
    private isRunning = false

    async start() {
        if(this.isRunning){
            console.log('Consumer already running')
            return
        }

        this.isRunning = true
        console.log(`Starting Consumer ID: ${CONSUMER_ID} . . .`)

        await this.initializeConsumerGroup()
        this.processLoop()
    }

    async stop(){
        console.log(`Stopping Consumer ID: ${CONSUMER_ID} . . .`)
        this.isRunning = false
    }

    private async initializeConsumerGroup() {
        try {
            await xGroupCreate(REGION_ID, "0")
            console.log(`Consumer group ${REGION_ID} ready`)
        } catch (error) {
            console.log(`Consumer group ${REGION_ID} already exists or error:`, error)
        }
        await xGroupCreate(REGION_ID, "0");
    }

    private async processLoop() { 
        while(this.isRunning){
            try {
                const responses = await xReadGroup(REGION_ID, CONSUMER_ID)

                if(responses.length > 0){
                    console.log(`Processing ${responses.length} monitoring jobs`)
                    await this.jobProcessor(responses)
                    // const promisesArray = responses.map(async ({ id, message }) => await fetchWebsite(id, message.url, message.id))        
                    // await Promise.all(promisesArray)
                } else {
                    // if no jobs yet pushed -> responses.length == 0 ->  superloop becomes resource-intensive -> 1 sec timeout converts this loop into a 1sec interval polling function to avoid overloading system
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            } catch (error) {
                console.log("Loop Error")
                await new Promise(resolve => setTimeout(resolve, 5000))
            } 

        }
    }

    private async jobProcessor(messages: StreamEntry<MessageType>[]){
        const promisesArray = messages.map(async ({ id, message }) => await this.fetchWebsite(id, message.url, message.id))        
        await Promise.all(promisesArray)
    }

    private async fetchWebsite(id: string, messageUrl: string, websiteId: string) {
        const website = await prismaClient.website.findUnique({
            where: { id: websiteId },
        });

        // 2. If it doesn't exist, log it, acknowledge the message, and stop processing
        if (!website) {
            console.warn(`Website with ID ${websiteId} not found in database. Skipping tick creation.`);
            await xAck(REGION_ID, id);
            return;
        }

        let startTime = Date.now()
        await axios.get(messageUrl)
            .then(async () => {
                await prismaClient.websiteTick.create({
                    data: {
                        rt_ms: Number(Date.now() - startTime),
                        status: "Up",
                        region_id: REGION_ID,
                        website_id: websiteId
                    }
                })
                console.log('Event ID (success) : ', id)
            }).catch(async () => {
                await prismaClient.websiteTick.create({
                    data: {
                        rt_ms: Number(Date.now() - startTime),
                        status: "Down",
                        region_id: REGION_ID,
                        website_id: websiteId
                    }
                })
                console.log('Event ID (fail) : ', id)
            }).finally(async () => {
                try {
                    await xAck(REGION_ID, id)
                } catch (ackError) {
                    console.log("couldnt ack the message with ID : ", id)
                    console.log(ackError)
                }
            })
    }
}

const consumer = new WebsiteListConsumer()

process.on('SIGINT', async () => {
    console.log('Received SIGINT, shutting down gracefully...')
    await consumer.stop()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, shutting down gracefully...')
    await consumer.stop()
    process.exit(0)
})

consumer.start()