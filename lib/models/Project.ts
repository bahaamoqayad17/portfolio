import mongoose, { Schema, models, model } from 'mongoose';
import { Project } from '../types';

const ProjectSchema = new Schema<Project>({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  technologies: [{ 
    type: String 
  }],
  category: { 
    type: String, 
    required: true 
  },
  demoUrl: { 
    type: String 
  },
  githubUrl: { 
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

// Check if the model already exists to prevent overwriting during hot reload
export default models.Project || model<Project>('Project', ProjectSchema);