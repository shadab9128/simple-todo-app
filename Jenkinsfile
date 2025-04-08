pipeline {
  agent any

  tools {
    nodejs "nodejs-20"  // Make sure this is configured in Jenkins Global Tools
  }

  environment {
    DOCKER_IMAGE = 'shadab024/todo-app' // Replace with your DockerHub image name
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds') // Jenkins credentials ID
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/shadab9128/simple-todo-app.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        // Skip this stage if no tests, or customize it
        sh 'echo "Skipping tests (none defined)"'
        // or run real tests: sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh "docker build -t $DOCKER_IMAGE ."
      }
    }

    stage('Push to DockerHub') {
      steps {
        withDockerRegistry([ credentialsId: "$DOCKERHUB_CREDENTIALS", url: '' ]) {
          sh "docker push $DOCKER_IMAGE"
        }
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploy step goes here (e.g., ECS, Kubernetes, Docker run, etc.)'
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
