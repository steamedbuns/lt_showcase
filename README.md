# LT Showcase

## showcase_client.py
```
usage: showcase_client.py [-h] [-s] -k KEY_FILE [-o OUTPUT]

A command line tool to grab showcase albums and output the json results.

options:
  -h, --help                         show this help message and exit
  -s, --status-code                  Flag indicates perform a request and output response code.
  -k KEY_FILE, --key-file KEY_FILE   File containing the API key provided by showcase pdf.
  -o OUTPUT, --output OUTPUT         File to output the results.
```

## Angular Application

### Requirements

* NodeJs (LTS)
* npm
* Angular CLI

### Running locally

`npm install`

`ng serve`

### Github Pages

https://steamedbuns.github.io/lt_showcase

### Navigating the app

* Left click to enable flashlight.
* In the album view, use the drop down to select an album.
* In the all photos view, use the search box to filter by photo title.
