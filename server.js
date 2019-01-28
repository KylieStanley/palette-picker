const express = require('express'); //imports express
const app = express(); //create instance of express app
const bodyParser = require('body-parser'); //gives ability to parse the body of an HTTP request
const environment = process.env.NODE_ENV || 'development'; //Sets the environment, if none is specified, it will be development
const configuration = require('./knexfile')[environment]; //imports the object of the correct environment from knexfile
const database = require('knex')(configuration); //imports the database configuration from knexfile for our environment

app.use(bodyParser.json()); //Add JSON parsing support to app
app.use(express.static('public')); //use files from public folder

app.set("port", process.env.PORT || 3000); //Set port based on our environment, if unspecified, use 3000

app.get('/api/v1/projects', (request, response) => { //endpoint for fetching all projects
  database('projects').select() //select the projects table
    .then((projects) => { 
      response.status(200).json(projects); //respond with a 200 status and the projects object
    })
    .catch((error) => {
      response.status(500).json({ error }); //respond with an error if the fetch fails
    });
});

app.get('/api/v1/projects/:project_id/palettes', (request, response) => { //endpoint for fetching palettes of a specific project
  database('palettes').where('project_id', request.params.project_id).select() //select palettes table where the project_id column equals the project_id param
    .then((palettes) => {
      response.status(200).json(palettes); //respond with a 200 status and the palettes.
    })
    .catch((error) => {
      response.status(500).json({ error }); // responds with an error if the fetch fails
    });
})

app.post('/api/v1/projects', (request, response) => { //endpoint for posting to projects
  const project = request.body

  for (let requiredParameter of ['name']) { //name must be a key in the request body
    if (!project[requiredParameter]) { //if the project object does no contain the required parameter
      return response.status(422) //respond with a 422 status 
        .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` });
    } //Send an error that the expected format was not received
  }

  database('projects').insert(project, 'id') //Insert into the projects table a project object with a new id
    .then(project => {
      response.status(201).json({ id: project[0] }) //respond with a 201 status and the project id 
    })
    .catch(error => {
      response.status(500).json({ error }) // responds with an error if the fetch fails
    })
})

app.post('/api/v1/projects/:project_id/palettes', (request, response) => { //endpoint for posting a palette to a specific project
  const palette = request.body

  database('palettes').insert(palette, 'id') //insert into the palettes table a palette and new id
    .then(palette => {
      response.status(201).json({...request.body, id: palette[0] }) //respond with a 201 status and the request body with new id
    })
    .catch(error => {
      response.status(500).json({ error }) // responds with an error if the fetch fails
    })
})

app.delete('/api/v1/palettes/:id', (request, response) => { //endpoint for deleting a palette
  database('palettes').where('id', request.params.id).delete() //delete from the palettes table the palette with id that matches the sent param
    .then(palette => {
      response.status(201).json({ id: palette[0] }) //respond with a 201 status and the palette id 
    })
    .catch(error => {
      response.status(500).json({ error }) // responds with an error if the fetch fails
    })
})

app.listen(app.get('port'), () => { //Listen for connections on the port 
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});