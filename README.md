# A Framework for Angular Development

This project presents a testing-friendly TypeScipt framework for Angular development. 

The framework has the following features:

1. A new design for the smart/presentational component UI pttern
2. Simplifies creating unit test and e2e test scripts.
3. Browser back button navigation and bookmarking intermediate application URLs is disallowed by default but can be supported when needed.

The development workflow to use this framework in an Angular project are:

1. Identify the state transitions the SPA supports. See the header comments in [state-transitions.config.ts](https://github.com/mapteb/framework-for-angular-development/blob/main/src/app/state-transitions-config/state-transitions.config.ts)
2. Configure all the supported state transitions. See [state-transitions.config.ts](https://github.com/mapteb/framework-for-angular-development/blob/main/src/app/state-transitions-config/state-transitions.config.ts)
3. Add one process function for each transition (See [product.process.ts](https://github.com/mapteb/framework-for-angular-development/blob/main/src/app/product/product/product.process.ts), [products.process.ts](https://github.com/mapteb/framework-for-angular-development/blob/main/src/app/product/products/products.process.ts) etc.)
4. Add view components and extend them from the smart component ([base.component.ts](https://github.com/mapteb/framework-for-angular-development/blob/main/src/app/base/base.component.ts))

Usage of this framework for a small SPA can be viewed in [StackBlitz](https://stackblitz.com/edit/angular-ivy-by5htr?file=NOTES.TXT)

Usage of  the framework for a starter example is in the [branch](https://github.com/mapteb/framework-for-angular-development/tree/starter-example)


Unit tests can be run using the "ng test" command and e2e integration tests can be run using the command "ng e2e" (requires "npm install cyress -g" to be run first).