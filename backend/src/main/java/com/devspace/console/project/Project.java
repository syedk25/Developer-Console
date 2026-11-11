package com.devspace.console.project;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @Column(length = 40)
    private String id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, length = 40)
    private String status;

    @Column(nullable = false, length = 80)
    private String updated;

    protected Project() {
    }

    public Project(String id, String name, String status, String updated) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.updated = updated;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getStatus() {
        return status;
    }

    public String getUpdated() {
        return updated;
    }
}
