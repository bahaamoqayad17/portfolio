import { NextRequest, NextResponse } from 'next/server';
import { ContactMessage } from '@/lib/types';
import DatabaseService from '@/lib/dbService';
import { db } from '@/lib/database'; // Keep for fallback

// GET /api/contact - Get all contact messages
export async function GET(request: NextRequest) {
  try {
    // Try to get messages from MongoDB
    let messages = [];
    try {
      messages = await DatabaseService.getAllMessages();
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      // Fallback to in-memory database
      messages = db.messages.getAll();
      // Sort messages by date, newest first
      messages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST /api/contact - Create a new contact message
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Create message data object
    const messageData = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    };
    
    // Try to create message in MongoDB
    let message;
    try {
      message = await DatabaseService.createMessage(messageData);
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      message = db.messages.create({
        ...messageData,
        id: Math.random().toString(36).substring(2, 9),
        date: new Date().toISOString(),
        read: false
      });
    }
    
    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// PATCH /api/contact?id=... - Update a message (mark as read)
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    // Try to update message in MongoDB
    let message;
    try {
      // First check if message exists
      const existingMessage = await DatabaseService.getMessageById(id);
      if (!existingMessage) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        );
      }
      
      // Update just the read status
      message = await DatabaseService.updateMessage(id, {
        read: data.read !== undefined ? data.read : existingMessage.read
      });
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      // Check if message exists
      const existingMessage = db.messages.getById(id);
      if (!existingMessage) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        );
      }
      
      // Update message
      message = db.messages.update({
        ...existingMessage,
        read: data.read !== undefined ? data.read : existingMessage.read,
        updatedAt: new Date().toISOString()
      });
    }
    
    return NextResponse.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE /api/contact?id=... - Delete a message
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }
    
    // Try to delete message from MongoDB
    let success = false;
    try {
      // Check if message exists
      const existingMessage = await DatabaseService.getMessageById(id);
      if (!existingMessage) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        );
      }
      
      success = await DatabaseService.deleteMessage(id);
    } catch (dbError) {
      console.warn('MongoDB connection failed, using in-memory database:', dbError);
      
      // Fallback to in-memory database
      // Check if message exists
      const existingMessage = db.messages.getById(id);
      if (!existingMessage) {
        return NextResponse.json(
          { error: 'Message not found' },
          { status: 404 }
        );
      }
      
      db.messages.delete(id);
      success = true;
    }
    
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
