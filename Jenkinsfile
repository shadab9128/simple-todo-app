pipeline {
  agent any

  tools {
    nodejs "nodejs-23"  // Ensure "nodejs-23" is configured in Jenkins Global Tools
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

    stage('Deploy') {
      steps {
        echo 'Deploy step goes here (e.g., Docker run, Kubernetes, etc.)'
        sh 'sudo docker run -d -p 3000:3000 todo-app'
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}
