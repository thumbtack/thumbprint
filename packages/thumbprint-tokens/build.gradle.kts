description = "Design variables that power Thumbtack’s UI."
version = "0.0.0"

plugins {
    // Apply the Kotlin JVM plugin to add support for Kotlin on the JVM.
    id("org.jetbrains.kotlin.jvm").version("1.3.31")
    id("com.moowork.node").version("1.3.1")
    `maven-publish`
}

node {
    // Set the work directory for Yarn
    // yarnWorkDir = file("${project.projectDir}/../../")
    nodeModulesDir = file("${project.projectDir}../../../")
    download = true
}

repositories {
    // Use jcenter for resolving dependencies.
    // You can declare any Maven/Ivy/file repository here.
    jcenter()

    maven {
        url = uri("https://jitpack.io")
    }
}

dependencies {
    // Use the Kotlin JDK 8 standard library.
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

    // Use the Kotlin test library.
    testImplementation("org.jetbrains.kotlin:kotlin-test")

    // Use the Kotlin JUnit integration.
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit")

    implementation("com.github.srs:gradle-node-plugin:1.3.1")
}


tasks.register<Jar>("tokensJar") {
    dependsOn("yarn")
    dependsOn("yarn_start")
    from("${projectDir}/dist/android/index.xml")
    into("res/values")
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            groupId = "com.github.thumbtack"
            artifact(tasks["tokensJar"])
        }
    }
}
