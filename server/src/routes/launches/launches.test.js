const request = require('supertest');
const app = require('../../app');

describe('Test Get /launches', () => { 
    test('It should run with 200 response ',async () => { 
        const response=await request(app).get('/launches').expect("Content-Type",/json/).expect(200)
        // expect(response.statusCode).toBe(200)
     })
 })

 describe('Test Post /launches', () => { 
     let postLaunchData={
            mission:'AFG Nation',
            rocket:'Kepler',
            target:'Moon',
            launchDate:'March 22,2023'
        }
    let launchDataWithoutDate={
            mission:'AFG Nation',
            rocket:'Kepler',
            target:'Moon',
        }

     let launchDataInValidDate={
            mission:'AFG Nation',
            rocket:'Kepler',
            target:'Moon',
            launchDate:'nothing'
        }
     test('It should repond with 201 success ', async() => { 
        const response=await request(app)
        .post('/launches')
        .send(postLaunchData)
        .expect("Content-Type",/json/)
        .expect(201)

        const requestData=new Date(postLaunchData.launchDate).valueOf();
        const responseDate=new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestData);

        expect(response.body).toMatchObject(launchDataWithoutDate)// when we want to check the response body we will use the jest assertion not superTest assertion
      })

      test('It should catch missing require properties ', async() => {
          const response=await request(app)
          .post('/launches')
          .send(launchDataWithoutDate)
          .expect("Content-Type",/json/)
          .expect(400);

          expect(response.body).toStrictEqual({error:"Please fullfill the requirements"})
        });
        
      test('it should catch correct invalid date  ', async() => {
          const response=await request(app)
        .post('/launches')
        .send(launchDataInValidDate)
        .expect("Content-Type",/json/)
        .expect(400)

        expect(response.body).toStrictEqual({error:'Enter correct Date'})
       })
  })