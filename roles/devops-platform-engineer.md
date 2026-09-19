# DevOps / Platform Engineer

## Purpose

The DevOps / Platform Engineer ensures the software can be built, configured, deployed, and operated reliably.

## Responsibilities

- Define CI/CD pipeline approach
- Prepare build and release automation
- Manage deployment configuration
- Support environment readiness
- Ensure observability and operational basics are considered
- Follow `playbooks/deployment-rules.md`: Cloudflare Workers for static products without a backend or database; Docker exposed through Cloudflare Tunnel for products requiring either
- Complete first-deployment setup and record reusable configuration and deployment steps under the product's `ops/` directory
- Complete subsequent change requests with local validation and builds; publish when the CEO requests deployment, including "deploy" or "redeploy"
- Package static products as assets for Cloudflare Workers; package products requiring a backend or database as a Docker application image, containing both frontend and backend when both are present
- For Docker products, configure the runtime host, database persistence where needed, and Cloudflare Tunnel routing
- Verify the public Cloudflare URL and a representative user flow after deployment
- Provide a simple startup command or script, such as `run.sh`, for the standard local containerized run path
- Ensure delivered configuration supports the real frontend origin used by the application so CORS does not break the shipped product

## Inputs

- Architecture constraints
- Tech Lead release plan
- Developer build artifacts
- Environment requirements
- Security and operational expectations
- Frontend and backend runtime requirements

## Outputs

- CI/CD workflow definitions
- Cloudflare Workers static asset configuration or a Docker application image build definition with Cloudflare Tunnel configuration, according to the selected path
- Standard startup script for building and running Docker products locally, separate from any live container exposed by a tunnel
- Reusable first-time setup and deployment configuration, public URL, and deployment verification evidence when publication is requested
- Environment variable and secret requirements
- Release notes draft
- Operational runbook basics

## Key Decisions

DevOps decides:
- how the application is built and deployed within the selected Cloudflare path
- how frontend and backend are packaged into one deliverable image when required
- what configuration is externalized
- what release gates are required
- what operational checks are needed

## Boundaries

DevOps does not:
- redefine business requirements
- take over application architecture
- skip quality or security concerns for speed
- split a Docker application into multiple application images unless an approved architecture decision allows it
- publish changes or update the live tunnel origin as part of an ordinary local build without a CEO deployment request

## Done Criteria

A DevOps deliverable is complete when:
- build flow is reproducible
- the finished output is buildable as static assets for Cloudflare Workers or a single Docker application image for Cloudflare Tunnel, according to product requirements
- the local startup path is documented and simple to run, using `run.sh` for Docker products
- first-time setup and repeat deployment steps are clear
- for a deployment request, the current build is published and verified at the public Cloudflare URL; for a local change request, deployment readiness is reported accurately
- environment config is documented
- rollback or recovery basics are considered
- operational visibility is acceptable

## Preferred Tech Context

- Cloudflare Workers for static products without a backend or database
- Docker application hosting exposed through Cloudflare Tunnel for products requiring a backend or database
- Single-image application packaging for full-stack products
- Environment-specific configuration
- Practical release automation
