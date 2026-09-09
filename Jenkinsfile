pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Create Environment File') {
            steps {
                bat '''
                echo PORT=5000> frontend\\backend\\.env
                echo MONGO_URI=mongodb://host.docker.internal:27017/fashionPortal>> frontend\\backend\\.env
                echo JWT_SECRET=mysecretkey>> frontend\\backend\\.env
                '''
            }
        }

        stage('Start Application') {
            steps {
                bat 'docker compose up -d'
            }
        }

        stage('Verify Containers') {
            steps {
                bat 'docker compose ps'
            }
        }
    }

    post {
        always {
            echo 'Jenkins pipeline completed.'
        }
    }
}