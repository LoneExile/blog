podTemplate(containers: [
  containerTemplate(
    name: 'maven',
    image: 'maven:3.8.1-jdk-8',
    command: 'sleep',
    args: '30d'
  ),
  containerTemplate(
    name: 'python',
    image: 'python:latest',
    command: 'sleep',
    args: '30d')
]) {
    node(POD_LABEL) {
        stage('Run shell') {
            sh 'echo hello world'
        }
        stage('SCM') {
            checkout scm
        }

        stage('SonarQube Analysis') {
            script {
                try {
                    def scannerHome = tool 'sonar-scaner'
                    withSonarQubeEnv {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                } catch (Exception e) {
                    echo 'SonarQube Scanner not found'
                }
            }
        }

        stage('SonarQube Quality Gate') {
            waitForQualityGate abortPipeline: true
        // timeout(time: 1, unit: 'HOURS') {
        //     def qg = waitForQualityGate()
        //     if (qg.status != 'OK') {
        //         error "Pipeline aborted due to quality gate failure: ${qg.status}"
        //     }
        // }
        }

        // stage('SonarQube Quality Gate') {
        //     script {
        //         def qgStatus = 'NONE' // Initialize with NONE to start the loop
        //         int attempts = 0 // Initialize attempt counter
        //         int maxAttempts = 12 // Set the maximum number of attempts (e.g., 12 attempts)
        //         int sleepTime = 30 // Time to wait between each attempt in seconds (e.g., 30 seconds)

        //         // Loop until the Quality Gate status is OK, FAILED, or maxAttempts is reached
        //         while (qgStatus != 'OK' && qgStatus != 'ERROR' && attempts < maxAttempts) {
        //             attempts++
        //             echo "Checking Quality Gate status attempt ${attempts} of ${maxAttempts}"

        //             try {
        //                 def qg = waitForQualityGate(timeout: sleepTime, unit: 'SECONDS') // Wait for the Quality Gate status
        //                 qgStatus = qg.status
        //                 if (qgStatus == 'OK') {
        //                     echo 'Quality Gate passed'
        //                     break // Exit the loop if Quality Gate is OK
        //                 } else {
        //                     error "Pipeline aborted due to quality gate failure: ${qgStatus}"
        //                 }
        //             } catch (Exception e) {
        //                 echo "Waiting for next check (${sleepTime} seconds)... Error: ${e.getMessage()}"
        //                 sleep(time: sleepTime, unit: 'SECONDS') // Wait before the next attempt
        //             }
        //         }

        //         if (qgStatus != 'OK') {
        //             error "Quality Gate check failed or timed out after ${maxAttempts} attempts"
        //         }
        //     }
        // }

        // Add more stages as needed
        stage('Another Stage') {
            sh 'echo another stage'
        }
    }
}
