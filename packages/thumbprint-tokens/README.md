# Thumbprint Tokens

> Design variables that power Thumbtack’s UI.

Thumbprint Tokens are published as JavaScript and SCSS.

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
            "value": {
                "web": "#009fd9"
            },
            "type": "color"
        },
        {
            "id": "celebrate",
            "value": {
                "web": "#fbe002"
            },
            "type": "color",
            "deprecated": true,
            "description": "Use our new yellow color instead."
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

`string`, _required_

Additional information about the token

#### `value`

`object`, _required_

The value of the token in each platform that the token supports

##### `value.web`

`string` or `number`

#### `type`

`string`

Used for rich documentation on [thumbprint.design/tokens](https://thumbprint.design/tokens/).

Valid values include:

-   `color`

#### `deprecated`

`bool`

Indicates that a token is deprecated in the documenation and source code
