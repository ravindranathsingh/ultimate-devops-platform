pipeline {

    agent {
	label 'built-in'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Repository') {
            steps {
                sh '''
                test -d applications
                test -d helm
                test -d kubernetes
                '''
            }
        }

        stage('Validate Backend Helm') {
            steps {
                sh '''
                helm lint helm/backend
                helm template backend helm/backend > /dev/null
                '''
            }
        }

        stage('Validate Frontend Helm') {
            steps {
                sh '''
                helm lint helm/frontend
                helm template frontend helm/frontend > /dev/null
                '''
            }
        }

    }

    post {

        always {
            echo 'Pipeline Finished'
        }

        success {
            echo 'Pipeline Successful'
        }

        failure {
            echo 'Pipeline Failed'
        }

    }

}
