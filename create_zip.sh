#!/bin/sh


zip -qr onlinedir.zip node_modules
zip -qg onlinedir.zip controller.js
zip -qg onlinedir.zip uscldap.js
zip -qg onlinedir.zip main.js

# upload automatically to s3
aws s3 cp onlinedir.zip s3://tgw-us-west-2-public/onlinedir.zip

# print s3 url for admin to use in AWS console
echo "s3://tgw-us-west-2-public/onlinedir.zip"


