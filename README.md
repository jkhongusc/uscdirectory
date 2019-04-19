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

https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
  - curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
  - . ~/.nvm/nvm.sh
  - nvm install [nodejs version]
  - node -e "console.log('Running Node.js ' + process.version)"
  - 



  
