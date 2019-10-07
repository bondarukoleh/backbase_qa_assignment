# Backbase QA assignment.

***
### Environment.
#### Node.js
You need Node.js to be installed. Version should be **not lower 8**.
Checkout [Node install](https://nodejs.org/uk/download/ "https://nodejs.org/uk/download/") to install node.
To check that Node installed correctly run from your terminal:
`node --version`

#### Browser
You need Chrome to be installed. It's a most common browser in the world, so I hope you have it.
Version should be **not lower 75**. You can check it in Browser settings -> Help -> About Google Chrome.

#### Java (Optional)
As main reporter - Allure is used. To run the report - you'll need Java to be installed.
Checkout [Java install](https://www.oracle.com/technetwork/java/javase/downloads/index.html "https://www.oracle.com/technetwork/java/javase/downloads/index.html") to install JDK (or JRE if you prefer).

***
### How to run tests?
#### Clone repository.
Run in terminal: 
`git clone https://github.com/bondarukoleh/backbase_qa_assignment.git`

#### Change directory to cloned project directory.
Run in terminal:
`cd backbase_qa_assignment`

#### Install project dependencies.
Run in terminal:
`npm install`

#### Run the tests.
Run in terminal:
`npm test`

#### Run the report.
Run in terminal:
`npm run report`

***
#### Troubleshoot:

##### Tests didn't run.
If tests didn't run, after `npm test`, probably something goes wrong with selenium server.
Try to run tests without it.
Run in terminal:
`npm run test:direct`

If still no result - you have Chrome not 75th version - it's easy to update it.

##### Report didn't run.
If `npm run report` didn't work you can open it with VSCode or WebStorm or any IDE that supports "live server". Just open with "live server" your_path/backbase_qa_assignment/allure-report/index.html in your IDE. It will run server to show the report in browser.

***
### About test framework.
Test framework built with Page Object pattern. Means we logically group functionality of the application by pages.
Pages divided on Fragments - logically grouped elements. Elements - is abstraction above regular HTML
elements: buttons, inputs, selects, etc.

To create a page - which will represent some page from the application - we need to understand on what logical
fragments we can divide it, and from what elements these fragments will be build.

We can scale fragments to be built from other fragments and so on.

Elements can be reused in fragments and pages, fragments can be reused in pages - which gives us flexibility,
if something changed in element (e.g. in Button), we need to fix it only in one place.

If we have two elements same type (e.g. two Buttons) but with different realization - we can group common
stuff in BasicElement (e.g. BasicButton) and inherit from it two SpecificElements for our purpose.

Basic scheme of page:
```js
+-----------------------------------------------+
| Page     +---------------+  +---------------+ |
|          |  Fragment_1   |  |  Fragment_2   | |
|          |               |  |               | |
|          |  +---------+  |  |  +---------+  | |
|          |  | element |  |  |  | element |  | |
|          |  +---------+  |  |  +---------+  | |
|          |               |  |               | |
|          |  +---------+  |  |  +---------+  | |     
|          |  | element |  |  |  | element |  | |
|          |  +---------+  |  |  +---------+  | |
|          +---------------+  +---------------+ |
|             +---------+        +---------+    |
|             | element |        | element |    |
|             +---------+        +---------+    |
+-----------------------------------------------+
```
***
### About tools
**Protractor** - is test framework specially created for Angular apps, but we can use it to test any WEB UI, it has a lot of stuff that helps QA to test web application.
You can checkout it [here.](https://www.protractortest.org/#/ "https://www.protractortest.org/#/")

**Mocha** - powerful, flexible, simple, easy-to-use test run library.
You can checkout it [here.](https://mochajs.org/ "https://mochajs.org/")

**Chai**- great, wide-functional assertion library.
You can checkout it [here.](https://www.chaijs.com/api/ "https://www.chaijs.com/api/")

**Allure** - nice, easy-to-use, fast, powerful reporter.
You can checkout it [here.](https://docs.qameta.io/allure/ "https://docs.qameta.io/allure/")
***
##### About scripts
There are several scripts to run tests in different way.
`npm run test:debug` - to run tests with results in terminal. It won't involve allure reporter, and will print test results in your terminal - you can easily understand what's going wrong.
`npm run test:direct` - to run tests without selenium server, directly sending requests to the browser driver.
`npm run lint` - to run code linter, to check that you have not done any obvious mistakes and code style is ok.
