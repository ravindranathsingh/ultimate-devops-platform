# DevOps Platform

## Project Architecture

This repository demonstrates a complete DevOps ecosystem from source code to production deployment.

Infrastructure:
Vagrant Lab
Kubernetes Cluster
Jenkins
GitHub Actions
ArgoCD
Terraform
Ansible
Prometheus
Grafana
Loki

Deployment Flow:
```text
Developer
   ↓
GitHub
   ↓
GitHub Actions
   ↓
Jenkins
   ↓
SonarQube
   ↓
Trivy
   ↓
GHCR
   ↓
ArgoCD
   ↓
Kubernetes
```
Lab Nodes:
master  : 192.168.56.10
worker  : 192.168.56.11

## Strategy: Trunk-Based Development

Branches:
- main        → Production-ready code
- feature/*   → New features
- hotfix/*    → Emergency fixes

Rules:
- Direct commits to main are prohibited.
- All changes must go through Pull Requests.
- Feature branches are short-lived.
- Squash merge into main.

## Commit Convention:
feat:
fix:
docs:
refactor:
test:
ci:
infra:

## Microservices Architecture
Services:

1. frontend
   - React
   - User Interface

2. backend
   - Node.js + Express
   - REST API

3. postgres
   - Persistent Database

4. Jenkins
   - Traditional CI/CD

5. SonarQube
   - Code Quality

6. ArgoCD
   - GitOps Deployment

7. Prometheus
   - Metrics Collection

8. Grafana
   - Dashboards

9. Loki
   - Log Aggregation

architecture diagram:
```text
                GitHub
                   │
        ┌──────────┴──────────┐
        │                     │
 GitHub Actions          Jenkins
        │                     │
        └──────────┬──────────┘
                   │
              SonarQube
                   │
                Trivy
                   │
                 GHCR
                   │
                ArgoCD
                   │
            Kubernetes
          ┌──────┼──────┐
          │      │      │
      Frontend Backend Postgres
                   │
        ┌──────────┴──────────┐
        │                     │
   Prometheus             Loki
        │                     │
        └────── Grafana ──────┘
```

## We will build:


| Component | Technology |
| :--- | :--- |
| **Frontend** | React |
| **Backend** | Node.js + Express |
| **Database** | PostgreSQL |
| **Container Runtime** | Docker |
| **Orchestration** | Kubernetes |
| **Packaging** | Helm |
| **CI** | GitHub Actions |
| **Enterprise CI** | Jenkins |
| **GitOps** | ArgoCD |
| **Quality** | SonarQube |
| **Security** | Trivy |
| **Registry** | GHCR |
| **IaC** | Terraform |
| **Configuration** | Ansible |
| **Monitoring** | Prometheus |
| **Dashboards** | Grafana |
| **Logging** | Loki |
| **Ingress** | NGINX Ingress |

## Kubernetes Lab Environment
Cluster Type: kubeadm

Control Plane:
- master
- IP: 192.168.56.10
- RAM: 6GB
- CPU: 3

Worker Node:
- worker
- IP: 192.168.56.11
- RAM: 6GB
- CPU: 3

Container Runtime:
- containerd

CNI:
- Calico

Purpose:
This Kubernetes cluster hosts the complete DevOps platform including Jenkins, SonarQube, ArgoCD, Prometheus, Grafana, Loki, NGINX Ingress, and the application microservices.

## Kubernetes Bootstrap Process
Bootstrap Order

1. OS Preparation
2. Container Runtime (containerd)
3. Kubernetes Packages
4. kubeadm Init
5. Worker Join
6. Calico CNI
7. NGINX Ingress
8. Platform Services

Kubernetes Version Target:
v1.30.x

## Kubernetes Components
kubeadm
- Cluster bootstrap tool

kubelet
- Node agent
- Manages pod lifecycle

kubectl
- Kubernetes CLI

containerd
- Container Runtime Interface (CRI)

Cluster Build Method:
kubeadm + containerd + Calico

## Kubernetes Cluster Topology
Control Plane:
- master (192.168.56.10)

Worker Nodes:
- worker (192.168.56.11)

Pod CIDR:
- 192.168.0.0/16

CNI:
- Calico

Cluster Bootstrap:
kubeadm init

## Kubernetes Networking
Network Plugin:
Calico

Features:
- Pod networking
- Network policies
- Scalable routing
- Production-grade Kubernetes networking

Pod CIDR:
192.168.0.0/16

## Ingress Layer
Ingress Controller:
NGINX Ingress Controller

Responsibilities:
- External traffic entry point
- HTTP/HTTPS routing
- Path-based routing
- Host-based routing
- SSL termination

Traffic Flow:
```text
User
  ↓
NGINX Ingress
  ↓
Frontend Service
  ↓
Backend Service
```
## Traditional CI/CD Platform

CI Engine:
Jenkins

Architecture:
- Jenkins Controller
- Jenkins Agents
- Shared Libraries
- Declarative Pipelines

Responsibilities:
- Build
- Test
- SonarQube Analysis
- Container Build
- Trivy Scan
- Push to GHCR

Deployment Method:
Helm Chart

## Jenkins Deployment

Deployment Target:
Kubernetes

Namespace:
jenkins

Package Manager:
Helm

Persistence:
Persistent Volume

Agent Strategy:
Kubernetes Dynamic Agents

## Code Quality Platform

Tool:
SonarQube

Purpose:
- Static Code Analysis
- Code Smell Detection
- Security Hotspot Detection
- Technical Debt Tracking
- Quality Gates

Pipeline Position:
```text
GitHub Actions
      ↓
Jenkins
      ↓
SonarQube
      ↓
Trivy
      ↓
GHCR
```

## SonarQube Database

Database:
PostgreSQL

Purpose:
- Store projects
- Store analysis history
- Store quality gates
- Store users and permissions

Architecture:
```text
SonarQube
     ↓
PostgreSQL
```

## SonarQube Deployment

Namespace:
sonarqube

Database:
PostgreSQL

Deployment Method:
Helm

Persistence:
Enabled

Quality Gate Flow:
```text
Source Code
     ↓
GitHub Actions
     ↓
Jenkins
     ↓
SonarQube Analysis
     ↓
Quality Gate
     ↓
Container Build
```

## GitOps Platform

Tool:
ArgoCD

Purpose:
- GitOps Deployments
- Desired State Reconciliation
- Automated Synchronization
- Kubernetes Application Lifecycle Management

Deployment Strategy:
```text
Git Push
    ↓
Git Repository
    ↓
ArgoCD
    ↓
Kubernetes Cluster
```
CI Responsibility:
GitHub Actions + Jenkins

CD Responsibility:
ArgoCD

## Microservices Architecture

```text
Frontend
  ↓
Backend API
  ↓
PostgreSQL
```
Deployment Model:
```text
Frontend    → Kubernetes Deployment
Backend     → Kubernetes Deployment
PostgreSQL  → StatefulSet
```
Exposure:
```text
Internet
   ↓
NGINX Ingress
   ↓
Frontend
   ↓
Backend API
```

## Backend Service

Technology:
Node.js

Purpose:
- REST API
- Health Endpoint
- Version Endpoint
- Future Database Connectivity

Containerization:
Docker

Deployment:
Kubernetes

## Backend Containerization

Build Tool:
Docker

Image Strategy:
Multi-Stage Build

Runtime:
Non-Root User

Registry:
GHCR (later)

Security:
Minimal Attack Surface

## Frontend Service
 
Frontend Technology:
React

Purpose:
- User Interface
- API Consumption
- Health Status Display

Deployment:
Kubernetes

Containerization:
Docker

Frontend Features:
- Calls Backend API
- Displays Backend Status
- Displays Backend Version
- Kubernetes Ready

## Backend Kubernetes Deployment

Workload Type:
Deployment

Replicas:
1

Container Port:
3000

Health Checks:
Liveness Probe
Readiness Probe

Service Type:
ClusterIP

## Frontend Containerization

Build Tool:
Docker

Runtime:
NGINX

Container Port:
80

Purpose:
Serve Static UI

Security:
Minimal Runtime Image

## Frontend Kubernetes Deployment

Workload Type:
Deployment

Replicas:
1

Container Runtime:
NGINX

Service Type:
ClusterIP

Frontend → Backend Communication:
Internal Kubernetes Service

## Internal Service Communication

Communication Method:
Kubernetes Service Discovery

Frontend
    ↓
backend.devops-app.svc.cluster.local

Service Type:
ClusterIP

Reason:
Internal pod-to-pod communication without exposing backend externally.

## Helm Packaging

Package Manager:
Helm

Purpose:
Package Kubernetes manifests into reusable templates

Benefits:
- Reusability
- Versioning
- Environment-specific configuration

## Frontend Helm Chart

Package Manager:
Helm

Purpose:
Deploy the frontend as a reusable Helm release

Configuration:
Image
Replica Count
Service Type
Resources

## Custom Helm Charts

Helm charts are written manually instead of using the default `helm create`
template. This keeps the deployment manifests minimal, readable, and tailored
to the application's requirements.

## Helm Templates

Templates Created:
- Deployment
- Service

Templated Values:
- Image
- Replica Count
- Service Port
- Resource Limits

Purpose:
Allow the same chart to be reused across different environments by changing only values.yaml.

## Frontend Custom Helm Chart

Chart Type:
Custom Helm Chart

Resources:
- Deployment
- Service

Templated Values:
- Image
- Replica Count
- Service Type
- Service Port

Purpose:
Deploy the frontend using reusable Helm templates with configurable values.

## GitHub Actions CI

Workflow:
Continuous Integration

Triggers:
- Push to main
- Pull Request to main

Current Stages:
- Checkout
- Verify Repository
- Validate Helm Charts

Purpose:
Perform automatic validation before code is merged.

## Docker Build Validation

Pipeline Stage:
Docker Image Build

Images:
- Backend
- Frontend

Purpose:
Verify that both Dockerfiles can successfully build on every push before the code reaches the deployment pipeline.

## Code Quality Analysis

Tool:
SonarQube Community Edition

Purpose:
Static code analysis during Continuous Integration.

Current Scope:
Backend Source Code

Benefits:
- Detect bugs
- Detect code smells
- Measure maintainability

## Security Scanning 

Tool:
Trivy

Scan Type:
Filesystem Scan

Current Coverage:
Repository Source Code

Purpose:
Detect vulnerabilities, secrets, and misconfigurations before container image creation.

## Container Image Security

Tool:
Trivy

Scan Type:
Container Image Scan

Images:
- backend
- frontend

Purpose:
Identify operating system and package vulnerabilities in Docker images before they are published.

## Container Registry

Registry:
GitHub Container Registry (GHCR)

Images:
- backend
- frontend

Purpose:
Store versioned container images that can be deployed by Kubernetes, Jenkins, and ArgoCD.

## Jenkins CI Pipeline

Pipeline Type:
Declarative Pipeline

Current Stages:
- Checkout
- Verify Repository
- Validate Helm Charts

Purpose:
Introduce Jenkins as the enterprise CI engine that will later perform builds, testing, security scans, and deployments.

## Custom Jenkins Agent Image

Base Image:
Jenkins LTS

Pre-installed Tools:
- Helm
- kubectl
- Docker CLI
- Trivy
- Sonar Scanner
- Git

Purpose:
Provide a reproducible Jenkins runtime with all required DevOps tooling preinstalled.

## Jenkins Runtime Image

Image:
ghcr.io/<your-github-username>/jenkins-devops

Current Toolset:
- Git
- Docker CLI
- Helm
- kubectl
- Trivy

Purpose:
Provide a standardized Jenkins runtime for all CI pipelines.

## Jenkins Runtime Distribution

Registry:
GitHub Container Registry (GHCR)

Image:
jenkins-devops:v1

Purpose:
Provide a reusable Jenkins runtime image for Kubernetes deployments and future Jenkins upgrades.

## Jenkins Custom Runtime

Deployment:
Helm Upgrade

Runtime Image:
ghcr.io/<your-github-username>/jenkins-devops:v1

Purpose:
Run Jenkins with a prebuilt DevOps toolchain instead of the default Jenkins image.


