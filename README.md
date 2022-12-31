# Viideon

### Configuration for deployment

In your `.env` file, ensure the following are defined:

* `REACT_APP_APIURL`: URL to the backend server
* `REACT_APP_OAUTH_ID`: OAUTH ID from Google
* `REACT_APP_DOMAIN`: Domain of the application (most likely `https://app.viideon.com`)
* `REACT_APP_COGNITO_IDENTITY_POOL_ID`: Cognito Identity Pool ID to use for authentication
* `REACT_APP_COGNITO_REGION`: Region that the Cognito Identity Pool is in
* `REACT_APP_COGNITO_USER_POOL_ID`: Cognito User Pool ID for the app
* `REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID`: Web Client ID for the Cognito User Pool
* `REACT_APP_S3_BUCKET`: Bucket to use for storing user assets
* `REACT_APP_S3_REGION`: AWS Region to communicate with

### Running the app locally

To run the app locally, create a `.env.development.local` file with the appropriate configuration values in the root directory. Then use `yarn start` to start the local server.

### Deploying the App to AWS

The app is hosted via a S3 bucket. Once you've installed appropriate AWS credentials in your environment, use the following commands to build and deploy the app:

* `yarn build`
* `aws s3 sync build/ s3://app.viideon.com --acl public-read --profile [profile]`