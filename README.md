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
