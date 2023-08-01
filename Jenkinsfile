pipeline {
  agent any
    stages {
      stage("build") {
        steps {
          sh "echo 'build'"
          script {
            echo "Hello World"
          }
        }
      }
      stage("test") {
        steps {
          sh "echo 'test'"
        }
      }
      stage("deploy") {
        steps {
          sh "echo 'deploy'"
        }
      }
    }
}
