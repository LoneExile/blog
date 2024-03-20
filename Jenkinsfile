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
            timeout(time: 1, unit: 'HOURS') {
                def qg = waitForQualityGate()
                if (qg.status != 'OK') {
                    error "Pipeline aborted due to quality gate failure: ${qg.status}"
                }
            }
        }

        // Add more stages as needed
        stage('Another Stage') {
            sh 'echo another stage'
        }
    }
}
