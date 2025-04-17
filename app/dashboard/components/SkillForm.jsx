"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { Skill } from "@/lib/types";
import { useTheme } from "@mui/material/styles";

export default function SkillForm({ skill, onSave, loading }) {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    level: 80,
    description: "",
    category: "Frontend",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (skill) {
      setFormData({
        id: skill.id,
        name: skill.name,
        level: skill.level,
        description: skill.description,
        category: skill.category,
      });
    }
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error for this field if it exists
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleSliderChange = (event, newValue) => {
    setFormData((prev) => ({ ...prev, level: newValue }));

    // Clear error for this field if it exists
    if (errors.level) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.level;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Skill name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.level < 0 || formData.level > 100) {
      newErrors.level = "Level must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
    }
  };

  const categories = [
    "Frontend",
    "Backend",
    "DevOps & Tools",
    "Design",
    "Mobile",
    "Other",
  ];

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Skill Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
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
            {errors.category && (
              <FormHelperText>{errors.category}</FormHelperText>
            )}
          </FormControl>
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
            rows={2}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography gutterBottom>Skill Level: {formData.level}%</Typography>
          <Slider
            value={formData.level}
            onChange={handleSliderChange}
            aria-labelledby="skill-level-slider"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={0}
            max={100}
            disabled={loading}
            sx={{
              color: theme.palette.primary.main,
              "& .MuiSlider-thumb": {
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}20`,
                },
              },
            }}
          />
          {errors.level && (
            <FormHelperText error>{errors.level}</FormHelperText>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ py: 1.5, px: 4 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : formData.id ? (
              "Update Skill"
            ) : (
              "Create Skill"
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
