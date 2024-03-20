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
        // def scannerHome = tool 'sonar-scaner'
        // withSonarQubeEnv {
        //     sh "${scannerHome}/bin/sonar-scanner"
        // }
        }

        // Add more stages as needed
        stage('Another Stage') {
            sh 'echo another stage'
        }

    // SonarQube analysis stage
    // stage('SonarQube analysis') {
    //   withSonarQubeEnv('sonar-scaner') { // Replace 'Your_SonarQube_Server_Name' with the name of the SonarQube server configured in Jenkins
    //     sh 'mvn clean verify sonar:sonar -Dsonar.projectKey=Your_Project_Key -Dsonar.host.url=Your_SonarQube_URL -Dsonar.login=Your_SonarQube_Token'
    //   }
    // }
    }
}

