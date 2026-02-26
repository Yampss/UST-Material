# UST Material - EC2 Deployment Projects

This repository contains multiple applications that were deployed on AWS EC2 instances over the past week. Each project demonstrates different architectural patterns and technologies including Application Load Balancers, Elastic IPs, NAT Gateways, VPCs, and RDS.

## � Repository Stats

```mermaid
%%{init: {'theme':'base'}}%%
quadrantChart
    title Architecture Complexity vs Scalability
    x-axis Low Complexity --> High Complexity
    y-axis Low Scalability --> High Scalability
    quadrant-1 Advanced Architecture
    quadrant-2 Over-Engineered
    quadrant-3 Simple & Limited
    quadrant-4 Production Ready
    3-Tier Architecture: [0.8, 0.95]
    Microservices: [0.85, 0.9]
    FastAPI Blog: [0.4, 0.5]
    Monolithic App: [0.3, 0.4]
```

| 📊 Metric | 🔢 Count |
|-----------|---------|
| **Total Projects** | 5 |
| **AWS Services Used** | 10+ |
| **Programming Languages** | 3 (Java, Python, JavaScript) |
| **Databases Deployed** | 6 |
| **EC2 Instances** | 15+ |
| **Load Balancers** | 6 |

## �📊 Architecture Landscape

```mermaid
graph TB
    subgraph "AWS Cloud Infrastructure"
        subgraph "3-Tier Architecture"
            A1[React Frontend] --> A2[External ALB]
            A2 --> A3[Nginx Web Tier]
            A3 --> A4[Internal ALB]
            A4 --> A5[Node.js App Tier]
            A5 --> A6[Aurora MySQL RDS]
        end
        
        subgraph "Microservices"
            B1[Apache2 Frontend] --> B2[External ALB]
            B2 --> B3[Internal ALB]
            B3 --> B4[Orders Service EC2]
            B3 --> B5[Users Service EC2]
            B4 --> B6[(MySQL)]
            B5 --> B7[(MySQL)]
        end
        
        subgraph "Monolithic & FastAPI"
            C1[Monolithic Spring Boot] --> C2[(AWS RDS)]
            C3[FastAPI Blog] --> C4[(SQLite/MySQL)]
        end
    end
    
    style A1 fill:#61dafb
    style B1 fill:#d55
    style C1 fill:#6db33f
    style C3 fill:#009688
```

##  Projects Overview

### 1. Three-Tier Web Architecture
A production-grade three-tier architecture demonstrating complete AWS deployment:
- **Web Tier** - React.js frontend with Nginx web server
- **Application Tier** - Node.js/Express API backend
- **Database Tier** - Aurora MySQL Multi-AZ RDS

Features external and internal Application Load Balancers, Auto Scaling Groups, and Multi-AZ deployment for high availability.

```mermaid
flowchart LR
    subgraph Internet
        User[👤 User]
    end
    
    subgraph "AWS VPC"
        subgraph "Public Subnet - AZ1"
            ELB1[External ALB]
            Web1[Nginx Web Server]
        end
        
        subgraph "Public Subnet - AZ2"
            Web2[Nginx Web Server]
        end
        
        subgraph "Private Subnet - AZ1"
            IELB1[Internal ALB]
            App1[Node.js API]
        end
        
        subgraph "Private Subnet - AZ2"
            App2[Node.js API]
        end
        
        subgraph "Database Subnet"
            RDS1[(Aurora MySQL Primary)]
            RDS2[(Aurora MySQL Replica)]
        end
    end
    
    User --> ELB1
    ELB1 --> Web1
    ELB1 --> Web2
    Web1 --> IELB1
    Web2 --> IELB1
    IELB1 --> App1
    IELB1 --> App2
    App1 --> RDS1
    App2 --> RDS1
    RDS1 -.Replication.-> RDS2
    
    style User fill:#4285f4
    style ELB1 fill:#ff9900
    style IELB1 fill:#ff9900
    style RDS1 fill:#527fff
    style RDS2 fill:#527fff
```

