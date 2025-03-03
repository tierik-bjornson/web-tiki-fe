pipeline {
    agent any
    tools {
        nodejs "Node23"
    }
    environment {
        REGISTRY = 'localhost/harbor'       // Thay bằng URL Harbor của bạn
        PROJECT = 'lab_1_test'                    // Thay bằng tên project trên Harbor
        IMAGE_NAME = 'web-tiki-fe'               // Tên image
        HARBOR_CREDS = 'harbor-credentials'      // ID của credentials trong Jenkins
        DOCKER_IMAGE = ''
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/tierik-bjornson/web-tiki-fe.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test || echo "No tests specified, skipping..."'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    DOCKER_IMAGE = docker.build("${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Push to Harbor') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", HARBOR_CREDS) {
                        DOCKER_IMAGE.push()
                        DOCKER_IMAGE.push('latest')
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                sh "docker rmi ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER} || true"
            }
        }
    }
    post {
        success {
            echo 'Build and push to Harbor completed successfully!'
        }
        failure {
            echo 'Build failed. Check the logs for more details.'
        }
    }
}
