# ORANGE SKY

neo4j

https://youtu.be/JUTKTk60aGk?si=aPX9GQRZ9a3-6lXz&t=1270


https://github.com/neo4j/neo4j?tab=readme-ov-file



https://hub.docker.com/_/neo4j/

docker run \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    neo4j


http://localhost:7474/browser/


### Cypher Query to delete nodes on Neo4j

```
MATCH (n:User) DETACH DELETE n
```