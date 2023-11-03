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

export async function fetchData(url: string, token: any) {
    try {
        const res = await fetch('/server/' + url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        const json = await res.json()
        return json
    } catch (e) {
        return []
    }
}