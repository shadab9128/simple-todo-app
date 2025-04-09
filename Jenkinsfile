pipeline {
  agent any

  tools {
    nodejs "nodejs-23"  // Ensure "nodejs-20" is configured in Jenkins Global Tools
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
        sh 'docker run -d -p 3000:3000 simple-todo-app'
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