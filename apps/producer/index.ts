import {xAddBulk} from "redisq/client"
import {prismaClient} from "store/client"

async function main (){
    let websites= await prismaClient.website.findMany({
        select:{
            url: true,
            id: true,
            user_id: true
        }
    });

    console.log(websites.length)

    await xAddBulk(websites.map(website => ({
        url: website.url,
        id: website.id,
        user_id: website.user_id
    })))
    .then( ()=> {
        console.log("xAddBulk done")
    })
}

main()

setInterval(() => {
    main()
}, 3*60*1000);