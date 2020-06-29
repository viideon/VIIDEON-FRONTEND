import API from "../../../lib/Api";

export async function saveEmailConfig(configObj: any) {
    const { code, userId } = configObj;
    return API.post("/email/config", { code, userId });
}
export async function getUserConfig(userId: any) {
    return API.get("/email/config", { params: { userId } })
}