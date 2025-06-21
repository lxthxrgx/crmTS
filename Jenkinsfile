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
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          sh 'kubectl apply -f k8s/deployment.yaml && kubectl apply -f k8s/service.yaml'
        }
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
