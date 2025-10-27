import { MongoClient } from 'mongodb';

// POST api/new-meetup
export default async function handler(req, res)
{
    if(req.method === "POST")
    {
        try
        {
            const data = req.body;

            const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ogfqnmc.mongodb.net/?appName=Cluster0`);
            const db = client.db();

            const meeetupsCollection = db.collection("meetups");
            const response = await meeetupsCollection.insertOne(data)
            console.log(response);

            client.close();

            res.status(201).json({
                message: "Meetup inserted"
            })
        }
        catch(error)
        {
            console.log(error);
        }
    }
}

