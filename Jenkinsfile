pipeline {

    agent {
        node {
            label 'jenkins-agent'
        }
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Repository') {
            steps {
                container('build-tools') {
                    sh '''
                    test -d applications
                    test -d helm
                    test -d kubernetes
                    '''
                }
            }
        }

        stage('Validate Backend Helm') {
            steps {
                container('build-tools') {
                    sh '''
                    helm lint helm/backend
                    helm template backend helm/backend > /dev/null
                    '''
                }
            }
        }

        stage('Validate Frontend Helm') {
            steps {
                container('build-tools') {
                    sh '''
                    helm lint helm/frontend
                    helm template frontend helm/frontend > /dev/null
                    '''
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                container('build-tools') {
                    sh '''
                    docker build \
                      -t ghcr.io/ravindranathsingh/backend:v1 \
                      ./applications/backend
                    '''
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                container('build-tools') {
                    sh '''
                    docker build \
                      -t ghcr.io/ravindranathsingh/frontend:v1 \
                      ./applications/frontend
                    '''
                }
            }
        }

        stage('Push Images to GHCR') {
            steps {
                container('build-tools') {
                    withCredentials([usernamePassword(
                        credentialsId: 'ghcr-creds',
                        usernameVariable: 'GH_USER',
                        passwordVariable: 'GH_PAT'
                    )]) {
                        sh '''
                        echo "$GH_PAT" | docker login ghcr.io -u "$GH_USER" --password-stdin

                        docker push ghcr.io/ravindranathsingh/backend:v1
                        docker push ghcr.io/ravindranathsingh/frontend:v1

                        docker logout ghcr.io
                        '''
                    }
                }
            }
        }

        stage('Update Helm Image Tags') {
            steps {
                container('build-tools') {
                    sh '''
                    sed -i "s/tag:.*/tag: ${BUILD_NUMBER}/" helm/backend/values.yaml
                    sed -i "s/tag:.*/tag: ${BUILD_NUMBER}/" helm/frontend/values.yaml

                    echo "Updated image tags to ${BUILD_NUMBER}"

                    grep tag helm/backend/values.yaml
                    grep tag helm/frontend/values.yaml
                    '''
                }
            }
        }

        stage('Commit Helm Updates') {
            steps {
                container('build-tools') {
                    withCredentials([usernamePassword(
                        credentialsId: 'github-creds',
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_PAT'
                    )]) {
                        sh '''
                        git config user.name "Jenkins"
                        git config user.email "jenkins@local"

                        git add helm/backend/values.yaml helm/frontend/values.yaml
                        git diff --cached --quiet || git commit -m "ci: update image tags to ${BUILD_NUMBER}"

                        git push https://${GIT_USER}:${GIT_PAT}@://github.com HEAD:main
                        '''
                    }
                }
            }
        }

    }

    post {
        always { echo 'Pipeline Finished' }
        success { echo 'Pipeline Successful' }
        failure { echo 'Pipeline Failed' }
    }
}
