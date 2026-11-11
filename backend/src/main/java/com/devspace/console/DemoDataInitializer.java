package com.devspace.console;

import com.devspace.console.project.Project;
import com.devspace.console.project.ProjectRepository;
import com.devspace.console.user.AppUser;
import com.devspace.console.user.AppUserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DemoDataInitializer implements CommandLineRunner {
    private final AppUserRepository users;
    private final ProjectRepository projects;
    private final PasswordEncoder passwordEncoder;
    private final String username;
    private final String password;

    public DemoDataInitializer(
            AppUserRepository users,
            ProjectRepository projects,
            PasswordEncoder passwordEncoder,
            @Value("${app.demo.username:demo}") String username,
            @Value("${app.demo.password:change-me}") String password) {
        this.users = users;
        this.projects = projects;
        this.passwordEncoder = passwordEncoder;
        this.username = username;
        this.password = password;
    }

    @Override
    public void run(String... args) {
        if (users.findByUsername(username).isEmpty()) {
            users.save(new AppUser(username, passwordEncoder.encode(password)));
        }
        if (projects.count() == 0) {
            projects.save(new Project("prj_01", "Customer portal", "Production", "2 min ago"));
            projects.save(new Project("prj_02", "Mobile API", "Staging", "1 hour ago"));
            projects.save(new Project("prj_03", "Design system", "Development", "Yesterday"));
        }
    }
}
