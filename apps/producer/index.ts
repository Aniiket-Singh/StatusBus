import {xAddBulk} from "redisq/client"
import {prismaClient} from "store/client"

async function main (){
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

main()

setInterval(() => {
    main()
}, 3*60*1000);