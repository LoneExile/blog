podTemplate {
    // This will automatically set the label to the name of the pod.
    // You can also explicitly set a label if you prefer.

    node(POD_LABEL) {

        stage('Run shell') {
            sh 'echo hello world'
        }

        // Add more stages as needed
        stage('Another Stage') {
            sh 'echo another stage'
        }
    }
}
