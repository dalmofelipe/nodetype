
```shell
docker build -t dalmofelipe/nodetype:0.1.4 .
```


```shell
docker run -dit --name nodetype -p 5000:3000 -e PORT=3000 -e DB_STRING_CONN=mysql://myuser:123123@mysql-db/devdb --network=nodetype_database-network dalmofelipe/nodetype:0.1.4
```
