import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/app/lib/db';
export default async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { status, location } = req.body;
    try {
      const updatedOrder = await prisma.shipment.update({
        where: { id: String(id) },
        data: { status, location },
      });
      res.status(200).json({ order: updatedOrder });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
