pipeline {
  agent any

  environment {
    IMAGE_NAME = "crm-frontend"
    K8S_NAMESPACE = "default"
    KUBECONFIG = "/root/.kube/config"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker version'
        sh "docker build -t ${IMAGE_NAME} ."
      }
    }

    stage('K8s Deploy') {
      steps {
        sh 'kubectl config view'
        sh 'kubectl cluster-info'
        sh 'kubectl get nodes'
        sh "kubectl apply --validate=false -n ${K8S_NAMESPACE} -f k8s/deployment.yaml"
        sh "kubectl apply --validate=false -n ${K8S_NAMESPACE} -f k8s/service.yaml"
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
