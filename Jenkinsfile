pipeline {
    agent any
    environment {
        GITHUB_CREDS = credentials('github-registry') // automatically creates GITHUB_CREDS_USR & GITHUB_CREDS_PSW
        REGISTRY = 'ghcr.io/adaptec/ias' // docker container registry URL
        PROJ_NAME = 'component-webui'
        TEST_TIME = 20 // time to wait to check if container is running successfully
    }
    stages {
        stage('Clone CICD Scripts') {
            steps {
                // get the latest main branch of the necessary scripts to run the CICD pipeline
                echo 'Cloning latest CICD scripts from GitHub'
                sh 'git clone https://$GITHUB_CREDS_USR:$GITHUB_CREDS_PSW@github.com/adaptec/cicd-scripts.git' // clone into project repo
            }
        }
        stage('Container Image Creation') {
            steps {   
                echo 'Building container image with Docker for Minikube'
                sh 'sudo ./cicd-scripts/kubernetes/kubernetes-build.sh $PROJ_NAME $JOB_BASE_NAME-$BUILD_NUMBER' // MAY BE INSECURE
            }
        }
        stage('Container Test') {
            steps {
                withKubeConfig([credentialsId: 'kube-admin-minikube',
                                serverUrl: 'https://192.168.49.2:8443',
                                contextName: 'minikube',
                                clusterName: 'minikube',
                                namespace: 'cicd'
                                ]) {
                    // test to see if specified pod containers are running successfully after a certain amount of time
                    echo 'Running & testing pod containers in Kubernetes'
                    sh './cicd-scripts/kubernetes/kubernetes-run-test.sh $PROJ_NAME $JOB_BASE_NAME-$BUILD_NUMBER $TEST_TIME'
                }
            }
        }
        stage('Container Image Deploy') {
            steps {
                echo 'Deploying container image to the GitHub image registry (if on main branch)'
                sh 'echo $GITHUB_CREDS_PSW | sudo ./cicd-scripts/kubernetes/kubernetes-upload.sh $PROJ_NAME $REGISTRY $GITHUB_CREDS_USR $JOB_BASE_NAME-$BUILD_NUMBER $BRANCH_IS_PRIMARY'
            }
        }
    }
    post {
        failure {
            // will always run after any step failure
            echo 'Pipeline failed, notifying Teams channel'
            office365ConnectorSend webhookUrl: 'https://adaptecsolutions.webhook.office.com/webhookb2/b37247db-06d4-4b8f-ba27-ff12892f8d8d@9ab74731-61c9-4049-8e6b-30c1c138ac1e/JenkinsCI/8ab71a5bd40140a19ac2bca65d288a66/a808b2dd-2cef-4624-b6a6-248a2c3f5573',
                message: "Test failure for $JOB_NAME: $JOB_URL",
                status: 'Failure'
        }
        cleanup {
            // will always run after stages regardless of outcome
            withKubeConfig([credentialsId: 'kube-admin-minikube',
                            serverUrl: 'https://192.168.49.2:8443',
                            contextName: 'minikube',
                            clusterName: 'minikube',
                            namespace: 'cicd'
                            ]) {
                echo 'Removing Kubernetes pods & services'
                sh './cicd-scripts/kubernetes/kubernetes-cleanup-1.sh $PROJ_NAME $JOB_BASE_NAME-$BUILD_NUMBER'
            }
            echo 'Removing Docker containers & images'
            sh 'sudo ./cicd-scripts/kubernetes/kubernetes-cleanup-2.sh $PROJ_NAME $REGISTRY $JOB_BASE_NAME-$BUILD_NUMBER'
            echo 'Cleaning up workspace'
            cleanWs() // cleans up workspace using addon
            echo 'CICD Pipeline Finished'
        }
    }
}
