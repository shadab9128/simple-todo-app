pipeline {
    agent any

    environment {
        IMAGE_NAME = 'shadab024/todo-app'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'  // Assumes test script is defined in package.json
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t $IMAGE_NAME:${env.BUILD_NUMBER} .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo 'Pushing image to DockerHub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
                        docker push $IMAGE_NAME:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the container...'
                sh '''
                    docker stop todo-app || true
                    docker rm todo-app || true
                    docker run -d --name todo-app -p 3000:3000 $IMAGE_NAME:${BUILD_NUMBER}
                '''
            }
        }
    }

    post {
        success {
            echo '✅ App built, tested, and deployed successfully!'
        }
        failure {
            echo '❌ Build failed. Check logs above.'
        }
    }
}
