import { NextRequest, NextResponse } from 'next/server';
import { getCasesData } from '@/lib/data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  if (isNaN(page) || isNaN(pageSize)) {
    return NextResponse.json(
      { error: 'Invalid pagination parameters' },
      { status: 400 },
    );
  }

  const casesData = await getCasesData(page, pageSize);
  return NextResponse.json(casesData, { status: 200 });
}
