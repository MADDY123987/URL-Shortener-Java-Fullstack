# Builder stage: build the jar using the maven wrapper and a JDK image
FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /app

# copy wrapper and pom & sources
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# make wrapper executable and build
RUN chmod +x mvnw && ./mvnw -B clean package -DskipTests

# Runtime stage: smaller image to run the jar
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# copy jar from builder
COPY --from=builder /app/target/*.jar app.jar

# Use PORT supplied by Render
ENV PORT=8080

# Start the Spring Boot app
ENTRYPOINT ["sh","-c","java -jar /app/app.jar --server.port=${PORT}"]
