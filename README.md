# DevOps Platform

## Project Architecture

Document:

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
