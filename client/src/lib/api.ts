export interface GetSessionParams {
    event?: "storage" | "timer" | "hidden" | string
    triggerEvent?: boolean
    broadcast?: boolean
}

export async function getSession(params?: GetSessionParams) {
    const res = await fetch("/api/auth/session", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    })
    const json = await res.json()
    console.log(json)
    return json
}