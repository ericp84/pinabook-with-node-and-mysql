
export default function token (token = "", action) {
    if(action.type === "addToken") {
        return action.token
    } else {
        return token
    }
}