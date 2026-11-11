package com.devspace.console.project;

import java.util.Comparator;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectRepository projects;

    public ProjectController(ProjectRepository projects) {
        this.projects = projects;
    }

    @GetMapping
    public List<ProjectResponse> listProjects() {
        return projects.findAll().stream()
                .sorted(Comparator.comparing(Project::getId))
                .map(project -> new ProjectResponse(
                        project.getId(),
                        project.getName(),
                        project.getStatus(),
                        project.getUpdated()))
                .toList();
    }

    public record ProjectResponse(String id, String name, String status, String updated) {
    }
}
