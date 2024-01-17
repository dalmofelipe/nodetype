
```shell
docker run -itd -p 5000:3333 -e DB_STRING_CONN=mysql://myuser:123123@mysql-db/devdb --name teste-node-type --network nodejs-typescript-sequelize_database-network dalmofelipe/nodetype:0.1.0
```
