| ROUTES                          | METHOD | BODY / Token                                                 | STATUS           | RESPONSE                                                     |
| ------------------------------- | ------ | ------------------------------------------------------------ | ---------------- | ------------------------------------------------------------ |
| /api/people/login               | POST   | EMAIL, PASSWORD \|\| no token                                | 201, 403,500     | Success message  and error message if status 403,and 500     |
| /api/people/register            | POST   | EMAIL, PASSWORD, NAME \|\| no token                          | 404,200,400,500  | Success message  and error message if status 400,and 500, if email already exist it gonna be 404 |
| /api/people/update/:id          | PUT    | EMAIL, PASSWORD, NAME \|\| no token                          | 200 and 500      | Success message  and error message if status 500 from Database |
| /api/answer/add                 | POST   | Content, Fromquestion                                        | 201 and 500      | Success message and data of answer  and error message if status 500 from Database |
| /api/answer/delete/:id          | DELETE | NONE                                                         | 400 and 200      | Success message and error message if status 500 from Database |
| /api/answer/:id                 | PUT    | Content, Fromquestion, upvote, downvote, comment             | 400, 200 and 500 | Success message of new update and error message if status 500 from Database |
| /api/answer/getall              | GET    | User id                                                      | 200 and 500      | Success message , GET all questions and error message if status 500 from Database |
| /api/question/add               | POST   | Title, content, categories and TOKEN                         | 201 , 200, 500   | Success message of new question and error message if status 500 from Database |
| /api/question/getwhatever       | GET    | Title, content, categories and TOKEN \|\| no TOKEN (flexible search) | 200 and 500      | get all populate data and error message if status 500 from Database |
| /api/question/update/:id        | PUT    | Title, content, answers , categories and TOKEN               | 200 and 500      | new record update response  object and error message status 500 from database |
| /api/question/:id               | DELETE | NONE                                                         | 200 and 500      | Success message after deleted record and error message if status 500 from Database |
| /api/question/userquestions/:id | GET    | flexible search and  TOKEN                                   | 200 and 500      | data object and error message from Dtaabase if status 500    |
|                                 |        |                                                              |                  |                                                              |
|                                 |        |                                                              |                  |                                                              |
|                                 |        |                                                              |                  |                                                              |
|                                 |        |                                                              |                  |                                                              |
|                                 |        |                                                              |                  |                                                              |

