describe('My First Test', () => {
  it('add vaccine', () => {
    cy.visit('https://nadmin.ewarenet.com/')
    cy.get("#login").click();
    cy.get("#title1").click();
    cy.get("#add").click();
    cy.get("#name").type("atta1");
    cy.get("#special").click();
    cy.get("#submit").click();
    cy.wait(3000);
  });
  it('approve the doctor', () => {
    cy.visit('https://nadmin.ewarenet.com/')
    const selectedDate = '2023-08-19'; 
    // cy.contains('#container', 'Ready to create an app?')
    cy.get("#login").click();
    cy.get("#title").click();
    cy.get("#data").click();
    cy.get("#data1").type('16 Aug 2023');
    // cy.get('ion-popover').click('topLeft');
    // cy.get("#patient").click();
  });
});