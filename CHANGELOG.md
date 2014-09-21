Changelog
===

Edge version
---
- IDE changed to WebStorm;
- Optimized Rise.Class;
- All code checked with new configured JSHint and JSLint bundled with WebStorm;
- Moved from Should.js to Chai.js;

Version 0.0.5
---
- Small typo fixes in documentation;
- Fixes in gulp config -> sourceMap that maps resolved paths right to config;

Version 0.0.4
---
- Support for overriding default Gulp configuration object in tasks/local.json;
- Write contributing docs;
- Write basic README.md;
- Update licence to MIT;

Version 0.0.3
---
- Basic Rise.Element class;
- Rise.TextElement realized with basic features;
- Rise.addElement method that add to appropriate canvas created Element;
- Realize warning that shows when you apply Rise to more that one node at once;
- Rise.setConfig now applies many objects at once;
- getter and setter for parent/canvas nodes;
- getter and setter for canvas html;
- update method that recalculates common variables and properties;

Version 0.0.2
---
- Realize canvas prototype and basic functions in Rise instance;
- Realize get/set dimensions and config;
- Realize Rise.Math module;
- Fix gulp tasks dependency order;
- Travis CI configured;
- Basic documentation;
- Many small improvements, optimization and typo fixes;

Version 0.0.1
---
- Realize Rise.Class;
- Realize Rise.Color;
- Realize Rise.Font;
- Realize Rise.Logger;
- Realize Rise.Opacity;
- Realize Rise.RQuery;
- Realize Rise.Shadow;
- Realize Rise.Util;