### 2. Microservices Architecture
Two Spring Boot microservices demonstrating service-to-service communication:
- **Orders Service** - Manages order operations (Port 8081)
- **Users Service** - Manages user operations (Port 8082)

Both services were deployed on separate EC2 instances in different target groups and connected to an internal Application Load Balancer. The internal ALB routes traffic from an Apache2-hosted frontend deployed on another instance, which is also connected to an external Application Load Balancer.

```mermaid
flowchart TB
    subgraph Internet
        Client[👤 Client]
    end
    
    subgraph "Public Subnet"
        ExtALB[External ALB<br/>Port 80/443]
        Apache[Apache2 Frontend<br/>EC2 Instance]
    end
    
    subgraph "Private Subnet"
        IntALB[Internal ALB<br/>Port 8081/8082]
        
        subgraph "Target Group 1"
            Orders[Orders Service<br/>EC2 - Port 8081]
            OrdersDB[(ordersdb)]
        end
        
        subgraph "Target Group 2"
            Users[Users Service<br/>EC2 - Port 8082]
            UsersDB[(usersdb)]
        end
    end
    
    Client -->|HTTPS| ExtALB
    ExtALB --> Apache
    Apache -->|API Calls| IntALB
    IntALB -->|Route /orders| Orders
    IntALB -->|Route /users| Users
    Orders -.->|REST API| Users
    Orders --> OrdersDB
    Users --> UsersDB
    
    style Client fill:#4285f4
    style ExtALB fill:#ff9900
    style IntALB fill:#ff9900
    style Orders fill:#6db33f
    style Users fill:#6db33f
    style Apache fill:#d55
```

### 3. Monolithic Application (Spring Boot)
A traditional monolithic Spring Boot application showcasing a single-service architecture with MySQL database integration. The application was later migrated to use AWS RDS to demonstrate managed database concepts and high availability.

```mermaid
flowchart LR
    User[👤 User] -->|HTTP| EC2[Spring Boot App<br/>EC2 Instance<br/>Port 8080]
    EC2 --> RDS[(AWS RDS MySQL<br/>Multi-AZ)]
    RDS -.Automated Backups.-> S3[S3 Backup]
    
    style User fill:#4285f4
    style EC2 fill:#6db33f
    style RDS fill:#527fff
    style S3 fill:#569a31
```

### 4. User-BlogPost FastAPI Application
A FastAPI-based blog management system with bidirectional relationships between users and posts using SQLAlchemy ORM. Hosted on Apache2 using reverse proxy configuration for production deployment.

```mermaid
flowchart LR
    User[👤 User] -->|HTTP| Apache[Apache2<br/>Reverse Proxy<br/>Port 80]
    Apache -->|Forward to| FastAPI[FastAPI App<br/>uvicorn<br/>Port 8000]
    FastAPI --> ORM[SQLAlchemy ORM]
    ORM --> DB[(MySQL Database)]
    
    FastAPI -.CRUD Operations.-> Models[User & BlogPost Models]
    
    style User fill:#4285f4
    style Apache fill:#d55
    style FastAPI fill:#009688
    style DB fill:#00758f
```

## 🔄 AWS Deployment Workflow

```mermaid
graph TB
    Start([Start Deployment]) --> VPC[Create VPC & Subnets]
    VPC --> SG[Configure Security Groups]
    SG --> RDS[Setup RDS Database]
    RDS --> EC2[Launch EC2 Instances]
    EC2 --> Deploy[Deploy Application Code]
    Deploy --> TG[Create Target Groups]
    TG --> ALB[Configure Load Balancers]
    ALB --> ASG[Setup Auto Scaling Groups]
    ASG --> NAT[Configure NAT Gateway]
    NAT --> Test[Test Application]
    Test --> Monitor[Setup CloudWatch Monitoring]
    Monitor --> End([Deployment Complete])
    
    style Start fill:#4caf50
    style End fill:#4caf50
    style ALB fill:#ff9900
    style RDS fill:#527fff
    style EC2 fill:#ff9900
```

