import {xAddBulk} from "redisq/client"
import {prismaClient} from "store/client"

type intervalObject = NodeJS.Timeout | null

class WebsiteListProducer {
    private isRunning = false
    private intervalId : intervalObject = null 
    private MONITORING_INTERVAL = 3*60*1000

    async start(){
        if (this.isRunning){
            console.log("Producer from previous queue is already running")
            return
        }

        this.isRunning = true

        await this.jobMonitor()
        
        this.intervalId = setInterval(()=> {
            this.jobMonitor()
        }, this.MONITORING_INTERVAL )
    }

    async stop(){
        this.isRunning = false
        console.log("Stopping the monitor . . .")
        if(this.intervalId){
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

    private async jobMonitor(){
        try {
            let websites= await prismaClient.website.findMany({
                select:{
                    url: true,
                    id: true,
                    user_id: true
                }
            });

            if (websites.length === 0) {
                console.log('No websites to monitor')
                return
            }

            console.log(`Producing monitoring jobs for ${websites.length} websites`)

            await xAddBulk(websites.map(website => ({
                url: website.url,
                id: website.id,
                user_id: website.user_id,
                timestamp: Date.now().toString()
            })))
            .then( ()=> {
                console.log(`${websites.length} jobs queued`)
            })
        } catch (error) {
            console.error('Error producing monitoring jobs:', error)
        }
    }
}

const producer = new WebsiteListProducer()

process.on('SIGINT', async () => {
    console.log('SIGINT signal received')
    await producer.stop()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    console.log('SIGNTERM signal received')
    await producer.stop()
    process.exit(0)
})

producer.start()