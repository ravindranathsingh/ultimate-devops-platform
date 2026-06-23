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

User
  ↓
NGINX Ingress
  ↓
Frontend Service
  ↓
Backend Service

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
