import { NextRequest, NextResponse } from 'next/server';
import { Project } from '@/lib/types';
import DatabaseService from '@/lib/dbService';
import { db } from '@/lib/database'; // Keep for fallback

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    // Try to get projects from MongoDB
    let projects = [];
    try {
      projects = await DatabaseService.getAllProjects();
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      // Fallback to in-memory database
      projects = db.projects.getAll();
    }
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.category || !data.technologies || data.technologies.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create project data object
    const projectData = {
      title: data.title,
      description: data.description,
      image: data.image || '/assets/project-placeholder.svg',
      technologies: data.technologies,
      category: data.category,
      demoUrl: data.demoUrl || undefined,
      githubUrl: data.githubUrl || undefined
    };
    
    // Try to create project in MongoDB
    let project;
    try {
      project = await DatabaseService.createProject(projectData);
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      project = db.projects.create({
        ...projectData,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString()
      });
    }
    
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects - Update a project
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.id || !data.title || !data.description || !data.category || !data.technologies || data.technologies.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Project data to update
    const projectData = {
      title: data.title,
      description: data.description,
      image: data.image,
      technologies: data.technologies,
      category: data.category,
      demoUrl: data.demoUrl || undefined,
      githubUrl: data.githubUrl || undefined
    };
    
    // Try to update project in MongoDB
    let project;
    try {
      // First check if project exists
      const existingProject = await DatabaseService.getProjectById(data.id);
      if (!existingProject) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      
      project = await DatabaseService.updateProject(data.id, projectData);
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      // Check if project exists
      const existingProject = db.projects.getById(data.id);
      if (!existingProject) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      
      project = db.projects.update({
        ...projectData,
        id: data.id,
        createdAt: existingProject.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects?id=... - Delete a project
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    // Try to delete project from MongoDB
    let success = false;
    try {
      // Check if project exists
      const existingProject = await DatabaseService.getProjectById(id);
      if (!existingProject) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      
      success = await DatabaseService.deleteProject(id);
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      // Check if project exists
      const existingProject = db.projects.getById(id);
      if (!existingProject) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        );
      }
      
      db.projects.delete(id);
      success = true;
    }
    
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
