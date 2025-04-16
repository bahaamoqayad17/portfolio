import connectToDatabase from './mongodb';
import { v4 as uuidv4 } from 'uuid';
import { 
  Project, 
  Skill, 
  About, 
  ContactMessage,
  User
} from './models';
import { 
  Project as ProjectType, 
  Skill as SkillType, 
  AboutInfo,
  ContactMessage as ContactMessageType 
} from './types';
import { UserType } from './models/User';

/**
 * Service class for database operations
 */
export class DatabaseService {
  // Projects
  static async getAllProjects(): Promise<ProjectType[]> {
    await connectToDatabase();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return projects as unknown as ProjectType[];
  }

  static async getProjectById(id: string): Promise<ProjectType | null> {
    await connectToDatabase();
    const project = await Project.findOne({ id }).lean();
    return project as unknown as ProjectType | null;
  }

  static async createProject(projectData: Omit<ProjectType, 'id'>): Promise<ProjectType> {
    await connectToDatabase();
    const id = uuidv4();
    const newProject = new Project({
      ...projectData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    await newProject.save();
    return newProject.toObject() as unknown as ProjectType;
  }

  static async updateProject(id: string, projectData: Partial<ProjectType>): Promise<ProjectType | null> {
    await connectToDatabase();
    const updatedProject = await Project.findOneAndUpdate(
      { id },
      { ...projectData, updatedAt: new Date().toISOString() },
      { new: true }
    ).lean();
    return updatedProject as unknown as ProjectType | null;
  }

  static async deleteProject(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await Project.deleteOne({ id });
    return result.deletedCount > 0;
  }

  // Skills
  static async getAllSkills(): Promise<SkillType[]> {
    await connectToDatabase();
    const skills = await Skill.find({}).sort({ category: 1, name: 1 }).lean();
    return skills as unknown as SkillType[];
  }

  static async getSkillById(id: string): Promise<SkillType | null> {
    await connectToDatabase();
    const skill = await Skill.findOne({ id }).lean();
    return skill as unknown as SkillType | null;
  }

  static async createSkill(skillData: Omit<SkillType, 'id'>): Promise<SkillType> {
    await connectToDatabase();
    const id = uuidv4();
    const newSkill = new Skill({
      ...skillData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    await newSkill.save();
    return newSkill.toObject() as unknown as SkillType;
  }

  static async updateSkill(id: string, skillData: Partial<SkillType>): Promise<SkillType | null> {
    await connectToDatabase();
    const updatedSkill = await Skill.findOneAndUpdate(
      { id },
      { ...skillData, updatedAt: new Date().toISOString() },
      { new: true }
    ).lean();
    return updatedSkill as unknown as SkillType | null;
  }

  static async deleteSkill(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await Skill.deleteOne({ id });
    return result.deletedCount > 0;
  }

  // About
  static async getAboutInfo(): Promise<AboutInfo | null> {
    await connectToDatabase();
    const aboutInfo = await About.findOne({}).lean();
    return aboutInfo as unknown as AboutInfo | null;
  }

  static async updateAboutInfo(aboutData: AboutInfo): Promise<AboutInfo | null> {
    await connectToDatabase();
    
    // Update if exists, create if not
    const existingAbout = await About.findOne({});
    
    if (existingAbout) {
      const updatedAbout = await About.findByIdAndUpdate(
        existingAbout._id,
        { ...aboutData, updatedAt: new Date().toISOString() },
        { new: true }
      ).lean();
      return updatedAbout as unknown as AboutInfo | null;
    } else {
      const newAbout = new About({
        ...aboutData,
        updatedAt: new Date().toISOString()
      });
      await newAbout.save();
      return newAbout.toObject() as unknown as AboutInfo;
    }
  }

  // Contact Messages
  static async getAllMessages(): Promise<ContactMessageType[]> {
    await connectToDatabase();
    const messages = await ContactMessage.find({}).sort({ date: -1 }).lean();
    return messages as unknown as ContactMessageType[];
  }

  static async getMessageById(id: string): Promise<ContactMessageType | null> {
    await connectToDatabase();
    const message = await ContactMessage.findOne({ id }).lean();
    return message as unknown as ContactMessageType | null;
  }

  static async createMessage(messageData: Omit<ContactMessageType, 'id' | 'date' | 'read'>): Promise<ContactMessageType> {
    await connectToDatabase();
    const id = uuidv4();
    const newMessage = new ContactMessage({
      ...messageData,
      id,
      date: new Date().toISOString(),
      read: false,
      updatedAt: new Date().toISOString()
    });
    await newMessage.save();
    return newMessage.toObject() as unknown as ContactMessageType;
  }

  static async updateMessage(id: string, messageData: Partial<ContactMessageType>): Promise<ContactMessageType | null> {
    await connectToDatabase();
    const updatedMessage = await ContactMessage.findOneAndUpdate(
      { id },
      { ...messageData, updatedAt: new Date().toISOString() },
      { new: true }
    ).lean();
    return updatedMessage as unknown as ContactMessageType | null;
  }

  static async deleteMessage(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await ContactMessage.deleteOne({ id });
    return result.deletedCount > 0;
  }

  static async markMessageAsRead(id: string): Promise<ContactMessageType | null> {
    await connectToDatabase();
    const updatedMessage = await ContactMessage.findOneAndUpdate(
      { id },
      { read: true, updatedAt: new Date().toISOString() },
      { new: true }
    ).lean();
    return updatedMessage as unknown as ContactMessageType | null;
  }

  // User Authentication
  static async getUserByEmail(email: string): Promise<UserType | null> {
    await connectToDatabase();
    const user = await User.findOne({ email }).lean();
    return user as unknown as UserType | null;
  }

  static async getUserById(id: string): Promise<UserType | null> {
    await connectToDatabase();
    const user = await User.findOne({ id }).lean();
    return user as unknown as UserType | null;
  }

  static async createUser(userData: Omit<UserType, 'id'>): Promise<UserType> {
    await connectToDatabase();
    const id = uuidv4();
    const newUser = new User({
      ...userData,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    await newUser.save();
    return newUser.toObject() as unknown as UserType;
  }

  static async updateUser(id: string, userData: Partial<UserType>): Promise<UserType | null> {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate(
      { id },
      { ...userData, updatedAt: new Date().toISOString() },
      { new: true }
    ).lean();
    return updatedUser as unknown as UserType | null;
  }

  static async deleteUser(id: string): Promise<boolean> {
    await connectToDatabase();
    const result = await User.deleteOne({ id });
    return result.deletedCount > 0;
  }
}

export default DatabaseService;