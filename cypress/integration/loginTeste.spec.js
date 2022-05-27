describe('Login', () => {
    it('logar com sucesso', () => {
      cy.visit('https://multicalculo.net/ang/#/login')
  
      cy.get('[name=usuario]')
        .type(Cypress.env('usuario'))
      cy.get('[name=senha]')
        .type(Cypress.env('senha'))
        cy.get('[name=btn-login]').click()
  
      
    })
  })