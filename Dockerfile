# Start from a Java 17 (or 20+) base image
FROM eclipse-temurin:20-jdk-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy Maven project files
COPY pom.xml .
COPY src ./src

# Install Maven and build the project
RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean package -DskipTests

# Expose the port your app will run on
EXPOSE 8080

# Run the Spring Boot jar
CMD ["java", "-jar", "target/taskmanager-0.0.1-SNAPSHOT.jar"]
