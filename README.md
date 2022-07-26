# node-express-sequelize-example

Simple Node Express server that provides an API using data from Postgresql using Sequelize.
Some data fields are encrypted before storing in the db, and decrypted before display.

View the running app on [Heroku](https://node-express-sequelize-example.herokuapp.com/)


## Development

Ensure you have Postgresql and Node installed.

    createdb nes_example

Fork on GitHub and clone your fork

    npm install
    
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    
    npm start

Browse to the API at: http://127.0.0.1:5001/api/v1/products

### API examples

    curl -vk -H "Content-Type: application/json" "http://127.0.0.1:5001/api/v1/products"

    curl -vk -H "Content-Type: application/json" "http://127.0.0.1:5001/api/v1/products/1" 

    curl -vk -X POST -H "Content-Type: application/json" --data '{"name": "test1", "code": "abc123"}' "http://127.0.0.1:5001/api/v1/products" 

    curl -vk -X DELETE -H "Content-Type: application/json" "http://127.0.0.1:5001/api/v1/products/1" 

## Continuous Integration

### Circle CI

[Circle CI](https://circleci.com/) is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app or running tests. Circle is 
configured using the `circle.yml` file. You need to sign up for Circle and enable this project, then
set up Heroku deployment from Circle. To make this work, you need to create a herokuapp and put the
name of that app in `circle.yml`.


## Deployment

Use Heroku for deployment

    heroku create <your_app_name>

    heroku addons:create heroku-postgresql:hobby-dev

    git push heroku main

    heroku run npx sequelize-cli db:migrate
    heroku run npx sequelize-cli db:seed:all
