## DEPRECATED

As of 23th, May (2014) we have per-project `.npmrc` file support, please use that.

## npm registry switcher

Enables switching between the public and private repositories easily.

### Installation

```
npm install -g nrs
```

### Usage

####Shows the current registry being used

```
nrs current
```

#### Listing the added repositories

```
nrs list
```

#### Start using a repository

```
nrs use [alias]
```

#### Adding a repository

```
nrs add [alias] [url]
```

#### Deleting a repository

```
nrs rm [alias]
```

#### Restoring the original config

```
nrs restore
```

### Roadmap

#### v1 (done)
- easy switch between public mirrors
- add/remove new repository functionality

#### v2
- proper handling of private repositories

