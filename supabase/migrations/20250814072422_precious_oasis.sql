-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS healthcare_management;

-- Use the database
USE healthcare_management;

-- Create a user for the application (optional)
-- CREATE USER IF NOT EXISTS 'healthcare_user'@'localhost' IDENTIFIED BY 'healthcare_password';
-- GRANT ALL PRIVILEGES ON healthcare_management.* TO 'healthcare_user'@'localhost';
-- FLUSH PRIVILEGES;

-- The tables will be created automatically by Hibernate
-- This script is just to ensure the database exists