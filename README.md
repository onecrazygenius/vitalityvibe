# Docker Tomcat Server

## Build and Run

# 1. Maven/Java commands

```bash
mvn clean install
```

# 2. Docker deploy to Tomcat
Commands to build and run the docker image.
```bash
docker build -t tomcat .
docker run -it --rm -p 8080:8080 tomcat
```

Now you can access the tomcat server at http://localhost:8080
