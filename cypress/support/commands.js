// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const isOnTheRightOf = (_chai, utils) => {
  function assertIsOnTheRightOf(leftElement) {
    const rightElement = this._obj;
    this.assert(
      cy.$$(rightElement).offset().left >= cy.$$(leftElement).offset().left + cy.$$(leftElement).width(),
      'expected #{this} to be on the right of #{act}',
      'expected #{this} not to be on the right of #{act}',
      rightElement,
      leftElement,
    );
  }

  _chai.Assertion.addMethod('onTheRightOf', assertIsOnTheRightOf);
};

// registers our assertion function "isOnTheRightOf" with Chai
chai.use(isOnTheRightOf);

const isHorizontallyAlignedWith = (_chai, utils) => {
  function assertIsHorizontallyAlignedWith(leftElement) {
    const rightElement = this._obj;
    this.assert(
      cy.$$(rightElement).offset().top === cy.$$(leftElement).offset().top,
      'expected #{this} to be horizontally aligned with #{act}',
      'expected #{this} not to be horizontally aligned with #{act}',
      rightElement,
      leftElement,
    );
  }

  _chai.Assertion.addMethod('horizontallyAlignedWith', assertIsHorizontallyAlignedWith);
};

// registers our assertion function "isHorizontallyAlignedWith" with Chai
chai.use(isHorizontallyAlignedWith);

const isBelowOf = (_chai, utils) => {
  function assertIsBelowOf(element) {
    this.assert(
      cy.$$(this._obj).offset().top >= cy.$$(element).offset().top + cy.$$(element).height(),
      'expected #{this} to be below of #{act}',
      'expected #{this} not to be below of #{act}',
      this._obj,
      element,
    );
  }

  _chai.Assertion.addMethod('belowOf', assertIsBelowOf);
};

// registers our assertion function "isBelowOf" with Chai
chai.use(isBelowOf);
