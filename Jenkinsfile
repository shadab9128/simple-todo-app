pipeline {
  agent any

  tools {
    nodejs "nodejs-23"  // Ensure "nodejs-23" is configured in Jenkins Global Tools
  }

  environment {
    DOCKER_IMAGE = 'shadab024/todo-app' // Replace with your DockerHub repository name
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') // Jenkins credentials ID
  }

  stages {
    stage('Build') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t $DOCKER_IMAGE ."
      }
    }

    stage('Push to DockerHub') {
      steps {
        withDockerRegistry([credentialsId: "$DOCKERHUB_CREDENTIALS", url: 'https://index.docker.io/v1/']) {
          sh "docker push $DOCKER_IMAGE"
        }
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploy step goes here (e.g., Docker run, Kubernetes, etc.)'
        sh 'docker run -d -p 3000:3000 $DOCKER_IMAGE'
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully! 🚀'
    }
    failure {
      echo 'Pipeline failed ❌'
    }
  }
}