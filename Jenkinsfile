pipeline {

    agent {
        label 'built-in'
    }

    environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        GHCR_REPO = "ghcr.io/ravindranathsingh"
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
                  -t ${GHCR_REPO}/backend:${IMAGE_TAG} \
                  ./applications/backend
                '''
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh '''
                docker build \
                  -t ${GHCR_REPO}/frontend:${IMAGE_TAG} \
                  ./applications/frontend
                '''
            }
        }

        stage('Push Images to GHCR') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'ghcr-creds',
                    usernameVariable: 'GH_USER',
                    passwordVariable: 'GH_PAT'
                )]) {
                    sh '''
                    echo "$GH_PAT" | docker login ghcr.io -u "$GH_USER" --password-stdin

                    docker push ${GHCR_REPO}/backend:${IMAGE_TAG}
                    docker push ${GHCR_REPO}/frontend:${IMAGE_TAG}

                    docker logout ghcr.io
                    '''
                }
            }
        }

        stage('Update Helm Image Tags') {
            steps {
                sh '''
                sed -i "s|tag:.*|tag: ${IMAGE_TAG}|" helm/backend/values.yaml
                sed -i "s|tag:.*|tag: ${IMAGE_TAG}|" helm/frontend/values.yaml

                echo "===== Backend values ====="
                grep -A2 image helm/backend/values.yaml

                echo "===== Frontend values ====="
                grep -A2 image helm/frontend/values.yaml
                '''
            }
        }

        stage('Commit Helm Updates') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-creds',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_PAT'
                )]) {
                    sh '''
                    git config user.name "Jenkins"
                    git config user.email "jenkins@local"

                    git add helm/backend/values.yaml
                    git add helm/frontend/values.yaml

                    if ! git diff --cached --quiet; then
                        git commit -m "ci: update image tags to ${IMAGE_TAG}"
                        git push https://${GIT_USER}:${GIT_PAT}@github.com/ravindranathsingh/ultimate-devops-platform.git HEAD:main
                    else
                        echo "No Helm changes to commit."
                    fi
                    '''
                }
            }
        }

    }

    post {

        always {
            echo 'Pipeline Finished'
        }

        success {
            echo "Pipeline Successful - Image Tag: ${IMAGE_TAG}"
        }

        failure {
            echo 'Pipeline Failed'
        }

    }

}
