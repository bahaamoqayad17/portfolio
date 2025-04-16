import mongoose, { Schema, models, model } from 'mongoose';
import { Skill } from '../types';

const SkillSchema = new Schema<Skill>({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  level: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
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

export default models.Skill || model<Skill>('Skill', SkillSchema);