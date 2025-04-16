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
  Typography,
  Divider,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Paper,
  Tooltip
} from '@mui/material';
import { 
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { AboutInfo, AboutCategory } from '@/lib/types';
import { useTheme } from '@mui/material/styles';

interface AboutFormProps {
  aboutInfo: AboutInfo | null;
  onSave: (aboutInfo: AboutInfo) => void;
  loading: boolean;
}

export default function AboutForm({ aboutInfo, onSave, loading }: AboutFormProps) {
  const theme = useTheme();

  const [formData, setFormData] = useState<AboutInfo>({
    name: '',
    title: '',
    bio: '',
    experience: '',
    location: '',
    education: '',
    categories: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categoryErrors, setCategoryErrors] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    if (aboutInfo) {
      setFormData({
        name: aboutInfo.name,
        title: aboutInfo.title,
        bio: aboutInfo.bio,
        experience: aboutInfo.experience,
        location: aboutInfo.location,
        education: aboutInfo.education,
        categories: aboutInfo.categories.map(cat => ({ ...cat }))
      });
    }
  }, [aboutInfo]);

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

  const handleCategoryChange = (index: number, field: keyof AboutCategory, value: string) => {
    const updatedCategories = [...formData.categories];
    updatedCategories[index] = {
      ...updatedCategories[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
    
    // Clear error for this field if it exists
    if (categoryErrors[index]?.[field]) {
      setCategoryErrors(prev => {
        const newErrors = { ...prev };
        if (newErrors[index]) {
          delete newErrors[index][field];
          if (Object.keys(newErrors[index]).length === 0) {
            delete newErrors[index];
          }
        }
        return newErrors;
      });
    }
  };

  const addCategory = () => {
    const newCategory: AboutCategory = {
      id: Date.now().toString(), // Use timestamp as temporary ID
      title: '',
      description: '',
      icon: 'code'
    };
    
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));
  };

  const removeCategory = (index: number) => {
    const updatedCategories = [...formData.categories];
    updatedCategories.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      categories: updatedCategories
    }));
    
    // Remove any errors for this category
    if (categoryErrors[index]) {
      setCategoryErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const newCategoryErrors: Record<string, Record<string, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.education.trim()) {
      newErrors.education = 'Education is required';
    }
    
    // Validate categories
    formData.categories.forEach((category, index) => {
      const categoryErrorObj: Record<string, string> = {};
      
      if (!category.title.trim()) {
        categoryErrorObj.title = 'Title is required';
      }
      
      if (!category.description.trim()) {
        categoryErrorObj.description = 'Description is required';
      }
      
      if (!category.icon) {
        categoryErrorObj.icon = 'Icon is required';
      }
      
      if (Object.keys(categoryErrorObj).length > 0) {
        newCategoryErrors[index] = categoryErrorObj;
      }
    });
    
    setErrors(newErrors);
    setCategoryErrors(newCategoryErrors);
    
    return Object.keys(newErrors).length === 0 && Object.keys(newCategoryErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const icons = [
    { value: 'code', label: 'Code' },
    { value: 'web', label: 'Website' },
    { value: 'server', label: 'Server' },
    { value: 'design', label: 'Design' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'database', label: 'Database' }
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'rgba(30, 30, 30, 0.6)', borderRadius: '12px' }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Personal Information
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Professional Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              disabled={loading}
              placeholder="e.g., Full Stack JavaScript Developer"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              error={!!errors.bio}
              helperText={errors.bio}
              multiline
              rows={4}
              disabled={loading}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              error={!!errors.experience}
              helperText={errors.experience}
              disabled={loading}
              placeholder="e.g., 5+ years"
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
              disabled={loading}
              placeholder="e.g., San Francisco, CA"
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              error={!!errors.education}
              helperText={errors.education}
              disabled={loading}
              placeholder="e.g., Bachelor's in CS"
            />
          </Grid>
        </Grid>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'rgba(30, 30, 30, 0.6)', borderRadius: '12px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Expertise Categories
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addCategory}
            disabled={loading}
          >
            Add Category
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {formData.categories.map((category, index) => (
            <Grid item xs={12} md={6} key={category.id || index}>
              <Card sx={{ 
                bgcolor: 'rgba(18, 18, 18, 0.5)',
                borderRadius: '12px',
                position: 'relative',
                overflow: 'visible'
              }}>
                <Tooltip title="Remove category" placement="top">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeCategory(index)}
                    disabled={loading}
                    sx={{
                      position: 'absolute',
                      top: -12,
                      right: -12,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'error.dark'
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Title"
                        value={category.title}
                        onChange={(e) => handleCategoryChange(index, 'title', e.target.value)}
                        error={!!categoryErrors[index]?.title}
                        helperText={categoryErrors[index]?.title}
                        disabled={loading}
                        placeholder="e.g., Frontend Development"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Description"
                        value={category.description}
                        onChange={(e) => handleCategoryChange(index, 'description', e.target.value)}
                        error={!!categoryErrors[index]?.description}
                        helperText={categoryErrors[index]?.description}
                        multiline
                        rows={2}
                        disabled={loading}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!categoryErrors[index]?.icon} disabled={loading}>
                        <InputLabel>Icon</InputLabel>
                        <Select
                          value={category.icon}
                          onChange={(e) => handleCategoryChange(index, 'icon', e.target.value as string)}
                          label="Icon"
                        >
                          {icons.map((icon) => (
                            <MenuItem key={icon.value} value={icon.value}>
                              {icon.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {categoryErrors[index]?.icon && (
                          <Typography variant="caption" color="error">
                            {categoryErrors[index]?.icon}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
          
          {formData.categories.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ 
                textAlign: 'center', 
                py: 4,
                border: '1px dashed rgba(255, 255, 255, 0.2)',
                borderRadius: '8px'
              }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  No expertise categories added yet.
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addCategory}
                  disabled={loading}
                  sx={{ mt: 1 }}
                >
                  Add Category
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          disabled={loading}
          sx={{ py: 1.5, px: 4 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Save Information'
          )}
        </Button>
      </Box>
    </Box>
  );
}
