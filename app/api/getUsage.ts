'use server';

import { UsageReport } from '@/types/usage';

export async function getUsageByUserId(id: number): Promise<UsageReport[]> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/users/${id}/usage`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const messages = await response.json();
    return messages.usage as UsageReport[];
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw error;
  }
}
