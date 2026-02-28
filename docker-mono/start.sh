#! /bin/bash
service mysql start

sleep 5
# Run initialization script
mysq1 -u root < /init.sql
mvn clean package -DskipTests

java -jar target/chriss_proj-0.0.1-SNAPSHOT. jar
