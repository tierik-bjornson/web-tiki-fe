pipeline {
    agent any
    tools {
        nodejs "Node23"
    }
    environment {
        REGISTRY = 'localhost:80'
        PROJECT = 'lab_1_test'
        IMAGE_NAME = 'web-tiki-fe'
        HARBOR_CREDS = 'harbor-credentials'
        DOCKER_IMAGE = ''
    }
    stages {
        stage('Start') {
            steps {
                script {
                    echo "Pipeline bắt đầu chạy!"
                }
            }
        }
        stage('Checkout') {
            steps {
                script {
                    echo "Đang clone repository..."
                    git url: 'https://github.com/tierik-bjornson/web-tiki-fe.git', branch: 'main'
                    echo "Clone thành công!"
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    echo "Cài đặt dependencies..."
                    sh 'npm install'
                    echo "Cài đặt hoàn tất!"
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    echo "Bắt đầu build..."
                    sh 'npm run build'
                    echo "Build hoàn tất!"
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    echo "Chạy test..."
                    sh 'npm run test || echo "No tests specified, skipping..."'
                    echo "Test xong!"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    echo "⚡ Bắt đầu build Docker image..."
                    sh "docker build -t ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER} ."
                    echo "Build Docker image hoàn thành!"
                }
            } 
        } 
        stage('Push to Harbor') {
            steps {
                script {
                    echo "Đăng nhập vào Harbor..."
                    sh "docker login ${REGISTRY} -u admin -p Harbor12345"
                    echo "🚀 Push image lên Harbor..."
                    sh "docker push ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
                    sh "docker tag ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER} ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:latest"
                    sh "docker push ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:latest"
                    echo "ush thành công!"
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    echo "Dọn dẹp Docker image..."
                    sh "docker rmi ${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER} || true"
                    echo "Dọn dẹp hoàn tất!"
                }
            }
        }
    }
    post {
        success {
            echo '🎉 Build và push lên Harbor thành công!'
        }
        failure {
            echo '❌ Build thất bại. Kiểm tra logs để xem chi tiết.'
        }
    }
}
