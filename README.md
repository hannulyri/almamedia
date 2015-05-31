# Almamedia

Simple Java Spring-Boot AngularJS Single-page application built on [JHipster Yeoman generator.](https://jhipster.github.io/)

### Installation

```shell
# Clone your GitHub repository
git clone https://github.com/hannulyri/almamedia.git

# Go to the memorygame directory
cd almamedia

# Install npm packages
npm install
```

```shell
# Run application with maven in developer mode
mvn spring-boot:run
```

You can run the application in production mode with `mvn -P prod spring-boot:run`

### Testing

Project has Protractor javavscript E2E-tests.

#### Protractor E2E-tests
```shell
# update webdriver-manager
node node_modules\protractor\bin\webdriver-manager update --standalone
```

**Then run the tests:**  
1. Open a console and run the project `mvn spring-boot:run`  
2. Open another console and start webdriver-manager `node node_modules\protractor\bin\webdriver-manager start`  
3. Open a third console and run the tests `grunt protractor`  

