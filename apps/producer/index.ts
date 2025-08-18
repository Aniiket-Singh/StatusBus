import {xAddBulk} from "redisq/client"
import {prismaClient} from "store/client"

async function main (){
    let websites= await prismaClient.website.findMany({
        select:{
            url: true,
            id: true
        }
    });
    await xAddBulk(websites.map(website => ({
        url: website.url,
        id: website.id
    })))
}

main()

setInterval(() => {
    main()
}, 3*1000);