#! /bin/bash

service mysql start

sleep 5
# Run initialization script
mysq1 -u root < /init.sql

java -jar /app.jar
