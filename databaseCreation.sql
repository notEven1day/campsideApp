CREATE DATABASE camp_rating_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE campgrounds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR(255),
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    image_url VARCHAR(2083)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    campground_id INT NOT NULL,
    rating INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (campground_id) REFERENCES campgrounds(id) ON DELETE CASCADE
);

-- Insert an Admin user
INSERT INTO users (username, password, first_name, last_name, role)
VALUES ('admin_user', 'admin_password', 'Admin', 'User', 'admin');

-- Insert a regular user
INSERT INTO users (username, password, first_name, last_name, role)
VALUES ('john_doe', 'password123', 'John', 'Doe', 'user');

-- Insert another regular user
INSERT INTO users (username, password, first_name, last_name, role)
VALUES ('jane_smith', 'mypassword456', 'Jane', 'Smith', 'user');

-- Insert a user with a different username
INSERT INTO users (username, password, first_name, last_name, role)
VALUES ('mark_jones', 'securepassword789', 'Mark', 'Jones', 'user');

