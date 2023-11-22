# PF2e Companion

PF2e companion is a web application designed to simplify many aspects of the
Pathfinder second edition TTRPG. Currently, the feature set includes:

- Character builder (WIP)

# Running the application
1. Install docker and docker compose plugin
0. Clone the repo
0. Run `npm run dev`

## Processes
There are currently 3 development processes, which are managed with pm2:
- dashboard
- compendium-api
- db (mongodb docker container)

You can view logs by running `npx pm2 logs process_name`

# Project Structure

This project is a monorepo generated and managed using nx (https://nx.dev/). It uses libraries to optimize code sharing between projects. The libraries in this project follow the library guidelines of nx: https://nx.dev/concepts/more-concepts/library-types. Following the nx mental model, roughly 80% of the application logic is kept in libraries, while only 20% is kept in applications.

## e2e

This directory contains the end to end tests for each application. Currently, the only application covered by e2e testing is the dashboard.

## apps

This directory contains the runnable applications of the project:

### dashboard

A next.js frontend for organizing and executing the main feature set of the app. Runs on port 4200.

### compendium-api

A nest.js REST API which provides an interface for accessing pathfinder the 2e compendium (stored in a mongo database). Runs on port 3000.

## libs

This folder contains the libraries comprising the majority of the application functionality.

### character-builder

The functionality for the character builder feature, split into libraries for _data-access_, _ui_ and _feature_. The _feature_ library composes modules from the _ui_ and _data-access_ libraries with next.js functionality to create functional frontend pages.

### compendium-models

The data model definitions for the pathfinder 2e compendium. Written as a mongoose schema.

### ui-general

General react components such as navigation providers, custom MUI components, and theme definitions.

### ui-selection

React module containing a set of components which can be used together flexibly for implementing a selection from a set of options.

## tools

Various tools for automating development processes.

## types

Shared type definitions which are used between modules.
