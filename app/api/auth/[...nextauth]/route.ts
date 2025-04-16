import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createDefaultAdminUser } from '@/lib/auth';

// Create default admin user if needed
createDefaultAdminUser().catch(console.error);

// Create NextAuth handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };