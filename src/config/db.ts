import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://new-project-server:GHuwCXHgKz20Ml6S@cluster0.gizlskc.mongodb.net/?appName=Cluster0",
);

    export const db = client.db(`new-project-server`);
    export const projectCollection = db.collection("projects");

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}
