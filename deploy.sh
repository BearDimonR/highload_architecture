# ENV variables from Github Workflow
AWS_REGION=${AWS_REGION} 
AWS_ECR_ADDRESS=${AWS_ECR_ADDRESS}
AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID}
APP_NAME=${APP_NAME}
ECR_SERVICE_URL="${AWS_ACCOUNT_ID}.${AWS_ECR_ADDRESS}"
VERSION_TAG="latest"
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
set -e # exit early if issues arise
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR_SERVICE_URL}

if [ “$1” = “build-to-ecr” ];then
    # create all docker images and push all to ECR    
    echo "Building..."
    docker compose build
    docker compose push
fi

if [ "$1" = "deploy" ];then
    docker context create ecs myectcontext
    docker context use myectcontext
    docker compose up
    docker compose ps
    docker compose logs
    docker compose down
fi