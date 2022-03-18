# assign-mentor
Assign Mentor with Students

## Routes
* /create-mentor [POST]
  * {"Name": "Alex",
    "Subject": "AWS"}

* /create-student [POST]
  * {"Name": "Student4",
    "Qualification": "BSc"}

* /all-students [GET]

* /assign-mentor [PUT]
  * {"names": ["Student2","Student3"],
    "mentorId": "62342e94ebc00000e00cf00"}

* /getMentor/:mentorId [GET]

* /all-students/:_id [PUT]
  * {"mentorId": "62342e94ebc00000e00cf00"}



## Heroku
[Deployment](https://assign-mentor-kr.herokuapp.com/)
