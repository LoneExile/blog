podTemplate {
  // Define pod template
  node(POD_LABEL) {
    stage('Setup Environment') {
      steps {
        // Example of setting up tools manually if they are not included in your container image
        sh '''
          if ! type mvn > /dev/null; then
          echo "Maven not found, installing..."
          # Install Maven command here
          fi
          if ! type java > /dev/null; then
          echo "JDK not found, installing..."
          # Install JDK command here
          fi
          # Ensure SonarScanner is setup or install it
          '''
      }
    }

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

    // stage('Build project') {
    //   steps {
    //     sh 'mvn install'
    //   }
    // }

    // stage('SonarQube analysis') {
    //   environment {
    //     SCANNER_HOME = tool 'Sonar-scanner'
    //   }
    //   steps {
    //     withSonarQubeEnv(credentialsId: 'sonar-credentialsId', installationName: 'Sonar') {
    //       sh '''$SCANNER_HOME/bin/sonar-scanner \
    //         -Dsonar.projectKey=projectKey \
    //         -Dsonar.projectName=projectName \
    //         -Dsonar.sources=src/ \
    //         -Dsonar.java.binaries=target/classes/ \
    //         -Dsonar.exclusions=src/test/java/****/*.java \
    //         -Dsonar.java.libraries=/var/lib/jenkins/.m2/**/*.jar \
    //         -Dsonar.projectVersion=${BUILD_NUMBER}-${GIT_COMMIT_SHORT}'''
    //     }
    //   }
    // }

    // stage('SQuality Gate') {
    //   steps {
    //     timeout(time: 1, unit: 'MINUTES') {
    //       waitForQualityGate abortPipeline: true
    //     }
    //   }
    // }

    // Add more stages as needed
    stage('Another Stage') {
      sh 'echo another stage'
    }
  }
}
