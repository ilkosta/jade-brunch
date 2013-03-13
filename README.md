## jade-brunch
Adds [Jade](http://jade-lang.com) support to
[brunch](http://brunch.io).

## Usage
Add `"jade-brunch": "x.y.z"` to `package.json` of your brunch app.

Pick a plugin version that corresponds to your minor (y) brunch version.

If you want to use git version of plugin, add
`"jade-brunch": "git+ssh://git@github.com:brunch/jade-brunch.git"`.

Config example:
```coffeescript
  plugins:
    jade:
      options:          # can be added all the supported jade options
        pretty: yes     # Adds pretty-indentation whitespaces to output (false by default)
        compiler: funny # Compiler to replace jade's default
                        # ...
```

but is supported this configuration too (for backwards compatibility):
```coffeescript
  plugins:
    jade:
      pretty: yes # Adds pretty-indentation whitespaces to output (false by default)
```