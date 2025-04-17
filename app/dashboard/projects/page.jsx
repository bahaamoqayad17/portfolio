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
  Tab,
  Tabs,
  Alert,
  Divider,
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
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  DesignServices as DesignServicesIcon,
  BarChart as BarChartIcon,
} from "@mui/icons-material";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";
import ProjectForm from "../components/ProjectForm";
import { createGradientBackground } from "@/app/theme";

function ProjectsContent() {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const projectIdFromParams = searchParams.get("id");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);

          // Check if we should open a specific project
          if (projectIdFromParams) {
            const project = data.find((p) => p.id === projectIdFromParams);
            if (project) {
              setCurrentProject(project);
              setOpenForm(true);
            }
          }
        } else {
          console.error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projectIdFromParams]);

  const handleAddProject = () => {
    setCurrentProject(null);
    setOpenForm(true);
  };

  const handleEditProject = (project) => {
    setCurrentProject(project);
    setOpenForm(true);
    setAnchorEl(null);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentProject(null);
    // Clear the id from the URL if it exists
    if (projectIdFromParams) {
      router.push("/dashboard/projects");
    }
  };

  const handleSaveProject = async (project) => {
    try {
      setLoading(true);
      const response = await fetch("/api/projects", {
        method: project.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (response.ok) {
        const savedProject = await response.json();

        if (project.id) {
          // Update existing project
          setProjects((prev) =>
            prev.map((p) => (p.id === project.id ? savedProject : p))
          );
          setAlert({
            message: "Project updated successfully!",
            severity: "success",
          });
        } else {
          // Add new project
          setProjects((prev) => [...prev, savedProject]);
          setAlert({
            message: "Project created successfully!",
            severity: "success",
          });
        }

        setOpenForm(false);
        setCurrentProject(null);

        // Clear the id from the URL if it exists
        if (projectIdFromParams) {
          router.push("/dashboard/projects");
        }
      } else {
        setAlert({
          message: "Failed to save project. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error saving project:", error);
      setAlert({
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/projects?id=${projectToDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
        setAlert({
          message: "Project deleted successfully!",
          severity: "success",
        });
      } else {
        setAlert({
          message: "Failed to delete project. Please try again.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      setAlert({
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleMenuOpen = (event, project) => {
    setAnchorEl(event.currentTarget);
    setCurrentProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProjects = projects
    .filter(
      (project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (project) =>
        category === "all" ||
        project.category.toLowerCase() === category.toLowerCase()
    );

  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category.toLowerCase()))),
  ];

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
          Projects Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddProject}
        >
          Add Project
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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search projects..."
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Tabs
              value={category}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTabs-indicator": {
                  background: createGradientBackground(),
                  height: "3px",
                  borderRadius: "3px",
                },
              }}
            >
              {categories.map((cat) => (
                <Tab
                  key={cat}
                  label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                  value={cat}
                  sx={{
                    fontWeight: 500,
                    textTransform: "capitalize",
                    "&.Mui-selected": {
                      fontWeight: 600,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Grid>
        </Grid>
      </Box>

      {loading && <LinearProgress sx={{ mb: 4 }} />}

      {!loading && filteredProjects.length === 0 ? (
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
            No projects found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
            {searchQuery || category !== "all"
              ? "Try changing your search criteria"
              : "Start by adding your first project"}
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProject}
          >
            Add Project
          </Button>
        </Box>
      ) : (
        <AnimatePresence mode="popLayout">
          <Grid container spacing={3}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "rgba(30, 30, 30, 0.7)",
                      borderRadius: "16px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      transition: "all 0.3s ease",
                      position: "relative",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        background: `url(https://via.placeholder.com/400x200?text=${encodeURIComponent(
                          project.title
                        )})`,
                        backgroundSize: "cover",
                        height: "160px",
                        position: "relative",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          zIndex: 1,
                        }}
                      >
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, project)}
                          sx={{
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          left: 10,
                          zIndex: 1,
                        }}
                      >
                        <Chip
                          label={project.category}
                          size="small"
                          sx={{
                            bgcolor: "rgba(0, 0, 0, 0.6)",
                            color: "primary.light",
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        fontWeight="bold"
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(106, 17, 203, 0.1)",
                              borderColor: "rgba(106, 17, 203, 0.3)",
                              fontSize: "0.7rem",
                              height: "20px",
                            }}
                          />
                        ))}
                        {project.technologies.length > 3 && (
                          <Chip
                            label={`+${project.technologies.length - 3}`}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(106, 17, 203, 0.05)",
                              fontSize: "0.7rem",
                              height: "20px",
                            }}
                          />
                        )}
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditProject(project)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteConfirm(project)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>
      )}

      {/* Project Form Dialog */}
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
          {currentProject ? "Edit Project" : "Add New Project"}
        </DialogTitle>
        <DialogContent dividers sx={{ py: 3 }}>
          <ProjectForm
            project={currentProject}
            onSave={handleSaveProject}
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
            Are you sure you want to delete the project "
            {projectToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteProject}
            color="error"
            variant="contained"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Project Action Menu */}
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
        <MenuItem
          onClick={() => currentProject && handleEditProject(currentProject)}
        >
          <EditIcon fontSize="small" />
          <Typography variant="body2">Edit Project</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => currentProject && handleDeleteConfirm(currentProject)}
        >
          <DeleteIcon fontSize="small" color="error" />
          <Typography variant="body2" color="error.main">
            Delete Project
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default function ProjectsPage() {
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
      <ProjectsContent />
    </Suspense>
  );
}
