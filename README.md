# Nginx Demo Project

This project demonstrates how to set up Nginx as a reverse proxy and load balancer in front of multiple Node.js (Express) applications.

## Architecture

- **Node.js Instances**: 3 identical Express.js backend servers running in Docker containers (`blog-site-1`, `blog-site-2`, `blog-site-3`).
- **Nginx**: Configured to load balance traffic across the backend servers using the `least_conn` method.
- **SSL/TLS**: Nginx is configured to serve traffic over HTTPS (port 443) using a self-signed certificate, and automatically redirects HTTP traffic (port 80) to HTTPS.

## Prerequisites

- Docker and Docker Compose
- Nginx installed locally
- OpenSSL (for generating self-signed certificates)

## Setup

1. **Generate SSL Certificates**
   Generate a self-signed certificate and place it in the appropriate folder (by default `~/my-folder/ssl-certificates/`):

   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ~/my-folder/ssl-certificates/nginx-selfsigned.key -out ~/my-folder/ssl-certificates/nginx-selfsigned.crt
   ```

2. **Start Backend Servers**
   Use Docker Compose to spin up the Node.js instances:

   ```bash
   docker compose up -d
   ```

3. **Start Nginx**
   Run Nginx with the custom configuration file provided in this repository:

   ```bash
   sudo nginx -c /home/hattussa-024/my-folder/nginx/nginx-learning/nginx.conf
   ```

   *(To apply changes later without bringing the server down, run `sudo nginx -c /home/hattussa-024/my-folder/nginx/nginx-learning/nginx.conf -s reload`)*

## Configuration Highlights

- **`nginx.conf`**: Contains the Nginx directives, upstream blocks for load balancing, and SSL configuration.
- **`server.js`**: A simple Express application that logs which instance is serving the request.
- **`docker-compose.yml`**: Defines the 3 Node.js services and their environment variables to distinguish between instances.

## Testing

Once everything is running, open your browser and navigate to `http://localhost`. You should be automatically redirected to `https://localhost`.

If you hit the `/api/instance` endpoint, you will see responses from the different Node.js backend instances as Nginx balances the load between them!
