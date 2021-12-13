# ENV variables from Github Workflow
AWS_REGION=${AWS_REGION} 
AWS_ECR_ADDRESS=${AWS_ECR_ADDRESS}
AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID}
APP_NAME=${APP_NAME}
ECR_SERVICE_URL="${AWS_ACCOUNT_ID}.${AWS_ECR_ADDRESS}"
VERSION_TAG="latest"
BUILD_ID=${BUILD_ID}
set -e # exit early if issues arise
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR_SERVICE_URL}

if [ “$1” = “build-to-ecr” ];then
    CONTAINER_NAME='highload'
    # create all docker images and push all to ECR
    ECR_REPOSITORY_NAME=${APP_NAME}_${CONTAINER_NAME}
    ECR_REPO_URL="${ECR_SERVICE_URL}/${ECR_REPOSITORY_NAME}"
    aws ecr create-repository --repository-name ${ECR_REPOSITORY_NAME:?}
    
    echo "Building..."
    docker compose build
    
    docker compose push ${ECR_SERVICE_URL}/${ECR_REPOSITORY_NAME}:${VERSION_TAG}
fi

if [ "$1" = "deploy" ];then
    aws ecs update-service --force-new-deployment --cluster highload --service nginx-service
fi