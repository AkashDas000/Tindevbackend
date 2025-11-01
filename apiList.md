## DevTinder API

## appRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionsRequestRouter
- POST /request/send/interested/:userID
- POST /request/send/ignored/:userID

- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID


## userRouter
- GET /user/requests
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform