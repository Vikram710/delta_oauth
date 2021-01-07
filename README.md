# Delta OIDC Provider
## Developing

### Built With

Node Js

### Prerequisites

npm >= 6.14

### Setting up Dev
```shell
git clone https://github.com/vikram710/delta_oidc_provider
cd delta_oidc_provider
npm install
npm start
```

Create a client account to get client_id and client_secret
Have a button on client app which onclick redirects to oidc providers login page with the client_id 
After the user sucessfully logins you will get redirect to clients redirect  uri with a authorization code
Request get_access_code api from client and send client_id, client_secret and the authorization code 
You will get a access_token (used for authorization) id_token (used for authentication)


