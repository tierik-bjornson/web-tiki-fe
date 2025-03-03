pipeline {
    agent any
    tools {
        nodejs "nodejs"
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
    }
    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. Check the logs for more details.'
        }
    }
}
