# Test deploy to Vercel using create react app

> A simple voting app using Postgre, Express, React and Nodejs
> Meant to be deployed to Vercel for the frontend
> Backend will have a docker file that can be deployed on a Lightsail server. Includes both API and DB

- [x] Page to list of all polls
- [x] Integrate routing
- [x] Page to show a single poll
- [x] Connect to API
- [ ] Submit selected poll
- [ ] Deploy to Now

**API**

- [x] Create an express api
- [x] Connect to postgress db (RDS or on the same box as the API)
- [ ] Rate limiting

  - [ ] Auth route
    - [ ] Do you use bcrypt to hash password before sending to endpoint?? workvalue 12
  - [ ] Signup and login user
  - [ ]

**DB**

- [x] Setup postgres using docker for dev
- [ ] Deploy postgress either with RDS or a lightsail box

**Docker**

- [x] Docker setup for postgres
- [ ] Implement docker for deploying
