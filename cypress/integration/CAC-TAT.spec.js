/// < reference types="cypress" />

describe('Central de atendimento ao cliente TAT', () => {
    
    beforeEach(() => {
        cy.visit('./cypress/src/index.html')
    });
    it('verifica o titulo da aplicação', () => {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    })
    it('preenche os campos obrigatorios e envia o formulario', () => {
        
        const longText = 'teste teste teste teste teste teste testevteste teste testeteste teste';

        cy.get('#firstName').type('jarbas')
        cy.get('#lastName').type('somonet')
        cy.get('#email').type('jarbaswssilva@gmail.com')
        cy.get('#phone').type('51995692832')
        cy.get('#open-text-area').type(longText, { delay:0})
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe uma mensagem de erro, email com formatação errado', () => {
       
        cy.get('#firstName').type('jarbas')
        cy.get('#lastName').type('somonet')
        cy.get('#email').type('jarbaswssilva@gmail,com')
        cy.get('#phone').type('51995692832')
        cy.get('#open-text-area').type('teste email errado')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('Campo telefone fica vazio se digitado valor nã0-numérico', () => {
        cy.get('#phone').type('abcdefgh').should('have.value', '')
        
    });

    it('exibe uma mensagem de erro quando o telefone é obrigatório ', () => {
        cy.get('#firstName').type('jarbas')
        cy.get('#lastName').type('somonet')
        cy.get('#email').type('jarbaswssilva@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste email errado')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('jarbas')
        .should('have.value', 'jarbas')
        .clear()
        .should('have.value', '')

        cy.get('#lastName').type('somonet')
        .should('have.value', 'somonet')
        .clear()
        .should('have.value', '')

        cy.get('#email').type('jarbaswssilva@gmail.com')
        .should('have.value', 'jarbaswssilva@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone').type('51995692832')
        .should('have.value', '51995692832')
        .clear()
        .should('have.value', '')
   
     });

     it('exibe mensagem de erro quando não digita e tenta logar', () => {
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
     });

     it('envia um formulario com sucesso usando o commands.js', () => {
         cy.fillMandatoryFieldsAndSubmit()
         cy.get('.success').should('be.visible')
         
     });
     it('envia um formulario com sucesso usando o commands.js passando os dados', () => {
         cy.fillMandatoryFieldsAndSubmit2('josé', 'rosa', 'jose@gmail.com', '51996784567')
         cy.get('.success').should('be.visible')
         
     });

     it('seleciona um produto pelo seu texto', () => {
         cy.get('#product')
         .select('YouTube')
         .should('have.value', 'youtube')
     });

     it('seleciona um produto pelo seu valor', () => {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
         
     });

     it('seleciona um produto pelo indice', () => {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog') 
     });

     it('marcar o atendimento tipo feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
     });

     it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio)=>{
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
     });

     it('marcar e desmarcar  inputs checkbox', () => {
         cy.get('input[type="checkbox"]')
         .check()
         .last()
         .uncheck()
         .should('not.be.checked')
     });

     it('exibe uma mensagem de erro quando o telefone é obrigatório usando o comando check', () => {
        cy.get('#firstName').type('jarbas')
        cy.get('#lastName').type('somonet')
        cy.get('#email').type('jarbaswssilva@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste email errado')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona uma fixtures para qual foi dado um alias', () => {
        cy.fixture('example.json').as('exampleFile')
        cy.get('input[type="file"]')
        .selectFile('@exampleFile')
        .should(($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
      
    });

    it('verifica se a politica de privacidade vai abrir em outra aba sem clicar', () => {
        cy.get('#privacy > a').should('have.attr','target','_blank')
    });

    it('acessa politica de privacidade em outra aba removendo o target e clicando no link', () => {
        cy.get('#privacy > a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing')
        .should('be.visible')
    });

   it('simulando viewport mobile', () => {
       
   });
   
   it('simulando viewport 410px por 860px, no package.json', () => {
       
   });
})