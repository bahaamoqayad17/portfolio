import bcrypt from 'bcryptjs';
import { UserType } from './models/User';
import DatabaseService from './dbService';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from './models';
import connectToDatabase from './mongodb';

// Creating a function to hash passwords
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// Creating a function to compare passwords
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

// Add getAllUsers function to be used in auth
export async function getAllUsers(): Promise<UserType[]> {
  try {
    await connectToDatabase();
    const users = await User.find({}).sort({ name: 1 }).lean();
    return users as unknown as UserType[];
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
}

// Create a default admin user if none exists
export async function createDefaultAdminUser() {
  try {
    // Check if any user exists
    const users = await getAllUsers();
    
    if (!users || users.length === 0) {
      // Create default admin user if no users exist
      const hashedPassword = await hashPassword('admin123');  // Default password - Should be changed after first login
      
      await DatabaseService.createUser({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        image: '/assets/avatar-placeholder.svg'
      });
      
      console.log('Default admin user created');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error);
  }
}

// Define custom NextAuth types to include role
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const user = await DatabaseService.getUserByEmail(credentials.email);
          
          if (!user) {
            return null;
          }
          
          const isPasswordValid = await comparePasswords(credentials.password, user.password);
          
          if (!isPasswordValid) {
            return null;
          }
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role
          };
        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'default-nextauth-secret-key-change-this',
};