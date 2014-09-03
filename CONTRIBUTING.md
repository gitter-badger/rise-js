Contributing to RiseJS
===

**Cloning repository**
Clone repository

```git clone https://github.com/ghaiklor/rise-js.git```

Switch to *dev* branch

```git checkout dev```

Install dev dependencies

```npm install```

Build
===
Run ```gulp build``` and make sure that all tests and validations are passed.

Change in *tasks/bump-version.js* type -> *prerelase* to type -> *patch* or anything else what you need.

Change version in *src/Rise.js* and don't forgot about semantic versioning. For example, ```0.0.3```.

Run again ```gulp build```.

Commit all changes to **dev** branch. Then checkout to **master** branch and merge dev into master.

Don't forgot about tagging master commit with appropriate tag version.

**IMPORTANT:** Make tags only for commits on master branch.

Then push all changes with ```git push -u origin --all``` and ```git push -u origin --tags```.

Checkout to *dev* branch and switch back in *tasks/bump-version.js* type -> *patch* to type -> *prerelase*. Bump version in *src/Rise.js*. And commit this changes to *dev* branch and push.

*Fill it...*