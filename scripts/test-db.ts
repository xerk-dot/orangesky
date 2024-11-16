async function testConnection() {
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
  
  try {
    console.log('Attempting to connect to database...');
    const users = await prisma.blueskyUser.findMany();
    console.log('Found users:', users);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    
  } finally {
    await prisma.$disconnect();
  }
}

console.log('Starting database connection test...');
testConnection()
  .catch((error) => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
