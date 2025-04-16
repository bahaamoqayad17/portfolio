import { NextRequest, NextResponse } from 'next/server';
import { Skill } from '@/lib/types';
import DatabaseService from '@/lib/dbService';
import { db } from '@/lib/database'; // Keep for fallback

// GET /api/skills - Get all skills
export async function GET(request: NextRequest) {
  try {
    // Try to get skills from MongoDB
    let skills = [];
    try {
      skills = await DatabaseService.getAllSkills();
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      // Fallback to in-memory database
      skills = db.skills.getAll();
    }
    
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    );
  }
}

// POST /api/skills - Create a new skill
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.description || !data.category || data.level === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate level
    if (data.level < 0 || data.level > 100) {
      return NextResponse.json(
        { error: 'Level must be between 0 and 100' },
        { status: 400 }
      );
    }
    
    // Create skill data object
    const skillData = {
      name: data.name,
      description: data.description,
      level: data.level,
      category: data.category
    };
    
    // Try to create skill in MongoDB
    let skill;
    try {
      skill = await DatabaseService.createSkill(skillData);
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      skill = db.skills.create({
        ...skillData,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString()
      });
    }
    
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}

// PUT /api/skills - Update a skill
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.id || !data.name || !data.description || !data.category || data.level === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate level
    if (data.level < 0 || data.level > 100) {
      return NextResponse.json(
        { error: 'Level must be between 0 and 100' },
        { status: 400 }
      );
    }
    
    // Skill data to update
    const skillData = {
      name: data.name,
      description: data.description,
      level: data.level,
      category: data.category
    };
    
    // Try to update skill in MongoDB
    let skill;
    try {
      // First check if skill exists
      const existingSkill = await DatabaseService.getSkillById(data.id);
      if (!existingSkill) {
        return NextResponse.json(
          { error: 'Skill not found' },
          { status: 404 }
        );
      }
      
      skill = await DatabaseService.updateSkill(data.id, skillData);
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      // Check if skill exists
      const existingSkill = db.skills.getById(data.id);
      if (!existingSkill) {
        return NextResponse.json(
          { error: 'Skill not found' },
          { status: 404 }
        );
      }
      
      skill = db.skills.update({
        ...skillData,
        id: data.id,
        createdAt: existingSkill.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    
    return NextResponse.json(skill);
  } catch (error) {
    console.error('Error updating skill:', error);
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    );
  }
}

// DELETE /api/skills?id=... - Delete a skill
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Skill ID is required' },
        { status: 400 }
      );
    }
    
    // Try to delete skill from MongoDB
    let success = false;
    try {
      // Check if skill exists
      const existingSkill = await DatabaseService.getSkillById(id);
      if (!existingSkill) {
        return NextResponse.json(
          { error: 'Skill not found' },
          { status: 404 }
        );
      }
      
      success = await DatabaseService.deleteSkill(id);
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      // Check if skill exists
      const existingSkill = db.skills.getById(id);
      if (!existingSkill) {
        return NextResponse.json(
          { error: 'Skill not found' },
          { status: 404 }
        );
      }
      
      db.skills.delete(id);
      success = true;
    }
    
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting skill:', error);
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    );
  }
}
