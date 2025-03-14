import fs from 'fs';
import path from 'path';
import type { Case } from '@/stores/case.store';

type PaginatedResult = {
    cases: Case[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export async function getCasesData(page = 1, pageSize = 10): Promise<PaginatedResult> {
    const filePath = path.join(process.cwd(), 'data', 'cases.json');

    try {
        const jsonData = await fs.promises.readFile(filePath, 'utf8');
        const allCases: Case[] = JSON.parse(jsonData);

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCases = allCases.slice(startIndex, endIndex);
        const totalPages = Math.ceil(allCases.length / pageSize);

        return {
            cases: paginatedCases,
            total: allCases.length,
            page,
            pageSize,
            totalPages
        };
    } catch (error) {
        console.error('Error loading cases data:', error);
        return {
            cases: [],
            total: 0,
            page,
            pageSize,
            totalPages: 0
        };
    }
}