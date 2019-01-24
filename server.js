const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(express.static('public'));

app.set("port", process.env.PORT || 3000);

app.locals.title = 'Palette Picker';

app.locals.projects = []

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;
  return response.json({ projects });
});

app.post('/api/v1/projects', (request, response) => {
  const { project } = request.body
  const id = Date.now()

  app.locals.projects.push({...project, id})
  response.status(201).json({ id, project })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});