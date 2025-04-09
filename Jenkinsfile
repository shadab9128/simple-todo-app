pipeline {
  agent any

  tools {
    nodejs "nodejs-23"
  }

  environment {
    // Cache directories
    NPM_CACHE = "${env.WORKSPACE}/.npm"
    DOCKER_IMAGE = "todo-app"
  }

  stages {
    stage('Restore Cache') {
      steps {
        script {
          // Check if node_modules exists (from previous builds)
          if (fileExists('node_modules')) {
            echo 'Using cached node_modules'
          } else {
            echo 'No cache found, will perform fresh install'
          }
        }
      }
    }

    stage('Build') {
      steps {
        sh '''
          # Use cached modules if available
          npm ci --prefer-offline --cache $NPM_CACHE
        '''
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          // Only rebuild Docker image if source files changed
          def changedFiles = sh(script: 'git diff --name-only HEAD HEAD~1', returnStdout: true).trim()
          if (changedFiles || !docker.imageExists(DOCKER_IMAGE)) {
            sh "docker build -t $DOCKER_IMAGE ."
          } else {
            echo 'No source changes detected, using existing Docker image'
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        sh """
          # Stop and remove existing container if running
          docker stop $DOCKER_IMAGE || true
          docker rm $DOCKER_IMAGE || true
          
          # Run new container
          docker run -d -p 3000:3000 --name $DOCKER_IMAGE $DOCKER_IMAGE
        """
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully! 🚀'
      // Clean up old Docker images
      sh 'docker system prune -f --filter "until=24h"'
    }
    failure {
      echo 'Pipeline failed ❌'
    }
  }
}