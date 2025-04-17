"use client";

import { useEffect, useState, Suspense } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  LinearProgress,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  DesignServices as DesignServicesIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SkillForm from "../components/SkillForm";
import { createGradientBackground } from "@/app/theme";

function SkillsContent() {
  const theme = useTheme();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const skillIdFromParams = searchParams.get("id");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/skills");
        if (response.ok) {
          const data = await response.json();
          setSkills(data);

          // Check if we should open a specific skill
          if (skillIdFromParams) {
            const skill = data.find((s) => s.id === skillIdFromParams);
            if (skill) {
              setCurrentSkill(skill);
              setOpenForm(true);
            }
          }
        } else {
          console.error("Failed to fetch skills");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [skillIdFromParams]);

  const handleAddSkill = () => {
    setCurrentSkill(null);
    setOpenForm(true);
  };

  const handleEditSkill = (skill) => {
    setCurrentSkill(skill);
    setOpenForm(true);
    setAnchorEl(null);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentSkill(null);
    // Clear the id from the URL if it exists
    if (skillIdFromParams) {
      router.push("/dashboard/skills");
    }
  };

  const handleSaveSkill = async (skill) => {
    try {
      setLoading(true);
      const response = await fetch("/api/skills", {
        method: skill.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skill),
      });

      if (response.ok) {
        const savedSkill = await response.json();

        if (skill.id) {
          // Update existing skill
          setSkills((prev) =>
            prev.map((s) => (s.id === skill.id ? savedSkill : s))
          );
          setAlert({
            message: "Skill updated successfully!",
            severity: "success",
          });
        } else {
          // Add new skill
          setSkills((prev) => [...prev, savedSkill]);
          setAlert({
            message: "Skill created successfully!",
            severity: "success",
          });
        }

        setOpenForm(false);
        setCurrentSkill(null);

        // Clear the id from the URL if it exists
        if (skillIdFromParams) {
          router.push("/dashboard/skills");
        }
      } else {
        setAlert({
          message: "Failed to save skill. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error saving skill:", error);
      setAlert({
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = (skill) => {
    setSkillToDelete(skill);
    setDeleteDialogOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteSkill = async () => {
    if (!skillToDelete) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/skills?id=${skillToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSkills((prev) => prev.filter((s) => s.id !== skillToDelete.id));
        setAlert({
          message: "Skill deleted successfully!",
          severity: "success",
        });
      } else {
        setAlert({
          message: "Failed to delete skill. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      setAlert({
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setSkillToDelete(null);
    }
  };

  const handleMenuOpen = (event, skill) => {
    setAnchorEl(event.currentTarget);
    setCurrentSkill(skill);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group skills by category
  const skillsByCategory = filteredSkills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  const getIconForCategory = (category) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return <CodeIcon />;
      case "backend":
        return <StorageIcon />;
      case "design":
        return <DesignServicesIcon />;
      default:
        return <BarChartIcon />;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" component="h1" fontWeight="bold">
          Skills Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddSkill}
        >
          Add Skill
        </Button>
      </Box>

      {alert && (
        <Alert
          severity={alert.severity}
          sx={{ mb: 3 }}
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search skills by name, description or category..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
        />
      </Box>

      {loading && <LinearProgress sx={{ mb: 4 }} />}

      {!loading && filteredSkills.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            bgcolor: "rgba(30, 30, 30, 0.5)",
            borderRadius: "16px",
            border: "1px dashed rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            No skills found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {searchQuery
              ? "Try changing your search criteria"
              : "Start by adding your first skill"}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddSkill}
          >
            Add Skill
          </Button>
        </Box>
      ) : (
        <AnimatePresence>
          {Object.entries(skillsByCategory).map(
            ([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
              >
                <Card
                  sx={{
                    mb: 4,
                    bgcolor: "rgba(30, 30, 30, 0.7)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                        pb: 2,
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <Box
                        sx={{
                          mr: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          borderRadius: "10px",
                          background: createGradientBackground(),
                          color: "white",
                        }}
                      >
                        {getIconForCategory(category)}
                      </Box>
                      <Typography variant="h6" component="h2" fontWeight="bold">
                        {category}
                      </Typography>
                      <Chip
                        label={`${skills.length} ${
                          skills.length === 1 ? "skill" : "skills"
                        }`}
                        size="small"
                        sx={{ ml: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }}
                      />
                    </Box>

                    <List>
                      {skills.map((skill, index) => (
                        <ListItem
                          key={skill.id}
                          disablePadding
                          sx={{
                            mb: 1,
                            bgcolor: "rgba(0, 0, 0, 0.2)",
                            borderRadius: "8px",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "rgba(0, 0, 0, 0.3)",
                            },
                          }}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="more options"
                              onClick={(e) => handleMenuOpen(e, skill)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          }
                        >
                          <Box
                            sx={{
                              width: "4px",
                              alignSelf: "stretch",
                              background: createGradientBackground(90),
                            }}
                          />
                          <ListItemText
                            sx={{ py: 1.5, px: 2 }}
                            primary={
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography variant="body1" fontWeight="medium">
                                  {skill.name}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    ml: 2,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mr: 1 }}
                                  >
                                    Level:
                                  </Typography>
                                  <Chip
                                    label={`${skill.level}%`}
                                    size="small"
                                    sx={{
                                      bgcolor:
                                        theme.palette.primary.main + "20",
                                      color: theme.palette.primary.light,
                                      fontWeight: "bold",
                                      minWidth: "50px",
                                    }}
                                  />
                                </Box>
                              </Box>
                            }
                            secondary={
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                              >
                                {skill.description}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions sx={{ px: 3, pb: 2, pt: 0 }}>
                    <Button
                      startIcon={<AddIcon />}
                      size="small"
                      onClick={() => {
                        setCurrentSkill({
                          id: "",
                          name: "",
                          level: 80,
                          description: "",
                          category,
                        });
                        setOpenForm(true);
                      }}
                    >
                      Add to {category}
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            )
          )}
        </AnimatePresence>
      )}

      {/* Skill Form Dialog */}
      <Dialog
        open={openForm}
        onClose={handleCloseForm}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
            backgroundImage: "none",
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", py: 3 }}>
          {currentSkill?.id ? "Edit Skill" : "Add New Skill"}
        </DialogTitle>
        <DialogContent dividers sx={{ py: 3 }}>
          <SkillForm
            skill={currentSkill}
            onSave={handleSaveSkill}
            loading={loading}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "background.paper",
            backgroundImage: "none",
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the skill "{skillToDelete?.name}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteSkill}
            color="error"
            variant="contained"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Skill Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            bgcolor: "background.paper",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            "& .MuiMenuItem-root": {
              minWidth: "150px",
              gap: 1.5,
            },
          },
        }}
      >
        <MenuItem onClick={() => currentSkill && handleEditSkill(currentSkill)}>
          <EditIcon fontSize="small" />
          <Typography variant="body2">Edit Skill</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => currentSkill && handleDeleteConfirm(currentSkill)}
        >
          <DeleteIcon fontSize="small" color="error" />
          <Typography variant="body2" color="error.main">
            Delete Skill
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default function SkillsPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Typography>Loading...</Typography>
        </Box>
      }
    >
      <SkillsContent />
    </Suspense>
  );
}
