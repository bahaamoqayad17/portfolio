import mongoose, { Schema, models, model } from 'mongoose';

export interface UserType {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

const UserSchema = new Schema<UserType>({
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
    required: true,
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: 'admin',
    enum: ['admin', 'editor'] 
  },
  image: { 
    type: String 
  },
  createdAt: { 
    type: String, 
    default: new Date().toISOString() 
  },
  updatedAt: { 
    type: String, 
    default: new Date().toISOString() 
  }
}, {
  timestamps: true
});

export default models.User || model<UserType>('User', UserSchema);