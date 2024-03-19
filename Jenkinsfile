podTemplate {
    // Define pod template
    node(POD_LABEL) {
        // Define the environment variables at the top if they are global
        environment {
            GIT_COMMIT_SHORT = sh(
              script: "printf \$(git rev-parse --short ${GIT_COMMIT})",
              returnStdout: true
            )
        }
        // Define tools if applicable, or handle tool installation differently within a pod
        tools {
            maven 'maven'
            jdk 'java'
        }

        stage('Run shell') {
            sh 'echo hello world'
        }

        stage('Build project') {
            steps {
              sh 'mvn install'
            }
        }

        stage('SonarQube analysis') {
            environment {
              SCANNER_HOME = tool 'Sonar-scanner'
            }
            steps {
                withSonarQubeEnv(credentialsId: 'sonar-credentialsId', installationName: 'Sonar') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner \
                    -Dsonar.projectKey=projectKey \
                    -Dsonar.projectName=projectName \
                    -Dsonar.sources=src/ \
                    -Dsonar.java.binaries=target/classes/ \
                    -Dsonar.exclusions=src/test/java/****/*.java \
                    -Dsonar.java.libraries=/var/lib/jenkins/.m2/**/*.jar \
                    -Dsonar.projectVersion=${BUILD_NUMBER}-${GIT_COMMIT_SHORT}'''
                }
            }
        }

        stage('SQuality Gate') {
            steps {
              timeout(time: 1, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
              }
            }
        }

        // Add more stages as needed
        stage('Another Stage') {
            sh 'echo another stage'
        }
    }
}
