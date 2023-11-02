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
    return json
}

export async function fetchData(method: string, url: string, token: any) {
    const apiUrl = import.meta.env.PUBLIC_API_URL || ""
    try {
        const res = await fetch(apiUrl + url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
        const json = await res.json()
        return json
    } catch (e) {
        return []
    }
}