#!/bin/bash

set -e

echo "Installing containerd..."

sudo apt-get update -y

sudo apt-get install -y containerd

sudo mkdir -p /etc/containerd

containerd config default | sudo tee /etc/containerd/config.toml >/dev/null

sudo sed -i \
's/SystemdCgroup = false/SystemdCgroup = true/' \
/etc/containerd/config.toml

sudo systemctl restart containerd

sudo systemctl enable containerd

echo "Containerd installation completed."

