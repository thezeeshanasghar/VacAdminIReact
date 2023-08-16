describe('My First Test', () => {
  // it('add vaccine', () => {
  //   cy.visit('https://nadmin.ewarenet.com/')
  //   cy.get("#login").click();
  //   cy.get("#title1").click();
  //   cy.get("#add").click();
  //   cy.get("#name").type("atta1");
  //   cy.get("#special").click();
  //   cy.get("#submit").click();
  //   cy.wait(3000);
  // });
  // it('approve the doctor', () => {
  //   cy.visit('https://nadmin.ewarenet.com/')
  //   const selectedDate = '2023-08-19'; 
  //   // cy.contains('#container', 'Ready to create an app?')
  //   cy.get("#login").click();
  //   cy.get("#title").click();
  //   cy.get("#data").click();
  //   cy.get("#data1").type('16 Aug 2023');
  //   // cy.get('ion-popover').click('topLeft');
  //   // cy.get("#patient").click();
  // });
  it('edit vaccine & delete', () => {
    cy.visit('http://localhost:8100/')
    cy.get("#login").click();
    cy.get("#title1").click();
    cy.wait(3000);
    // cy.get("#edit63").click();
    // cy.get("#name").type('{selectall}{backspace}');
    // cy.get("#special").click();
    // cy.get("#infinite").click();
    // cy.get("#name").type("atta3");
    // cy.get("#submit").click();
    // cy.get("#delete63").click();
    // cy.get('.custom').click();
    cy.get("#doses63").click();
    cy.wait(3000);
    // cy.get("#add").click();
    cy.get("#name").type("dose1");
    // cy.contains('At Birth').click();
    // cy.get('#select').click();
    cy.get('ion-select').click();

    // Locate and click on the desired option by its content
    // cy.get('ion-select-option').click('#two');

    // Verify the selected option by checking the value or text
    // cy.get('ion-select').should('contain.text', 'At Birth');

    // // Click on the body to close the ion-select
    // cy.get('body').click();
    cy.wait(3000);
    // Select the option by its value or label
    cy.get('#submit').click();
    cy.wait(3000);
    cy.go(-3)
    // cy.get('ion-select[label="MinAge"]').click();
cy.get('#brands63').click();
cy.wait(3000);
cy.get("#add").click();
cy.get("#name").type("dose1");
cy.get('#submit').click();
    // Use force: true to click the hidden ion-select-option
    // cy.get('ion-select-option[value="3"]').click({ force: true });

    // // Wait for the dropdown to close (you might need to adjust the wait time)
    // cy.wait(500);

    // // Assert that the selected value is what you expect
    // cy.get('ion-select[label="MinAge"]').should('have.value', '3');
    // cy.get("#four").click();
  });
  // it('delete vaccine', () => {
  //   // cy.visit('http://localhost:8100/')
  //   // cy.get("#login").click();
  //   // cy.get("#title1").click();
  //   // cy.wait(3000);
  //   cy.get("#delete63").click();
  //   // cy.get("#name").type('{selectall}{backspace}');
  //   // cy.get("#special").click();
  //   // cy.get("#infinite").click();
  //   // cy.get("#name").type("atta3");
  //   // cy.get("#submit").click();
  // });
});