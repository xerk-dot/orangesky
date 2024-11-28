# ORANGE SKY

Find starter packs via their users


<!-- 
Vercel, Upstash, Neo4j, Prisma, Postgres, Docker, GCP

https://github.com/neo4j/neo4j?tab=readme-ov-file



http://localhost:7474/browser/


### Cypher Query to delete nodes on Neo4j

```
MATCH (n:User) DETACH DELETE n
```



### useful commands to tell verify postgres is running
```
//docker commands
docker ps
docker logs orangesky-postgres
docker exec -it orangesky-postgres psql -U postgres
docker exec -it orangesky-postgres psql -U postgres -d orangesky

//list all databases
\l

//list all roles/users
\du

//sign in to postgres
docker exec -it orangesky-postgres psql -U postgres -W

//signin to postgres with connection string
psql postgresql://postgres:password@localhost:5432/orangesky

// Prisma 
pnpm prisma migrate dev --name add_follower_counts_and_bio

// connect to postgres database
psql "your_database_url_from_env"
```


### Music I listen to when coding:
https://youtu.be/JUTKTk60aGk?si=aPX9GQRZ9a3-6lXz&t=1270



### how to get docker into gcp

```

//verify gcp is set up correctly and you are authenticated
gcloud config list

//set the project
gcloud config set project YOUR_PROJECT_ID

//configure docker
gcloud auth configure-docker us-central1-docker.pkg.dev

//tag the docker image
docker tag postgres:latest LOCATION-docker.pkg.dev/YOUR_PROJECT_ID/YOUR_REPOSITORY_NAME/postgres:latest

docker tag postgres:latest us-central1-docker.pkg.dev/my-project/my-docker-repo/postgres:latest


//push the docker image to gcp
docker push LOCATION-docker.pkg.dev/YOUR_PROJECT_ID/YOUR_REPOSITORY_NAME/postgres:latest

docker push us-central1-docker.pkg.dev/my-project/my-docker-repo/postgres:latest

``` -->