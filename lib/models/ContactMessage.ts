import mongoose, { Schema, models, model } from 'mongoose';
import { ContactMessage } from '../types';

const ContactMessageSchema = new Schema<ContactMessage>({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  date: { 
    type: String, 
    required: true, 
    default: new Date().toISOString() 
  },
  read: { 
    type: Boolean, 
    default: false 
  },
  updatedAt: { 
    type: String, 
    default: new Date().toISOString() 
  }
}, {
  timestamps: true
});

export default models.ContactMessage || model<ContactMessage>('ContactMessage', ContactMessageSchema);