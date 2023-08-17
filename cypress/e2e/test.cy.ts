describe('My First Test', () => {
  it('add vaccine', () => {
    cy.visit('http://localhost:8100/')
    cy.get("#login").click();
    cy.get("#title1").click();
    cy.get("#add1").click();
    cy.get("#name").type("atta1");
    cy.get("#special").click();
    cy.get("#submit").click();
    cy.wait(3000);
  });
  it('approve the doctor', () => {
    cy.visit('http://localhost:8100/')
    const selectedDate = '2023-08-19'; 
    // cy.contains('#container', 'Ready to create an app?')
    cy.get("#login").click();
    cy.get("#title").click();
    cy.get("#data").click();
    cy.get("#data1").type('16 Aug 2023');
    // cy.get('ion-popover').click('topLeft');
    // cy.get("#patient").click();
  });
  // it('edit vaccine & delete', () => {
  //   cy.visit('http://localhost:8100/')
  //   cy.get("#login").click();
  //   cy.get("#title1").click();
  //   cy.wait(3000);
    // cy.get("#edit63").click();
    // cy.get("#name").type('{selectall}{backspace}');
    // cy.get("#special").click();
    // cy.get("#infinite").click();
    // cy.get("#name").type("atta3");
    // cy.get("#submit").click();
    // cy.get("#delete63").click();
    // cy.get('.custom').click();
    // cy.get("#doses63").click();
    // cy.wait(3000);
//     cy.visit("http://localhost:8100/members/vaccine/63/doses/add");
//     // cy.get("#add").click();
//     cy.get("#name").type("dose1");
//     // cy.contains('At Birth').click();
//     // cy.get('#select').click();
//     cy.get('ion-select[label="MinAge"]').click();

// // Assuming the options are displayed after clicking
// // Click on the desired option within the ion-select
// cy.get('ion-select-option').contains("4 Days").click({ force: true });


// // You can also close the ion-select after making a selection
// cy.get('ion-select[label="MinAge"]').click();

//     // Locate and click on the desired option by its content
//     // cy.get('ion-select-option').click('#two');

//     // Verify the selected option by checking the value or text
//     // cy.get('ion-select').should('contain.text', 'At Birth');

//     // // Click on the body to close the ion-select
//     // cy.get('body').click();
//     cy.wait(3000);
//     // Select the option by its value or label
//     cy.get('#submit').click();

    // cy.wait(3000);
  //   cy.get('#dosee129').click();
  // cy.get('ion-input').clear();
  // cy.get('body').click();
  // cy.get('ion-input').type("dose2");
  // cy.get('body').click();
  // cy.wait(3000);
  // cy.get('ion-button[type="submit"]').click();
  // cy.wait(3000);
  // cy.get('#dosed129').click();
    // cy.go(-1);
    // cy.go(-1);
    // cy.go(-1);
    
    // cy.get('ion-select[label="MinAge"]').click();
// cy.get('#brands63').click();
// cy.wait(3000);
// cy.pause(); // Pause the test execution for debugging
// cy.get('#add1').click({ force: true });
// cy.visit("http://localhost:8100/members/vaccine/63/brands/add");
// cy.get('ion-button[type="submit"]').should('be.disabled');

// // Fill in the form with valid input for some fields
// cy.get('ion-input').type('New Brand Name1');
// cy.get('body').click();
// cy.get('ion-button[type="submit"]').click();
// // Check if the submit button is still disabled
// // cy.get('ion-button[type="submit"]').should('be.disabled');
// it('should render with correct brand name', () => {
  // Make sure the component renders with the correct brand name
//   const brandName = 'Test Brand'; // Replace with the actual brand name
//   cy.contains(`b:contains("${brandName}")`).should('be.visible');
// // });

// it('should navigate to edit page on edit button click', () => {
  // Click on the edit button
  // cy.get('#brande152').click();
  // cy.get('ion-input').clear();
  // cy.get('body').click();
  // cy.get('ion-input').type("2");
  // cy.get('body').click();
  // cy.wait(3000);

  // // Submit the form
  // cy.get('ion-button[type="submit"]').click();
  // Check if the correct route is navigated to
  // cy.url().should('include', '/members/vaccine/VaccineId/brands/edit/BrandId');
// });

// it('should open delete confirmation popup on delete button click', () => {
  // Click on the delete button
  // cy.get('#brandd153').click();
  // // Assuming your component is rendered and confirmAlertOpen is true
  // cy.get('#confirm-button').should(($button) => {
  //   const isHidden = $button.css('display') === 'none';
  //   console.log('Is button hidden?', isHidden);
  // });

  // cy.get('#confirm-button', { force: true }).click();


  // Check if the delete confirmation popup is visible
  // cy.contains('Delete Brand').should('be.visible');
// });

// it('should close delete confirmation popup on cancel', () => {
  // Click on the delete button
  // cy.get('ion-button[aria-label="trash"]').click();

  // Click on the cancel button in the delete popup
  // cy.contains('Cancel').click();

  // // Check if the delete confirmation popup is closed
  // cy.contains('Delete Brand').should('not.exist');
// });
    // Use force: true to click the hidden ion-select-option
    // cy.get('ion-select-option[value="3"]').click({ force: true });

    // // Wait for the dropdown to close (you might need to adjust the wait time)
    // cy.wait(500);

    // // Assert that the selected value is what you expect
    // cy.get('ion-select[label="MinAge"]').should('have.value', '3');
    // cy.get("#four").click();
    
  // });

  it('should change the date of bulk date', () => {
    cy.visit('http://localhost:8100/members/schedule');
    cy.wait(5000);
    cy.get('#bulk').should('be.visible').click();

    // Select a specific date
    // cy.wait('@element');

    // Get the element.
  

    // Assert that the button's text is "3".
    cy.contains('3');
    
    // Close the date picker (if needed)
    cy.get('ion-datetime').click();
    cy.get('body').click();
//     cy.get('ion-datetime').should('be.visible').should('contain', '15').click();
// cy.get('#bulk').scrollIntoView().should('contain', '15').click();
//  // Wait for the element to be visible and contain the expected content
// // Assuming you have located the calendar icon within the popover
//      // Select the 15th day
// cy.get("body").click();
//     // Close the popover (if needed)
//     cy.get('ion-datetime').click();
  });
  it('should change the date of bulk date', () => {
    cy.visit('http://localhost:8100/members/schedule');
    cy.wait(5000);
    cy.get('#single').should('be.visible').click();

    // Select a specific date
    // cy.wait('@element');

    // Get the element.
  

    // Assert that the button's text is "3".
    cy.contains('3');
    
    // Close the date picker (if needed)
    cy.get('ion-datetime').click();
    cy.get('body').click();
//     cy.get('ion-datetime').should('be.visible').should('contain', '15').click();
// cy.get('#bulk').scrollIntoView().should('contain', '15').click();
//  // Wait for the element to be visible and contain the expected content
// // Assuming you have located the calendar icon within the popover
//      // Select the 15th day
// cy.get("body").click();
//     // Close the popover (if needed)
//     cy.get('ion-datetime').click();
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