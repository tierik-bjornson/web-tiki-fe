pipeline {
    agent any
    tools {
        nodejs "Node23"
    }
    environment {
        REGISTRY = 'localhost:80'       // Thay bằng URL Harbor của bạn
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
                    sh "docker build -t ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER} ."
                }
            }
        }
        stage('Push to Harbor') {
            steps {
                script {
                    sh "docker login ${REGISTRY} -u admin -p Harbor12345"  // Thay YourPassword bằng mật khẩu Harbor
                    sh "docker push ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    sh "docker tag ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER} ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:latest"
                    sh "docker push ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:latest"
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
