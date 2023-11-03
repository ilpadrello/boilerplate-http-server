Brainstorming:

For each instace of a logger, we must have some basis data, that consist in: 
- component
- message
- data
- request
  - traceID
  - headers
  - requested route
  - all is in the request

The content of the request (body, params, query) should be typed automatically and easy to read

Each controller should not have (req,res,next) since, for him those do not make any sense

We should pass only the informations needed to the controller to run the code, those could come from a previous controller or from the validated data of the route

Config file should be avalable from anywhere in the code. The values should be automatically validate (Zod ou autre) before running the code correctly.

Env variables should be in the config object ? Should be replaced ?

It should be a Types version of the database, this is usefull when reading from the database.



