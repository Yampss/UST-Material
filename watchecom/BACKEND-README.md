# Watch Marketplace Microservices Backend

Production-style microservices backend for a watch marketplace, containerized with Docker and designed for EC2 deployment.

## Architecture (Three-Tier)

- Presentation: Nginx frontend
- Application: API gateway, registry service, microservices
- Data: PostgreSQL (single instance, separate schemas)

Frontend note: the Nginx container serves the frontend `out/` static export.

Networks:

- frontend-network (frontend only)
- backend-network (gateway, services, registry, logging, postgres)
- database-network (postgres only)

## Services and Ports

- Frontend (Nginx): 80
- API Gateway: 8080
- Registry Service: 8761
- User Service: 8081
- Product Service: 8082
- Cart Service: 8083
- Order Service: 8084
- Review Service: 8085
- Logging Service: 9000
- Postgres: 5432

## Project Structure

```
<root>/
  frontend/
  backend/
    api-gateway/
    registry-service/
    services/
      user-service/
      product-service/
      cart-service/
      order-service/
      review-service/
    logging-service/
    db/
  backend-docs/
  docker-compose.yml
  .env.example
```

## Run (EC2)

See [backend-docs/runbook.md](backend-docs/runbook.md) for step-by-step instructions and .env setup.

## Example Requests

See [backend-docs/api-examples.md](backend-docs/api-examples.md).

## Troubleshooting

See [backend-docs/troubleshooting.md](backend-docs/troubleshooting.md).
