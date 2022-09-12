---
title: Extra Notes
sidebar_position: 4
---

## Expected Uptimes

Discord bots are generally expected to be running 24/7, and are expected to have an uptime of 90-99% when in production. Make sure that the server you are running does not experience issues, or this can cause Miku to fail. It is recommended to not stop the bot unless for new updates, or critical downtime issues or server maintenance.

## Cloud Deployments

Miku can also be deployed to the cloud. Miku will work fine on Azure, GCP, or AWS. In fact, it's recommended to deploy Miku to the cloud. Hosts such as PebbleHost, Heroku, Railway, etc will not work here. All you need to do is to pull the image from either GHCR or Docker Hub, and then pass the env as the arguments as needed during setup. Oncec done, Miku can be entirely ran on the cloud. For PostgreSQL, you can either spin up a standard PostgreSQL instance, or better yet, used a managed version of PostgreSQL depending on your cloud provider. (Azure Database for PostgreSQL, Cloud SQL for PostgreSQL, or Amazon RDS for PostgreSQL will all work here)

:::caution Do not deploy to free hosting sites

Miku should not every be deployed to free hosting sites such as Heroku, or Railway. And also please **DO NOT** run Miku on Replit.

:::