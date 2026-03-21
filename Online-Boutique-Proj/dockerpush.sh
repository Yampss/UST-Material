#!/bin/bash
docker build -t cazzzzz/adservice:latest ./src/adservice
docker push cazzzzz/adservice:latest
docker build -t cazzzzz/cartservice:latest ./src/cartservice
docker push cazzzzz/cartservice:latest
docker build -t cazzzzz/checkoutservice:latest ./src/checkoutservice
docker push cazzzzz/checkoutservice:latest
docker build -t cazzzzz/currencyservice:latest ./src/currencyservice
docker push cazzzzz/currencyservice:latest
docker build -t cazzzzz/emailservice:latest ./src/emailservice
docker push cazzzzz/emailservice:latest
docker build -t cazzzzz/frontend:latest ./src/frontend
docker push cazzzzz/frontend:latest
docker build -t cazzzzz/loadgenerator:latest ./src/loadgenerator
docker push cazzzzz/loadgenerator:latest
docker build -t cazzzzz/paymentservice:latest ./src/paymentservice
docker push cazzzzz/paymentservice:latest
docker build -t cazzzzz/productcatalogservice:latest ./src/productcatalogservice
docker push cazzzzz/productcatalogservice:latest
docker build -t cazzzzz/recommendationservice:latest ./src/recommendationservice
docker push cazzzzz/recommendationservice:latest
docker build -t cazzzzz/shippingservice:latest ./src/shippingservice
docker push cazzzzz/shippingservice:latest
