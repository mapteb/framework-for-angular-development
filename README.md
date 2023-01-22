# A Framework for Angular Development

This project presents a testing-friendly TypeScipt framework for Angular development.

The fraework has the following features:

1. Implements the smart/presentational component UI pttern
1. Simplifies creating unit test and e2e test scripts.
2. Browser back button navigation and bookmarked intermediate application URL navigation are disabled by default but can be supported when needed.

The development workflow to use this component in an Angular project are:

1. Configure all the supported view transitions in [state-transitions.config.ts](https://github.com/mapteb/smart-component-for-angular-projects/blob/main/src/app/state-transitions-config/state-transitions.config.ts)
2. Add one process function for each view (like [product.process.ts](https://github.com/mapteb/smart-component-for-angular-projects/blob/main/src/app/product/product/product.process.ts), [products.process.ts](https://github.com/mapteb/smart-component-for-angular-projects/blob/main/src/app/product/products/products.process.ts) etc.)
3. Add view components and extend them from the smart component ([base.component.ts](https://github.com/mapteb/smart-component-for-angular-projects/blob/main/src/app/base/base.component.ts))

Usage of this framework for a small project can be viewed in [StackBlitz](https://stackblitz.com/edit/angular-ivy-glvqom?file=README.md)

A demo of the running application can be viewed [here](https://mapteb.github.io/smart-component-for-angular-projects/home).

Unit tests can be run using the "ng test" command and e2e integration tests can be run using the command "ng e2e".