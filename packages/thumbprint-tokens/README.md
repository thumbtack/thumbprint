# Thumbprint Tokens

> Design variables that power Thumbtack’s UI.

Thumbprint Tokens are published as JavaScript, SCSS, and Swift.

## API

### Token JSON files

All tokens live within a `tokens/*.json` file. Token files follow the following format:

```json
{
    "name": "Color",
    "description": "These are the colors we use at Thumbtack.",
    "tokens": [
        {
            "id": "blue",
            "description": {
                "ios": "Blue – #009fd9"
            },
            "value": {
                "web": "#009fd9",
                "ios": "UIColor = UIColor(red: 0.0, green: 0.62352943, blue: 0.8509804, alpha: 1.0)"
            },
            "type": "color"
        },
        {
            "id": "celebrate",
            "value": {
                "web": "#fbe002"
            },
            "type": "color",
            "deprecated": true
        }
    ]
}
```

### Token object specification

A single token can have the following fields:

#### `id`

`string`, _required_

Unique string used to generate the variable names

#### `name`

`string`, _required_

Human readable name for the token

#### `description`

`object`

Additional information about the token

#### `description.web`

`string`

#### `description.ios`

`string`

#### `value`

`object`, _required_

The value of the token in each platform that the token supports

##### `value.web`

`string` or `number`

##### `value.ios`

`string`

#### `type`

`string`

Used for generating the outputted files and displaying examples on [thumbprint.design/tokens](https://thumbprint.design/tokens/).

Valid values include:

-   `color`
-   `size`

#### `deprecated`

`bool`

Indicates that a token is deprecated in the documenation and source code
