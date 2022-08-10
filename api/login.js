import { reqLogin } from "../src/api/request";

export default async function handler(request, response) {
    try {
        const res = await reqLogin({ username: 'admin1', password: 'admin1' })
        response.status(200).json({
            res: res.data,
            body: request.body,
            query: request.query,
            cookies: request.cookies,
        });
    } catch (error) {
        response.status(400).json({
            res: error.message,
            body: request.body,
            query: request.query,
            cookies: request.cookies,
        });
    }
}