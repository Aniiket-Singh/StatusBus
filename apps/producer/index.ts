import {xAddBulk} from "redisq/client"
import {prismaClient} from "store/client"

async function main (){
    let websites= await prismaClient.website.findMany({
        select:{
            url: true,
            id: true
        }
    });

    console.log(websites.length)
    await xAddBulk(websites.map(website => ({
        url: website.url,
        id: website.id
    })))
    .then( ()=> {
        console.log("xAddBulk done")
    })
}

main()

setInterval(() => {
    main()
}, 3*1000);