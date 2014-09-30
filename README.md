# metalsmith-text-replace

This is a plugin for [Metalsmith](http://metalsmith.io/) that allows globally
replacing text.

## Usage

This plugin matches files using the [minimatch pattern][minimatch] and applies
Javascript's [String.prototype.replace()][replace] on its contents. Parameters
are passed as defined, so you can provide regular expressions and functions as
well.

If using the CLI for Metalsmith, metalsmith-text-replace can be used like any 
other plugin by including it in `metalsmith.json`. For example:

```json
{
  "plugins": {
    "metalsmith-text-replace": {
      "**/**": {
        "find": "cat",
        "replace": "dog"
      }
    }
  }
}
```

*Note that when applied this way, only string can be passed as arguments.*

For Metalscript's JavaScript API, metalsmith-text-replace can be used like any 
other plugin, by attaching it to the function invocation chain on the 
Metalscript object. For example:

```js
var replace = require('metalsmith-text-replace');
require('metalsmith')(__dirname)
  .use(replace({
    '**/**': {
      find: /cat/gi,
      replace: "dog"
    }
  })
  .build();
```

You can also provide an array if you want to replace multiple strings in the
same match:

```js
var replace = require('metalsmith-text-replace');
require('metalsmith')(__dirname)
  .use(replace({
    '**/**': [
      {
        find: /cat/gi,
        replace: "dog"
      },
      {
        find: /foobar/g,
        replace: function(match) { return match.toUpperCase(); }
      }
    ]
  })
  .build();
```

## Options

You can pass additional options to minimatch using the `options` property.


## License

MIT, see [LICENSE](LICENSE).


[minimatch]: https://github.com/isaacs/minimatch
[replace]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace