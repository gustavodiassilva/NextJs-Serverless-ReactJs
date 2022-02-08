import {VercelRequest, VercelResponse} from '@vercel/node'
import {MongoClient, Db, ConnectOptions} from 'mongodb'
import url from 'url'


let cacheDb: Db = null;

async function connectToDatabase(uri: string) {

  if(cacheDb) { 
    return cacheDb
  }

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
  }as ConnectOptions)

  const dbName = url.parse(uri).pathname.substring(1)

  const db = client.db(dbName)

  cacheDb = db

  return db 
}

 export default async (request: VercelRequest, response: VercelResponse) => {
  const { email } = request.body;

  if(!email){
    return response.status(204).json({message: 'Email is necessary'})
  }

  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('subscribers')

  await collection.insertOne({
    email,
    subscribeAt: new Date(),
  })


return response.status(201).json({ message: "Sucess"})
}