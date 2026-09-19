# Deployment Rules

## Deployment Options

| Product requirements | Delivery and deployment |
|---|---|
| No backend or database; everything can be packaged as HTML, JavaScript, CSS, and other static assets | Deploy static assets to Cloudflare Workers. |
| Requires a backend or database | Package the application as a Docker image, run it on the configured host, and expose the application through Cloudflare Tunnel. |

The Solution Architect selects the path based on product requirements. DevOps owns setup and deployment. Record the selection in the product's `architecture/` and the operational details in `ops/`.

For Docker products, keep frontend and backend in one application image when both are present and provide a simple startup script such as `run.sh`. Document database provisioning, persistent storage, and migrations separately as required by the architecture. Cloudflare Tunnel provides access to the running application; the configured host runs the container and must remain available along with the tunnel connection.

## First Deployment

The first deployment request includes the necessary setup:

- Workers: configure the Cloudflare account target, Worker, static asset build/output, and public URL.
- Docker with Tunnel: configure the runtime host, application container, database and persistent storage where needed, tunnel connector, and public hostname routing.
- Save reusable build, start, deployment, and verification steps in `products/<product-slug>/ops/`. Record resource identifiers and configuration locations without storing secret values in repository files.
- Request only missing setup information or access needed to complete deployment. Reuse existing setup on later deployments.

## Changes and Publication

For ordinary change requests, complete the implementation, validate it, and build locally. Report that the changes are ready locally; do not update the live Worker or restart/replace a container serving the live tunnel as part of that local build. Keep local development separate from the live runtime if both use the same machine.

When the CEO requests deployment, including saying "deploy" or "redeploy", publish the requested product using its configured path. That request is authorization to deploy; do not add a routine confirmation step.

- Workers: build the current changes and deploy the updated assets to the configured Worker.
- Docker with Tunnel: build the current application image, update the container on the configured host, apply required database migrations with appropriate data protection, and ensure the tunnel routes to the updated application.

Verify the public Cloudflare URL and a representative user flow after deployment. Report the URL and deployed version or change summary. If deployment fails, report the blocker and actual live state; a successful local build alone is not a successful deployment.
