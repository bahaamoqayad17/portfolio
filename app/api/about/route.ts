import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { AboutInfo, AboutCategory } from '@/lib/types';
import DatabaseService from '@/lib/dbService';
import { db } from '@/lib/database'; // Keep for fallback

// Default about info
const defaultAbout: AboutInfo = {
  name: 'John Doe',
  title: 'Full Stack JavaScript Developer',
  bio: "I'm a passionate Full Stack JavaScript Developer with over 5 years of experience building modern web applications. I specialize in React, Next.js, Node.js and TypeScript, focusing on creating performant and scalable solutions that solve real-world problems.",
  experience: "5+ years",
  location: "San Francisco, CA",
  education: "Bachelor's in Computer Science",
  categories: [
    {
      id: '1',
      title: "Frontend Development",
      description: "I create responsive, accessible, and performant user interfaces using modern JavaScript frameworks.",
      icon: "web"
    },
    {
      id: '2',
      title: "Backend Development",
      description: "I build robust and scalable APIs and server-side applications with Node.js and Express.",
      icon: "server"
    },
    {
      id: '3',
      title: "Full Stack Solutions",
      description: "I deliver end-to-end solutions, from concept to deployment, ensuring seamless integration across the stack.",
      icon: "code"
    }
  ]
};

// GET /api/about - Get about info
export async function GET(request: NextRequest) {
  try {
    // Try to get about info from MongoDB
    let aboutInfo = null;
    try {
      aboutInfo = await DatabaseService.getAboutInfo();
      
      // If no about info is found in MongoDB, save the default and return it
      if (!aboutInfo) {
        aboutInfo = await DatabaseService.updateAboutInfo(defaultAbout);
      }
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      aboutInfo = db.about.get();
      
      // If no about info is found in memory database, save the default and return it
      if (!aboutInfo) {
        aboutInfo = db.about.set(defaultAbout);
      }
    }
    
    return NextResponse.json(aboutInfo);
  } catch (error) {
    console.error('Error fetching about info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about info' },
      { status: 500 }
    );
  }
}

// PUT /api/about - Update about info
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.title || !data.bio || 
        !data.experience || !data.location || !data.education) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Ensure categories have IDs
    const categories: AboutCategory[] = (data.categories || []).map((category: AboutCategory) => {
      return {
        ...category,
        id: category.id || uuidv4()
      };
    });
    
    // Update about info
    const updatedAbout: AboutInfo = {
      name: data.name,
      title: data.title,
      bio: data.bio,
      experience: data.experience,
      location: data.location,
      education: data.education,
      categories: categories,
      updatedAt: new Date().toISOString(),
    };
    
    // Try to update about info in MongoDB
    let aboutInfo;
    try {
      aboutInfo = await DatabaseService.updateAboutInfo(updatedAbout);
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      aboutInfo = db.about.set(updatedAbout);
    }
    
    return NextResponse.json(aboutInfo);
  } catch (error) {
    console.error('Error updating about info:', error);
    return NextResponse.json(
      { error: 'Failed to update about info' },
      { status: 500 }
    );
  }
}
