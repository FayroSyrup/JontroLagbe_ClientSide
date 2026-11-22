import dns from "node:dns"

if (process.env.NODE_ENV === "development") {
    dns.setServers(["8.8.8.8", "1.1.1.1"])
}

import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"
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
    session: {
        // short cache so a role change by the admin shows up quickly
        cookieCache: { enabled: true, strategy: "jwt", maxAge: 60 },
    },
    // google users also get the customer role by default
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    // the jwt plugin creates the /api/auth/jwks route and signs the tokens
    plugins: [jwt()],
    database: mongodbAdapter(db, { client }),
})