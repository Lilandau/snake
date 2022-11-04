# Welcome to your CDK TypeScript project

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Prequisite

Install AWS-CLI v2 and configure the `~/.aws/config` and `~/.aws/credentials` files:

```
# config

[default]
region = us-east-1

# credentials

[default]
aws_access_key_id = <yourAccessKey>
aws_secret_access_key = <yourSecretKey>
```

Check correctness: `aws sts get-caller-identity` should return a JSON containing your username.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
