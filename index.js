import app from "./server.js";
import { MongoClient } from "mongodb";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.RESTREVIEWS);

const port = process.env.PORT || 8000;

async function run() {
  try {
    await client
      .connect({
        maxPoolSize: 50,
        writeConcern: 2500,
        useNewUrlParse: true,
      })
      .then(async (client) => {
        await RestaurantsDAO.injectDB(client);
        app.listen(port, () => {
          console.log(`listening to port ${port}`);
        });
      });
  } catch (err) {
    console.log(err.stack);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
