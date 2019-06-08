/// <reference types="Cypress" />

describe('Homepage', () => {
  beforeEach(() => {
    cy.server()
    cy.route('https://api.flickr.com/services/rest/*').as('flickr')
    cy.visit('http://diego-codes.github.io/ascension-nasa-flickr/')
    cy.wait('@flickr')
  })

  it('loads more images when user scrolls to the bottom of the page', () => {
    cy.scrollTo('bottom')
    cy.wait('@flickr')
    cy.scrollTo('bottom')
    cy.wait('@flickr')
  })

  it('clicks through to a single image', () => {
    cy.get('.thumbnail').first().click()
    cy.hash().should('include', 'photo/')
  })

  it('searches for images when user types in value', () => {
    cy.get('#search_input').type('Colombia{enter}')
    cy.hash().should('include', 'q=Colombia')
    cy.wait('@flickr')
    cy.get('.thumbnail').first().click()
    cy.wait('@flickr')
    cy.get('.photo').contains('Colombia')
  })

  it('sorts images', () => {
    cy.get('.sort__input').select('title')
  })
})