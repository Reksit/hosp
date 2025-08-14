package com.healthcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableAsync
@EntityScan("com.healthcare.model")
@EnableJpaRepositories("com.healthcare.repository")
public class HealthcareManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(HealthcareManagementApplication.class, args);
    }
}