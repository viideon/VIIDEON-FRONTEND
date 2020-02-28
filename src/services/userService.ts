import API from "../lib/Api";

export async function login(user: any) {
    return API.post('/login', user);
}

export async function signup(user: any) {
    return API.post('/signup', user);
    
}