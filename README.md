portfolio-viewer
================

I decided to take the plunge and try out AngularJS. This is a small hacky portfolio viewer that shows a portfolio of items (defined in `api/projects.json`) that contains a realtime search form and pagination.

API
----------------
This demo runs on an API stored in `./api/`. This API requires both `node.js` and `mongodb` to be installed. The returned projects will be stored in a collection called `projects`. An example layout of this collection can be found in `./api/projects.json`