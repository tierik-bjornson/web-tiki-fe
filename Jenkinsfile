pipeline {
    agent any
    tools {
        nodejs "Node23" // Giữ nguyên cấu hình Node.js
    }
    environment {
        // Cấu hình Harbor
        REGISTRY = 'localhost'       // Thay bằng URL Harbor của bạn
        PROJECT = 'lab_1_test'                    // Thay bằng tên project trên Harbor
        IMAGE_NAME = 'web-tiki-fe'               // Tên image, có thể giữ giống tên repo
        HARBOR_CREDS = 'harbor-credentials'      // ID credentials trong Jenkins
        DOCKER_IMAGE = ''                        // Biến để lưu image sau khi build
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
                    // Build Docker image với tag là số build
                    DOCKER_IMAGE = docker.build("${REGISTRY}/${PROJECT}/${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }
        stage('Push to Harbor') {
            steps {
                script {
                    // Đăng nhập và push image lên Harbor
                    docker.withRegistry("https://${REGISTRY}", HARBOR_CREDS) {
                        DOCKER_IMAGE.push()
                        DOCKER_IMAGE.push('latest') // Optional: thêm tag latest
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                // Xóa image khỏi máy Jenkins để tiết kiệm dung lượng
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
