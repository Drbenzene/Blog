import JWT  from "jsonwebtoken";


export const readingTime = (text) => {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
}

//Sign User Login
export const signUserLogin = (id) => {
    return JWT.sign({id}, process.env.JWT_SECRET, {expiresIn: "2hrs"})
}
