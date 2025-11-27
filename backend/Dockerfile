# Builder stage: build the jar using the maven wrapper and a JDK 21 image
FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /app

# copy wrapper and pom & sources (copy only what we need)
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# make wrapper executable and build the project (skip tests in CI build)
RUN chmod +x mvnw && ./mvnw -B clean package -DskipTests

# Runtime stage: smaller image to run the jar (also Java 21)
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app

# copy jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Use PORT supplied by Render (overrideable)
ENV PORT=8080

# Start the Spring Boot app
ENTRYPOINT ["sh","-c","java -jar /app/app.jar --server.port=${PORT}"]
