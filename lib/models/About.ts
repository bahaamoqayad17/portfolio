import mongoose, { Schema, models, model } from 'mongoose';
import { AboutInfo, AboutCategory } from '../types';

const AboutCategorySchema = new Schema<AboutCategory>({
  id: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  icon: { 
    type: String, 
    required: true 
  }
});

const AboutSchema = new Schema<AboutInfo>({
  name: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  bio: { 
    type: String, 
    required: true 
  },
  experience: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  education: { 
    type: String, 
    required: true 
  },
  categories: [AboutCategorySchema],
  updatedAt: { 
    type: String, 
    default: new Date().toISOString() 
  }
}, {
  timestamps: true
});

export default models.About || model<AboutInfo>('About', AboutSchema);