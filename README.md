# Component challenge with handlebars

This is a handlebars helper based approach. So there is no interoperability with non JS environments (since helpers are written in JS).

We are using helper specific partials for HTML generation instead of String based generation. 

## Usage

* `npm install`
* `node app.js`
* Open http://localhost:3000

## Notes

* Composition of components is given
* Named blocks:
  * Solved via `{{#*inline...}`
  * No unnamed HTML blocks (as required for List component)

* Missing support for template based data structure generation (variables) leads to requirement of helpers
* No implicit state, even in helpers (see MagicHeaders)
