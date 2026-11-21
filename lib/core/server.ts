import "server-only"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "../auth"

export const getSession = async () => {
    return auth.api.getSession({ headers: await headers() })
}

// the jwt comes from the better auth jwt plugin, express checks it with the public keys
export const getToken = async () => {
    const session = await getSession()
    if (!session) {
        redirect("/sign-in")
    }
    const { token } = await auth.api.getToken({ headers: await headers() })
    return token
}

export const authFetch = async (api: string) => {
    const token = await getToken()
    const res = await fetch(api, {
        headers: { authorization: `Bearer ${token}` },
        cache: "no-store",
    })
    if (res.status === 401 || res.status === 403) {
        redirect("/unauthorized")
    }
    return res
}

export const protectedMutation = async (api: string, method: string, data?: unknown) => {
    const token = await getToken()
    const res = await fetch(api, {
        method,
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: data ? JSON.stringify(data) : null,
    })
    if (res.status === 401 || res.status === 403) {
        redirect("/unauthorized")
    }
    return res
}

// use in layouts, it works on page reload because it reads the cookie
export const requireRole = async (roles: string | string[]) => {
    const session = await getSession()
    if (!session) {
        redirect("/sign-in")
    }
    const allowed = Array.isArray(roles) ? roles : [roles]
    if (!allowed.includes(session.user.role as string)) {
        redirect("/unauthorized")
    }
    return session
}

export const requireUser = async () => {
    const session = await getSession()
    if (!session) {
        redirect("/sign-in")
    }
    return session
}