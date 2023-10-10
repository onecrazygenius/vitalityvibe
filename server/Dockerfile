# build with maven for jdk 21
FROM maven:3-amazoncorretto-21-al2023 as build
WORKDIR /home/app
COPY src /home/app/src
COPY env/production.yml /home/app/src/main/resources/application.yml
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -Dmaven.test.skip=true

# deploy to tomcat
FROM tomcat:jdk21-openjdk AS deploy
COPY --from=build /home/app/target/*.war /usr/local/tomcat/webapps/

# change to run war file at localhost:8080/ROOT
RUN mv /usr/local/tomcat/webapps/*.war /usr/local/tomcat/webapps/ROOT.war

# enable manager app
RUN cp -avT $CATALINA_HOME/webapps.dist/manager $CATALINA_HOME/webapps/manager

# add tomcat user
COPY conf/context.xml $CATALINA_HOME/webapps/manager/META-INF/context.xml
COPY conf/tomcat-users.xml $CATALINA_HOME/conf/tomcat-users.xml

EXPOSE 8080
CMD ["catalina.sh", "run"]