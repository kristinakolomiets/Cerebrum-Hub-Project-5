import CommentsFunc from "../../pages/CommentsFunc";

describe("Issue comments creating, editing and deleting - POM", () => {
  const issueTitle = "This is an issue of type: Task.";

  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains(issueTitle).click();
      });
  });

  it("Assigment 1: Should create, edit and delete comment by automated solution", () => {
    CommentsFunc.addComment();
    CommentsFunc.editComment();
    CommentsFunc.deleteComment();
  });
});
