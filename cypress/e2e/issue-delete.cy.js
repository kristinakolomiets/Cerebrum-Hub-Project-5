describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Assigment 3: Test Case 1 - Issue Deletion", () => {
    getIssueDetailsViewModal().within(() => {
      cy.get('[data-testid="icon:trash"]').click();
    });
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.get("button").contains("Delete issue").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.contains("This is an issue of type: Task.").should("not.exist");
  });

  it("Assigment 3: Test Case 2 - Issue Deletion Cancellation", () => {
    getIssueDetailsViewModal().within(() => {
      cy.get('[data-testid="icon:trash"]').click();
    });
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.get("button").contains("Cancel").click();
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");

    getIssueDetailsViewModal().within(() => {
      cy.get('[data-testid="icon:close"]').first().click();
    });
    cy.contains("This is an issue of type: Task.").should("be.visible");
  });
});

const getIssueDetailsViewModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
