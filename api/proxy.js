import reqFns from "../src/api/request";

export default async function handler(request, response) {
    try {
        let reqFn = request.query.reqFn;
        let res = null, header = request.header, cookies = request.cookies;
        for (let fn of reqFns) {
            if (fn.name === reqFn) {
                if (fn.method === 'GET') {
                    res = await reqFns.reqFn(request.params);
                } else if (fn.method === 'POST') {
                    res = await reqFns.reqFn(request.body);
                }
                break;
            }
        }
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