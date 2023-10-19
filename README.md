# Vitality Vibe

Welcome to the Vitality Vibe project. 

### Client (Next.JS)
- `bun install` - Install dependencies
- `bun --bun run dev` - Run the project in development
- `bun start` - Run the project in production

### Docker
- `docker-compose up --build` - Build and run the container
- `docker-compose up` - Run the container
- `docker-compose down` - Stop the container

### Server (Java/Maven/Spring)
- `mvn clean package` - Build the project
- `mvn spring-boot:run` - Run the project

## Test commands

### API (Curl)

#### Auth
Login
- `curl -X POST -H "Content-Type: application/json" -d '{"username":"user","password":"user"}' http://localhost:8080/auth/token`

Register
- `curl -X POST -H "Content-Type: application/json" -d '{"username":"user","password":"user","email":"user@user"}' http://localhost:8080/auth/signup`
