describe('Walkthrough all state transitions', () => {
  it('From UNKNOWN state, when site accessed, should load the home page', () => {
    cy.visit('/')
    cy.contains('Home works!')
  })
  
  it('From HOMESUCCESS state, when Products button clicked, should load Products List page', () => {
    cy.visit('/')
    cy.contains('Home works!')
    cy.get('button').contains('Products').click()
    cy.contains('List of Products')
    cy.contains('product_1')
    cy.contains('product_2')
  })
  it('From PRODUCTSSUCCESS state, when a product link clicked, should load product details of the product', () => {
    cy.visit('/')
    cy.contains('Home works!')
    cy.get('button').contains('Products').click()
    cy.contains('List of Products')
    cy.get('a').contains('product_1').click()
    cy.contains('Price: 11.11')
  })
  it('From PRODUCTSUCCESS state, when Back to Products button clicked, should load Products List page', () => {
    cy.visit('/')
    cy.contains('Home works!')
    cy.get('button').contains('Products').click()
    cy.contains('List of Products')
    cy.get('a').contains('product_1').click()
    cy.get('button').contains('Back to Products').click()
    cy.contains('List of Products')
  })
  it('From PRODUCTSUCCESS state, when Products menu button clicked, should load Products List page', () => {
    cy.visit('/')
    cy.contains('Home works!')
    cy.get('button').contains('Products').click()
    cy.contains('List of Products')
    cy.get('a').contains('product_1').click()
    cy.get('button').contains('Products').click()
    cy.contains('List of Products')
  })
  it('When UNKNOWN path like /bla entered, should display Page not Found message', () => {
    cy.visit('/bla')
    cy.contains('Page not found')
  })
  it('From PRODUCTSSUCCESS state, when browser Back button clicked, should stay in products list', () => {
    cy.visit('/')
    cy.contains('Home works!')
    cy.get('button').contains('Products').click()
    cy.contains('List of Products')
    cy.go('back')
    cy.contains('List of Products')
  })
  it('From UNKNOWN state, when intermediate path /products entered, should display Page not Found', () => {
    cy.visit('/products')
    cy.contains('Page not found')
  })
  it('From HOMESUCCESS state, when Admin button clicked, should load admin page', () => {
    cy.visit('/')
    cy.contains('Home works!')
    cy.get('button').contains('Admin').click()
    cy.contains('admin works!')
  })
})

