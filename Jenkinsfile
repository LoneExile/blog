// podTemplate {
//     // This will automatically set the label to the name of the pod.
//     // You can also explicitly set a label if you prefer.

//     node(POD_LABEL) {

//         stage('Run shell') {
//             sh 'echo hello world'
//         }

//         // Add more stages as needed
//         stage('Another Stage') {
//             sh 'echo another stage'
//         }
//     }
// }

  node(POD_LABEL) {
    environment {
      GIT_COMMIT_SHORT = sh(
        script: "printf \$(git rev-parse --short ${GIT_COMMIT})",
        returnStdout: true
      )
    }
    tools {
      maven 'maven'
      jdk 'java'
    }
    stages {
      stage('Build project') {
        steps {
          sh '''mvn install'''
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
    }
  }
