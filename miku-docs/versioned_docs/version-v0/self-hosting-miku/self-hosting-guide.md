---
title: Self Hosting Guide
sidebar_position: 2
---

This tutorial will help you guide through the process of installing Miku using Docker.

## Requirements

In order to host your own version of Miku, you'll need a couple of services installed:

- [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
- [Poetry](https://python-poetry.org/)
- [Git](https://git-scm.com/)
- [psql](https://www.postgresql.org/docs/current/app-psql.html)

### Standalone Requirements

If you are hosting Miku standalone, you'll also need the follow:

- [PostgreSQL](https://www.postgresql.org/)

:::note Docker Compose Installation

If you are using Docker Desktop, then Docker Compose along with Docker CLI has been already installed and included. If you are deploying Miku using a VPS (using an Linux machine), make sure to also install the Docker Compose plugin as well

:::

## Installation Instructions

Miku does push to 2 different Docker Registries: GHCR (GitHub Container Registry) and Docker Hub. Production builds are available on both registries.

:::caution Never use edge builds

The `edge` and `edge-*` tags are unstable, and should never be used in production. They are built for development purposes, and are not guaranteed to be stable.

:::

### Standalone (Docker CLI)

1. Pull the latest production build from either GHCR or Docker Hub

    GHCR:
    
    ```bash
    sudo docker pull ghcr.io/no767/miku:latest
    ```

    Docker Hub:

    ```bash
    sudo docker pull no767/miku:latest
    ```

2. It's time to fetch some of the API keys used. Currently Miku needs Reddit's ID and Secret, and Tenor's API Key. Click on the links in the list below for how to get one:

    - [Reddit](https://www.reddit.com/prefs/apps)
    - [Tenor](https://developers.google.com/tenor/guides/quickstart#setup)

3. Clone the GitHub repo and `cd` into the directory

    ```bash
    git clone https://github.com/No767/Miku.git && cd Miku
    ```

4. Rename the `.env-docker` file to `.env`

5. Add the bot token, the api keys you got in step 2, and the database credentials you will need. Make sure to get your bot token if you haven't gotten one yet.

6. We need to create databases that Miku will need. These are found in the `.env` file.

    For example, if I have the 3 database names set like this:

    ```env
    POSTGRES_DISQUEST_DATABASE="miku_disquest"
    POSTGRES_EVENTS_DATABASE="miku_events"
    POSTGRES_WS_DATABASE="miku_ws"
    ```

    then I would have to create the databases like this:

    ```sql
    CREATE DATABASE miku_disquest;
    CREATE DATABASE miku_events;
    CREATE DATABASE miku_ws;
    ```

7. If you already have a database user set up for Miku already, then skip this step. But if you don't, here's how you do it (Replace the database names with the ones you have set in the `.env` file)

    ```sql
    CREATE USER miku WITH PASSWORD 'password';

    ALTER DATABASE miku_disquest OWNER TO miku;
    ALTER DATABASE miku_events OWNER TO miku;
    ALTER DATABASE miku_ws OWNER TO miku;

    GRANT CREATE ON DATABASE miku_disquest TO miku;
    GRANT CONNECT ON DATABASE miku_disquest TO miku;
    GRANT CREATE ON DATABASE miku_events TO miku;
    GRANT CONNECT ON DATABASE miku_events TO miku;
    GRANT CREATE ON DATABASE miku_ws TO miku;
    GRANT CONNECT ON DATABASE miku_ws TO miku;
    ```

    :::note Log in as a user with admin perms
    
    You need to be logged in as a user with admin permissions in order to create a database user. If you are logged in as a user with no admin permissions, then you will need to create a new user with admin permissions, and then log in as that user.    
    
    :::

8. For some parts of Miku to work (most notably the Genshin Wish Sim (GWS) system), you'll need to upload some parts of the pre-made data to the PostgreSQL server. To do this, you'll need to run this command to do so:

    ```bash
    psql -U miku -d miku_ws < ./WS-Data/ws_data.sql
    ```

    For Dockerized PostgreSQL server, run this command instead:

    ```bash
    sudo docker exec -i postgres_docker_container psql -U miku -d miku_ws < ./WS-Data/ws_data.sql
    ```

9. It's time to seed the databases. Create and set up a poetry env, and run the `postgres-init.py` file located in the `scripts` folder. This will basically create the tables needed.

    ```bash
    poetry env use 3.10
    poetry install
    poetry run python scripts/postgres-init.py
    ```

10. Once everything is properly set up, it's finally time to run Miku. 

    ```bash
    sudo docker run -d --restart=always --env-file=.env --name=Miku no767/miku:latest
    ```

    :::note Using sudo on other platforms

    On Windows, you don't need to run the command with the `sudo` command

    :::

11. Invite your bot into the server of choice, and have fun!

12. (Optional) Check the logs of the container to make sure that nothing went wrong.

### Docker Compose

1. Clone the repo

    ```bash
    git clone https://github.com/No767/Miku && cd Miku
    ```

2. Find the `docker-compose-example.yml` file and rename it to `docker-compose.yml`. And also rename the `.env-docker` file to `.env`

3. It's time to fetch some of the API keys used. Currently Miku needs Reddit's ID and Secret, and Tenor's API Key. Click on the links in the list below for how to get one:

    - [Reddit](https://www.reddit.com/prefs/apps)
    - [Tenor](https://developers.google.com/tenor/guides/quickstart#setup)

4. Add the bot token, the api keys you got in step 3, and the database credentials you will need. Make sure to get your bot token if you haven't gotten one yet.

5. Edit the `docker-compose.yml` file to include the password and user you set in the `.env` file.

6. Notice that there is a section where Miku would normally be started up is commented out. Leave it like so for now. We'll get to back to it later. Start the Docker Compose stack.

    ```bash
    sudo docker compose up -d
    ```

7. We need to create databases that Miku will need. These are found in the `.env` file.

    For example, if I have the 3 database names set like this:

    ```env
    POSTGRES_DISQUEST_DATABASE="miku_disquest"
    POSTGRES_EVENTS_DATABASE="miku_events"
    POSTGRES_WS_DATABASE="miku_ws"
    ```

    then I would have to create the databases like this:

    ```sql
    CREATE DATABASE miku_disquest;
    CREATE DATABASE miku_events;
    CREATE DATABASE miku_ws;
    ```

8. It's time to seed the databases. Create and set up a poetry env, and run the `postgres-init.py` file located in the `scripts` folder. This will basically create the tables needed.

    ```bash
    poetry env use 3.10
    poetry install
    poetry run python scripts/postgres-init.py
    ```

9. For some parts of Miku to work (most notably the Genshin Wish Sim (GWS) system), you'll need to upload some parts of the pre-made data to the PostgreSQL server. To do this, you'll need to run this command to do so:

    ```bash
    sudo docker exec -i Miku-Postgres psql -U miku -d miku_ws < ./WS-Data/ws_data.sql
    ```

10. Now stop the Docker Compose stack. Comment out the part where Miku should start. Since you have all of the databases and tables set up, Miku should work properly now.

    ```bash
    sudo docker compose stop
    ```

    If noticed beforehand the Docker Compose file had this section commented out:

    ```yml
    services:
    # miku:
    #   container_name: Miku
    #   image: no767/miku:latest
    #   restart: always
    #   deploy:
    #     restart_policy:
    #       condition: on-failure
    #       delay: 0s
    #       max_attempts: 3
    #       window: 120s
    #     mode: replicated
    #   env_file:
    #     - .env
    #   depends_on:
    #     - postgres
    ```

    Now it should look like this:

    ```yml
    services:
      miku:
        container_name: Miku
        image: no767/miku:latest
        restart: always
        deploy:
          restart_policy:
            condition: on-failure
            delay: 0s
            max_attempts: 3
            window: 120s
          mode: replicated
        env_file:
          - .env
        depends_on:
          - postgres
    ```

11. Start the Docker Compose stack again. This time Miku is included, and hopefully should run along with the other services.

    ```bash
    sudo docker compose up -d
    ```

12. Invite your bot into your server of choice, and have fun!

13. (Optional) Check the logs of the container to make sure that nothing went wrong.