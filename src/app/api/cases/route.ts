import type { NextApiRequest, NextApiResponse } from 'next';
import {getCasesData} from "@/lib/data";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { page = '1', pageSize = '10' } = req.query;

        // Ensure query parameters are parsed as numbers
        const pageNumber = parseInt(page as string, 10);
        const pageSizeNumber = parseInt(pageSize as string, 10);

        if (isNaN(pageNumber) || isNaN(pageSizeNumber)) {
            return res.status(400).json({ error: 'Invalid pagination parameters' });
        }

        const casesData = await getCasesData(pageNumber, pageSizeNumber);
        return res.status(200).json(casesData);
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
