
# Github Gist API - node

This is a very basic nodejs app which contains wrapper for github gist apis. 


## Dependencies


This app uses :

1. NodeJS + Express
2. Axios
3. dotenv
4. KnexJS
5. SQLITE
\
All of them can be installed via running npm install post cloning.
## Installation


Install gistapi with npm after cloning.

Step 1 : Clone the repo.\
Step 2 : npm install

```bash
  cd gistapi
  npm install 
```

Next , run the knex migrations so that our sqlite db is ready to use :)


```bash
  ./node_modules/knex/bin/cli.js migrate:up
```

Note : If you are not comfortable with sqlite and want any other database, just make changes in knexfile.js. Documentation here : http://knexjs.org/

```bash
  The app will now be running on localhost:3000
```
## API Reference

#### Return the public gists for a particular user

```http
  GET /v1/user/${username}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Username for fetching gists|

#### Get gist from a gistId

```http
  GET /v1/gists/${gistId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gistId`      | `string` | **Required**. Id of gist to fetch |

#### Mark a gist as starred

```http
  GET /v1/gists/${gistId}/star
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gistId`      | `string` | **Required**. Id of gist to mark as starred |

#### Remove gist from starred list

```http
  GET /v1/gists/${gistId}/unstar
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `gistId`      | `string` | **Required**. Id of gist to remove from starred list|

#### Get list of all starred gists

```http
  GET /v1/gists/
```
