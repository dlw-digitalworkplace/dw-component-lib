# Digital Workplace React Library

This repository contains reusable components and utilities for React development.

# Contributing

## Prerequisites

Make sure `yarn` is installed. If not: `npm install --global yarn`.

## Installing the code

- Clone the repository
- Install the code:
  ```
  yarn install
  ```

## Running the code

```
yarn start
```

## Contribute

- Make some changes to the code (and make sure it builds)
- Create a **changeFile** describing the changes:
  ```
  yarn change
  ```
- Create your PR

## Maintainers

To update packages, run:

```bash
# get the latest code
git checkout master
git pull

# update package versions
yarn beachball:publish

# OR: update package versions without publishing to NPM
# for more options check https://microsoft.github.io/beachball/cli/options.html
yarn beachball:publish --no-publish
```
