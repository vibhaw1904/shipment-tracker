import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../src/app/lib/db';
const users = [
  { id: '1', name: 'Jack', email: 'user@gmail.com' },
  { id: '2', name: 'Admin', email: 'admin@gmail.com', role: Role.ADMIN },
];
async function seedUsers() {
    try {
      const hashedPassword = await bcrypt.hash('123456', 10);
      const dbUsers = await Promise.all(
        users.map(
          async (u) =>
            await prisma.user.upsert({
              where: { id: u.id },
              create: {
                id: u.id,
                email: u.email,
                name: u.name,
                password: hashedPassword,
                role: u.role || Role.USER,
              },
              update: {},
            })
        )
      );
      console.log('✅ user seed successfully');
      await prisma.$disconnect();
    } catch (error) {
      console.log(error);
      await prisma.$disconnect();
      process.exit(1);
    }
  }

  async function main() {
    await seedUsers();
  }
  
  main();