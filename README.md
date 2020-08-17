# WsProductUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Development server

Run `ng serve --host 0.0.0.0` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Problems

### 1. server-side rate-limiting
Found here: https://github.com/wesley-crick/ws-product-nodejs

### 2a - Front-end Track

Build UI components that leverages the API server from problem 1 to solve problems below.

#### A. client-side general chart visualizations

Implement one or more types of charts that can be used to effectively visualize data supplied from the API endpoints. Users should be able to pick different metrics to visualize and compare with others.

#### B. client-side data table

Implement a functional data table that can be used to browse through data supplied from the API endpoints. The data table should allow users to fuzzy search on meaningful values (such as POI names), and matching rows should be highlighted.

#### C. client-side geo visualizations

Implement a functional map-based data visualization based on different POI-bound metrics. Users should be able to select different metrics and be able to distinguish each metrics' intensity of different POIs. The map should also allow a certain degree of flexibility for users to zoom in and out, and allow users to see a "clustered" indicator when more than one POIs are too close to each other at the given zoom level.

You will likely need to implement data join between the POIs and other datasets.
