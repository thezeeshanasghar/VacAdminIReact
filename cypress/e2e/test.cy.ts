describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('https://nadmin.ewarenet.com/')
    const selectedDate = '2023-08-19'; 
    // cy.contains('#container', 'Ready to create an app?')
    cy.get("#login").click();
    cy.get("#title").click();
    cy.get("#data").click();
    cy.get("#data1").type('2023-08-19');
    cy.get("#patient").click();
  });
});