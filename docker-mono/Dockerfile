FROM eclipse-temurin:17-jre

ENV DEBIAN_ENVIORNMENT=noninteractive

RUN apt update -y && apt install mysql-server -y

WORKDIR /app

COPY target/chriss_proj-0.0.1-SNAPSHOT.jar /app.jar
COPY init.sql /init.sql
COPY start.sh /start.sh

RUN chmod +x /start.sh

EXPOSE 8080

CMD ["/start.sh"]

