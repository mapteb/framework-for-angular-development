## A Framework for Angular Development

This project has a tiny TypeScipt framework for Angular development. The framework enables simple Angular development and testing.

### Development Workflow

The framework suggests the following steps:

1. Write the requirements as a set of view transitions, (See the header comments in state-transitions.config.ts)
2. Configure the transitions in a Typescript const variable, (See state-transitions.config.ts)
3. Create Typescript functions that pre-fetch data for each view, (See product.process.ts)
4. A smart component uses the above configuration to manage various view transitions. (See, for example, base.component.ts)

A sample implementation of the above steps for a simple SPA with views like HOMEVIEW, PRODUCTVIEW and PRODUCTSVIEW can be viewed at StackBlitz. 

### Unit Testing

The framework enables writing unit testing scripts quickly. (See test-state-transitions.spec.ts)

The unit test script can be run using the command - ng test

### e2e Testing

The framework also enables writing e2e scripts quickly. (See cypress-integration-tests.spec.ts)

The integration test script can be run using the command - ng e2e

### Extending the Sample SPA

An extended version of the sample SPA with authentication and authorization is in the main branch of this project.