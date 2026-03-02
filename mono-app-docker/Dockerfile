FROM eclipse-temurin: 17-jre
ENV DEBIAN_ENVIORNMENT=noninteractive
RUN apt update -y && apt install maven -y && apt install mysql-server -y
WORKDIR /app
COPY init.sql /init.sql
COPY start.sh /start.sh
RUN chmod +x /start.sh
EXPOSE 8080
CMD ["/start.sh"]
