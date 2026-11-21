import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string)
// same database name as the express server
const db = client.db("jontrolagbedb")

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        // the assignment says at least 6 characters
        minPasswordLength: 6,
    },
    user: {
        additionalFields: {
            // input is false so nobody can choose a role while registering
            role: {
                type: "string",
                input: false,
                defaultValue: "customer",
            },
            phone: { type: "string", required: false },
            address: { type: "string", required: false },
        },
    },
    // google users also get the customer role by default
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, { client }),
})