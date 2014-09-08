Contributing to RiseJS
===
At this page we explain how you can contribute to our project.

Branch explanation
---
RiseJS repository have two main branches:

1. [master](https://github.com/ghaiklor/rise-js/tree/master "Master Branch")
2. [dev](https://github.com/ghaiklor/rise-js/tree/dev "Development Branch")

All stable releases will merge into `master` branch. So if you want get and use last stable release ready for production - use `master` branch.

But, of course, you can use edge version of RiseJS and check out our latest features. They are may be unstable and not tested, so they are not ready for production. All those changes and features will merge into `dev` branch.

Other branches it's only helper branches which can close at any time. In general we have 3 types of branches:

- Feature branches;
- Release branches;
- Hotfix branches;

Advanced description you will read below in "Git workflow" section.

Git workflow
---
We are using git workflow, which are nice described [here in Russian](http://habrahabr.ru/post/106912/ "Thanks to Андрей Хитрин aka zloddey") and [here in English](http://nvie.com/posts/a-successful-git-branching-model/ "Thanks to Vincent Driessen").

In general, we are using `master` branch for stable releases (and ONLY stable releases) and `dev` branch for development purposes.

### Feature/bug branches

Let's say you want realize new feature or fix something. You **MUST** checkout to new branch from `dev` branch. Created branch **MUST** have name that begins with **feature-...** or **bug-...** This name conventions simplify work with many branches and we can got what exactly each branch doing. When you finish with branch, manually merge feature-branch into `dev`).

```shell
git checkout dev # Checkout to dev branch
git pull # Update dev branch changes

git checkout -b feature-awesome # Create new feature branch
git commit -am "Commit 1" # Commit changes
git commit -am "Commit 2" # Last commit

git checkout dev # Switch back to dev branch
git pull # Update last changes in dev

git merge --no-ff feature-awesome # Merge your changes into dev branch

git branch -d feature-awesome # And you can delete old branch
git push -u origin dev # Push changes to origin server
```

**_Note_**: If you dont have rights for push\merge into `dev`, create pull request and we accept it ourselves.

### Release branches

When we decide that `dev` branch is ready for release, we are create new branch with **release-...** prefix. In this branch we update metadata and fix **ONLY** bugs. When release branch will proceed all last checks and tests, we merge release branch into `master` and `dev`. And add tag in `master` branch with appropriate release version.

```shell
git checkout dev # Switch to development branch
git pull # Get last changes

git checkout -b release-1.2.0 # Create new release branch

gulp build # Run build process
git commit -am "Release version v1.2.0" # Commit changes into release branch
git commit -am "Allows make small changes" # Maybe small changes

git checkout master # Switch to master branch
git merge --no-ff release-1.2.0 # Merge release branch into master
git tag -a "v1.2.0" # Add a tag to release commit in master branch

git checkout dev # Switch to dev branch
git merge --no-ff release-1.2.0 # Merge release changes to dev branch

git branch -d release-1.2.0 # Remove unused release branch

git push -u origin --all # And push all to origin server
git push -u origin --tags # With tags too
```

### Hotfix branches

When some seriously error or bug occurs into stable release (`master`) we make hotfix branch. Hotfix branch **MUST** begins with **hotfix-...** prefix. After fixes we merge hotfix branch into `master` and `dev`. Also increment patch version and publish this hotfix as new version of RiseJS.

```shell
git checkout master # Switch to master branch
git checkout -b hotfix-1.2.1 # Create new hotfix branch

git commit -am "Fix for something" # Critical bugs fixes
gulp build # Run build system
git commit -am "Bumped version and build" # Last commit

git checkout master # Switch back to master branch
git merge --no-ff hotfix-1.2.1 # Merge hotfix branch
git tag -a "v1.2.1" # Add tag to this commit

git checkout dev # Switch to dev branch
git merge --no-ff hotfix-1.2.1 # Apply fixes to dev branch too

git branch -d hotfix-1.2.1 # Remove hotfix branch
git push -u origin --all # Push all changes to origin server
git push -u origin --tags # And push tags to origin server
```

Get the project
---

### Clone repository
Clone repository to your computer.

```shell
git clone https://github.com/ghaiklor/rise-js.git # via HTTPS
git clone git@github.com:ghaiklor/rise-js.git # via SSH
```

### Install dependencies
We are using `npm` for manage dependencies. So all development dependencies is declared into `package.json` and you can install it simply call `npm install`.

```shell
cd rise-js
npm install
```

### Run RiseJS locally
You can create virtual host that points to your project folder and will open `index.html`. Or you can just open `index.html` as file in your browser.

**_Note_**: if you will get error that assets not found, check relative URLs in `tasks/local.json` (more about it in Gulp section) and run `gulp linker-dev`. This task will inject assets URL into `index.html` relative to your current location.

Project structure
---
`dist/` - here located last build. Concat file, minified file and source maps.

`src/` - source files of RiseJS.

`tasks/` - tasks for Gulp runner. Each task divided into different files and automatically loads when Gulp is running.

`tests/` - test cases for RiseJS. Folder structure similar to `src/` folder. Each test case located in file that corresponds to `src/` structure.

Gulp tasks
---
Each task that can be done with Gulp writed and located under `tasks/` folder.

When Gulp is running, it's automatically require all files `*.js` located under this folder and execute them.

### Add new Gulp task
When you decide to add new task it's not a problem.

Each file under `tasks` folder **MUST** have `.js` extension. Your js-file must exports function with 2 arguments: gulp and gulp config objects.

For example, simple task will looks like this:

```javascript
// tasks/my-new-task.js
var path = require('path'),
    gulpModule = require('gulpModule');

module.exports = function(gulp, config) {
    gulp.task('my-new-task', function() {
        return gulp.src(config.sourceMap).pipe(gulpModule()).pipe(gulp.dest('./'));
        // And so on
    });
};
```

### Gulp configuration

Default Gulp configuration is located in `gulpfile.js`. **DON'T** change this file until you really need do something here. If you want override default configuration, you **MUST** use `tasks/local.json`.

In default Gulp configuration we are set appRoot folder, source dependency order, type of bump version and more. In general, defaults Gulp configuration enough for start development right from box.

But if for some reasons you need override default configuration - create `tasks/local.json` file. This file is excluded from git, so you can not worry about conflicts in configuration files and don't need modify `gulpfile.js`.

For example, you have problem that `appRoot` variable for linker tasks differents in different environments. So, in the result, you will got always conflicting relative URLs in `index.html` and `run-tests.html` on making commit.

How fix that? Just create `tasks/local.json` file and set `appRoot` property to fit your needs. If you store your project at `/srv/http/rise-js/` then set `appRoot` in your local config to `srv/http/rise-js`.

I'm using also Windows sometimes and always had problems with URLs. So I create `local.json` file that resolves the problem.

```javascript
{
    "appRoot": "C:/Users/ghaiklor/Documents/GitHub/rise-js/"
}
```

### List of tasks

At the moment of writing this article, we had create this tasks:

- `gulp build-js` - Run concatenating and minifying source files into `dist/` and create source maps for build.

- `gulp build` - Wrapper for `clean`, `run-validation`, `run-tests`, `bump-version` and `build-js` tasks.

- `gulp bump-version` - Bump version in `package.json`.

- `gulp clean` - Cleans `dist/` folder from old build.

- `gulp` or `gulp default` - Default task. Wrapper for `linker-dev` and `watch` tasks.

- `gulp linker-dev` - Link all source files to `index.html`.

- `gulp run-tests` - Link all test cases from `tests/` into `run-tests.html` and run tests.

- `gulp run-validation` - Run jshint validation for all files located under `src/` folder.

- `gulp watch` - Start watching for all source files and triggers livereload when changes was saved.

Tests
---
We are using Mocha and PhantomJS for testing RiseJS. All test cases located into `tests` folder and splitted like source files splitted. For every file in `src/` folder we create appropriate in `tests/` folder.

When you create new feature or fix some bug, you **MUST** write test case for it in `tests` folder. For example, you add new feature to `src/Rise.js`. After that you need modify `tests/Rise.js` for corresponds to new feature.

For run tests just call `gulp run-tests`.

**_Note_**: `gulp run-tests` task included into `gulp build` task.

Versions
---
We are using "Semantic Versioning". You can find rules how to use it [here](http://semver.org/).

In general, 4 types of version exists:

1. Pre-release -> `v1.2.3-4`. Pre-release changes only builds number after `-`. I.e `v1.2.3-4` -> `v1.2.3-5`.

2. Patch -> `v1.2.3`. Patch version changes only patch version at the end and remove builds number. I.e. `v1.2.3-5` -> `v1.2.3` -> `v1.2.4`.

3. Minor -> `v1.3.0`. Minor version changes second number in version and reset patch version and prerelease version. I.e. `v1.2.4` -> `v1.3.0`.

4. Major -> `v2.0.0`. Major version changes first number in version and reset all other versions. I.e. `v1.3.0` -> `v2.0.0`.

Build
---
When you ready to create new build, make sure that this steps will be executed.

Change in `tasks/local.js` property `bumpVersionType` to `patch` or anything else what you need.

Available types for versions: `prerelease`, `patch`, `minor`, `major`.

Change version in `src/Rise.js` and don't forgot about semantic versioning.

Run `gulp build`.

When build process is launching, 5 tasks is execute:

1. Clean `dist/` folder from last build.

2. Run code validation for all files located under `src/**/*.js` with `jshint`.

3. Bumps version to appropriate in `package.json`.

4. Concatenate, minify, create source map and put those to `dist/` folder.

5. Inject new build into `run-tests.html` and launch tests.

If all tasks successfully executed, new build will be available into `dist/` folder.