### 5. UST Hacksession Week 1
Collection of hackathon projects and experimental code from the first week's session.

##  Technologies Used

```mermaid
mindmap
  root((UST Material<br/>Tech Stack))
    Backend
      Spring Boot 4.0.3
      FastAPI
      Node.js/Express
    Frontend
      React.js
      Apache2
      Nginx
    Languages
      Java 17
      Python
      JavaScript
    Databases
      MySQL
      Aurora MySQL
      SQLAlchemy ORM
      JPA/Hibernate
    AWS Services
      EC2
      RDS Multi-AZ
      Application Load Balancer
      Auto Scaling Groups
      VPC
      NAT Gateway
      Elastic IP
      CloudWatch
    Build Tools
      Maven
      npm
```

### Technology Comparison Across Projects

| Feature | 3-Tier Architecture | Microservices | Monolithic | FastAPI |
|---------|-------------------|---------------|------------|---------|
| **Frontend** | React + Nginx | Apache2 | N/A | Apache2 |
| **Backend** | Node.js/Express | Spring Boot (2 services) | Spring Boot | FastAPI |
| **Database** | Aurora MySQL Multi-AZ | MySQL (2 DBs) | AWS RDS MySQL | MySQL |
| **Load Balancer** | External + Internal ALB | External + Internal ALB | Single EC2 | Reverse Proxy |
| **Scalability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Complexity** | High | High | Low | Medium |
| **High Availability** | Multi-AZ | Multi-Instance | Single Instance | Single Instance | 

##  Documentation

Each project directory contains its own README with specific setup instructions, API documentation, and deployment details.

##  Quick Start

Navigate to each project directory for detailed setup and running instructions:

```bash
# For Three-Tier Architecture
cd 3-Tier-Architecture/app-tier
npm install
node index.js

# For Spring Boot Microservices
cd Microservices/orders-code
./mvnw spring-boot:run

# For FastAPI Application
cd User-BlogPost-FastAPI-Bidirectional-Application
pip install -r requirements.txt
uvicorn main:app --reload
```

##  AWS Architecture Highlights

```mermaid
graph LR
    subgraph "Availability Zone 1"
        PubSub1[Public Subnet]
        PrivSub1[Private Subnet]
        Web1[Web Server]
        App1[App Server]
    end
    
    subgraph "Availability Zone 2"
        PubSub2[Public Subnet]
        PrivSub2[Private Subnet]
        Web2[Web Server]
        App2[App Server]
    end
    
    subgraph "AWS Services"
        ALB[Application Load Balancer]
        ASG[Auto Scaling Group]
        NAT[NAT Gateway]
        RDS[(RDS Multi-AZ)]
    end
    
    Internet([Internet]) --> ALB
    ALB --> Web1
    ALB --> Web2
    Web1 & Web2 --> App1 & App2
    App1 & App2 --> NAT
    App1 & App2 --> RDS
    NAT --> Internet
    ASG -.Manages.-> Web1 & Web2 & App1 & App2
    
    style Internet fill:#4285f4
    style ALB fill:#ff9900
    style ASG fill:#ff9900
    style RDS fill:#527fff
    style NAT fill:#ff9900
```

**Key Features:**
- **Multi-AZ Deployment**: High availability across multiple Availability Zones
- **Load Balancing**: External and internal Application Load Balancers for traffic distribution
- **Auto Scaling**: Dynamic scaling based on demand
- **VPC Configuration**: Custom VPC with public and private subnets
- **NAT Gateway**: Secure internet access for private subnet resources
- **RDS Integration**: Managed database services with Multi-AZ failover support

##  Notes

All projects were tested and deployed on AWS EC2 instances with production-grade configurations. Ensure you have the proper database configurations, environment variables, and AWS credentials set before running locally or deploying to AWS.
