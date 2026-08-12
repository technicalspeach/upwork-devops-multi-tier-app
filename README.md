# Production-Ready Multi-Tier Automated Infrastructure

This repository contains the architecture and deployment codebase for a highly secure, automated, and production-grade **Three-Tier Web Application** topology. The infrastructure splits the application logic and the database layer into isolated virtual environments to mirror enterprise-level security boundaries.

## 🏗️ System Architecture

```text
[ Public Users ]
       │
       ▼ (HTTP / Port 80)
┌──────────────────────────────────────────┐
│ VM 1: Web & Application Gateway Server    │
│  ├── Nginx (Reverse Proxy & Edge Router)  │
│  └── Docker Containerization Layer       │
│        └── Node.js Backend API (Port 5000)│
└──────────────────────────────────────────┘
       │
       ▼ (Private Network / TCP Port 5432)
┌──────────────────────────────────────────┐
│ VM 2: Isolated Data Storage Tier        │
│  └── Bare-Metal PostgreSQL Engine        │
│        └── Strict IP Whitelisting (MD5)  │
└──────────────────────────────────────────┘
```

## 🚀 Key Architectural Features

* **Multi-Tier Network Isolation**: The stateful database tier is completely isolated from direct public internet access, whitelisting traffic strictly originating from the App Server.
* **Edge Proxying**: Nginx acts as a high-performance reverse proxy on Port 80, masking internal application runtimes running inside Docker containers on Port 5000.
* **Containerized Microservices**: The Node.js application is packaged inside a optimized, lightweight multi-stage Alpine Docker runtime.
* **Infrastructure as Code (IaC) & CI/CD**: Integrated with version control and automated GitHub Actions declarations for seamless build validation pipelines.

---

## 🛠️ Tech Stack & Tooling
* **OS Environment**: Ubuntu Server LTS (Multi-Node Setup via VMware Workstation)
* **Web Gateway**: Nginx Reverse Proxy
* **Runtime Orchestration**: Docker, Docker Compose
* **Backend Framework**: Node.js, Express.js
* **Database Engine**: PostgreSQL (Bare-Metal Engine)
* **Automation**: Git, GitHub Actions

---

## 🔧 Step-by-Step Deployment Blueprint

### Phase 1: Stateful Data Tier Configuration (VM 2)
1. Install the native PostgreSQL engine and secure the server instance.
2. Modify the core listener interface inside `postgresql.conf`:
   ```text
   listen_addresses = '*'
   ```
3. Establish firewall whitelist matrix in `pg_hba.conf` to isolate database traffic:
   ```text
   host    all             all             192.168.141.128/32      md5
   ```
4. Provisions system roles, secure passwords, and dedicated namespaces:
   ```sql
   CREATE DATABASE upwork_db;
   CREATE USER devops_user WITH PASSWORD 'SecurePass123!';
   GRANT ALL PRIVILEGES ON DATABASE upwork_db TO devops_user;
   ```

### Phase 2: Stateless Application Delivery (VM 1)
1. Write a modular optimized `Dockerfile` leveraging cache layer layers for npm dependencies.
2. Inject production-grade cluster orchestration configs via `docker-compose.yml` linking state environment injection:
   ```yaml
   environment:
     - DB_HOST=192.168.141.129
     - DB_NAME=upwork_db
   ```
3. Boot the environment asynchronously:
   ```bash
   sudo docker run -d -p 5000:5000 --name backend-app upwork-backend
   ```

### Phase 3: Edge Routing Configuration (Nginx Proxy)
1. Map internal containerized runtime proxies down to standardized port layouts by configuring a server proxy block:
   ```nginx
   location /api/ {
       proxy_pass http://127.0.0.1:5000;
       proxy_set_header X-Real-IP \$remote_addr;
   }
   ```
2. Validate and hot-reload Nginx execution states:
   ```bash
   sudo nginx -t && sudo systemctl restart nginx
   ```

### Phase 4: Automation Infrastructure (CI/CD Pipeline)
* Embedded `.github/workflows/deploy.yml` pipeline tracks `main` branch merges to validate artifact builds, triggering seamless automation frameworks.

---

## 📈 Health Check Verification
Querying the outer edge Nginx interface securely pulls real-time state logs straight from the database engine cluster across isolated subnets:

```bash
curl http://localhost/api/status
```
**Response Payload:**
```json
{
  "status": "Healthy",
  "database_time": "2026-08-12T08:20:30.768Z"
}
```

---
💡 **DevOps Engineer**: Yasir Siddiqui  
*Available for Cloud Architecture, High Availability Scaling, and Production CI/CD Setup automation contracts on Upwork.*
