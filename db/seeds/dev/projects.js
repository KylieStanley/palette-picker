
exports.seed = ((knex, Promise) => {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name: 'project1'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { name: 'Pretty', 
              color_1: '#FFFFFF',
              color_2: '#F9F35F',
              color_3: '#A9CF00',
              color_4: '#E33A10',
              color_5: '#F4659A',
              project_id: project[0] 
            },
            { name: 'Nice Colors', 
              color_1: '#000000',
              color_2: '#ABC689',
              color_3: '#53893A',
              color_4: '#AAB589',
              color_5: '#5490CCD',
              project_id: project[0] 
            }
          ])
        })
        .then(() => console.log('Seeding Complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
});
