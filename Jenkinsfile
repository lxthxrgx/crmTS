pipeline {
  agent any

  environment {
    IMAGE_NAME = "crm"
    DOCKER_HUB_REPO = "lxthxrgx/crm"
    K8S_NAMESPACE = "default"
    KUBECONFIG = "/root/.kube/config"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Docker Build & Push') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerHub',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker build -t $DOCKER_HUB_REPO:latest .
            docker push $DOCKER_HUB_REPO:latest
          '''
        }
      }
    }

    stage('K8s Deploy') {
      steps {
        sh '''
          kubectl config view
          kubectl cluster-info
          kubectl get nodes
          kubectl apply --validate=false -n $K8S_NAMESPACE -f k8s/deployment.yaml
          kubectl apply --validate=false -n $K8S_NAMESPACE -f k8s/service.yaml
        '''
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
