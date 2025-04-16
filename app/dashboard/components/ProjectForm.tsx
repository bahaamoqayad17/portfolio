'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  MenuItem,
  Select,
  Chip,
  OutlinedInput,
  FormHelperText,
  CircularProgress
} from '@mui/material';
import { Project } from '@/lib/types';
import { useTheme } from '@mui/material/styles';

interface ProjectFormProps {
  project: Project | null;
  onSave: (project: Project) => void;
  loading: boolean;
}

export default function ProjectForm({ project, onSave, loading }: ProjectFormProps) {
  const theme = useTheme();

  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    description: '',
    image: '/assets/project-placeholder.svg',
    technologies: [],
    category: 'Frontend',
    demoUrl: '',
    githubUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image,
        technologies: project.technologies,
        category: project.category,
        demoUrl: project.demoUrl || '',
        githubUrl: project.githubUrl || '',
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleTechChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string[];
    setFormData(prev => ({ ...prev, technologies: value }));
    
    // Clear error for this field if it exists
    if (errors.technologies) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.technologies;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.technologies.length === 0) {
      newErrors.technologies = 'At least one technology is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (formData.demoUrl && !isValidUrl(formData.demoUrl)) {
      newErrors.demoUrl = 'Please enter a valid URL';
    }
    
    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    if (!url) return true; // Empty URL is valid (not required)
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const availableTechnologies = [
    // Frontend
    'React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 
    'HTML/CSS', 'Tailwind CSS', 'Material UI', 'Chakra UI', 'Framer Motion',
    // Backend
    'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'Nest.js',
    // Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase', 'Redis',
    // DevOps & Tools
    'Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'GitLab CI', 'Jest', 'Cypress',
    // Mobile
    'React Native', 'Flutter', 'Swift', 'Kotlin',
    // Other
    'GraphQL', 'REST API', 'WebSockets', 'Electron'
  ];

  const categories = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'DevOps', 'Other'];

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            disabled={loading}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
            multiline
            rows={4}
            disabled={loading}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.category} disabled={loading}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.technologies} disabled={loading}>
            <InputLabel>Technologies</InputLabel>
            <Select
              multiple
              value={formData.technologies}
              onChange={handleTechChange}
              input={<OutlinedInput label="Technologies" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {availableTechnologies.map((tech) => (
                <MenuItem
                  key={tech}
                  value={tech}
                >
                  {tech}
                </MenuItem>
              ))}
            </Select>
            {errors.technologies && <FormHelperText>{errors.technologies}</FormHelperText>}
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Demo URL"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            error={!!errors.demoUrl}
            helperText={errors.demoUrl || "Optional: URL to the live demo"}
            placeholder="https://example.com"
            disabled={loading}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GitHub URL"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            error={!!errors.githubUrl}
            helperText={errors.githubUrl || "Optional: URL to the GitHub repository"}
            placeholder="https://github.com/username/repo"
            disabled={loading}
          />
        </Grid>
        
        <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ py: 1.5, px: 4 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              formData.id ? 'Update Project' : 'Create Project'
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
