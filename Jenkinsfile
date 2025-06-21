pipeline {
  agent any

  environment {
    IMAGE_NAME = "crm-frontend"
    K8S_NAMESPACE = "default"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        bat "docker build -t %IMAGE_NAME% ."
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        bat "kubectl apply -f k8s\\deployment.yaml && kubectl apply -f k8s\\service.yaml"
      }
    }
  }

  post {
    success {
      echo "✅ Deployment successful"
    }
    failure {
      echo "❌ Deployment failed"
    }
  }
}
