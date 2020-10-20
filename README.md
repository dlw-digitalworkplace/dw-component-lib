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
yarn release
```

OR:

Run the ["Release" GitHub action](https://github.com/dlw-digitalworkplace/dw-react-lib/actions?query=workflow%3ARelease)
