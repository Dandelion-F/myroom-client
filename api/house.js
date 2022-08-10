import { getHouseInfo } from "../src/api/request";

export default async function getHouseById(request, response) {
    try {
        const res = await getHouseInfo(request.query.id || 103612);
        response.status(200).json(res.data);
    } catch (error) {
        response.status(400).json({
            code: 1,
            msg: error.message,
        });
    }
}
