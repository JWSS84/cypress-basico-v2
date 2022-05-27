Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    
    cy.get('#firstName').type('jarbas')
    cy.get('#lastName').type('somonet')
    cy.get('#email').type('jarbaswssilva@gmail.com')
    cy.get('#phone').type('51995692832')
    cy.get('#open-text-area').type('teste commands')
    cy.get('button[type="submit"]').click()

    

})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', (firstName,lastName,email,phone) => {
    
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#phone').type(phone)
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    

})