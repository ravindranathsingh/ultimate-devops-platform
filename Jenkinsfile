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

	stage('Build Backend Image') {
	    steps {
                sh '''
		docker build \
		  -t ghcr.io/ravindranathsingh/backend:v1 \
		  ./applications/backend
		'''
	    }
	}

	stage('Build Frontend Image') {
            steps {
                sh '''
                docker build \
                  -t ghcr.io/ravindranathsingh/frontend:v1 \
                  ./applications/frontend
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
