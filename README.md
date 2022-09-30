## Employees service (Web Scraping with cheerio)

To start up with the project use docker-compose command in terminal:

`docker-compose up -d`

This will launch three containers: with postgres database, pgAdmin portal and express server.
pgAdmin panel will be available on localhost: 
`http://localhost:15432/`

To access it you can use following credentials on the splash screen:
- email: **admin@pgadmin.com**
- password: **password**

After that you will be able to add the project database to panel, use for that Add Server dialog with following credentials:

- Host: **postgres**
- Username: **username**
- Password: **password**

You can use direct requests to the web server to retrieve information about the employees. Following requests are possible: 
- `localhost:5000` - will return all employees of the firm
- `localhost:5000?name=Artem` - will return employees whose name is Artem
- `localhost:5000?name=A&position=Ma` - will return employees whose name contains A letter and position start with Ma
