# USC Directory
USC Directory nodejs project


## github access
Ask owner for read/write access.  

To clone:
git clone https://GITHUB_USERNAME:GITHUB_TOKEN@github.com/jkhongusc/uscdirectory .


## Development environment
I recommend creating a development environment on a standard EC2 Linux instance (micro is usually enough):
- Create EC2 instance 
  - Use latest Amazon Linux AMI
  - select micro instance
  - Make sure EC2 is launched in the correct VPC
  - configure IAM role to apply to instance (this step can be modified post launch)
  - apply security group (SG can be modified post launch)
  - apply EC2 key pair
- ssh to instance and install any necessary packages:
  - sudo yum update -y
  - sudo yum install git -y 
  - npm install --save-dev jest -g

https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
  - curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
  - . ~/.nvm/nvm.sh
  - nvm install [nodejs version]
  - node -e "console.log('Running Node.js ' + process.version)"
  - npm init
  - npm install ldapjs
  - npm install dotenv
  - npm install @slack/client
  - npm install --save-dev jest


## deployment
To create deployment (zip) file:

cd uscdirectory 

./create_zip.sh

Copy deployment script to an S3 bucket:

aws s3 cp onlinedir.zip s3://tgw-us-west-2-public/onlinedir.zip


## lambda configuration
load code from S3 - https://s3.amazonaws.com/tgw-us-west-2-public/onlinedir.zip

Runtime: Nodejs 8.10

Handler: main.handler

Environment variables (required): SLACKCHANNEL, SLACKNAME, SLACKTOKEN

role: requires policies - AmazonEC2ReadOnlyAccess, AWSLambdaBasicExecutionRole

Memory: 128MB

Timeout: 1min

Network: VPC




## Future Features
- CloudFormation template
- Monitoring
- Cognito

  




