import { faker } from "@faker-js/faker";

class CommentsFunc {
  constructor() {
    this.comment = faker.lorem.words(10);
    this.newComment = faker.lorem.words(5);
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.commentInput = 'textarea[placeholder="Add a comment..."]';
    this.commentContainer = '[data-testid="issue-comment"]';
    this.saveButton = 'button:contains("Save")';
    this.addingComment = "Add a comment...";
    this.editButton = "Edit";
    this.deleteConfirmation = '[data-testid="modal:confirm"]';
    this.confirmationButton = "Delete comment";
    this.deleteButton = "Delete";
  }

  getIssueDetailModal() {
    return cy.get(this.issueDetailModal);
  }

  addComment() {
    this.getIssueDetailModal().within(() => {
      cy.contains(this.addingComment).click();
      cy.get(this.commentInput).type(this.comment);
      cy.get(this.saveButton).click().should("not.exist");
      cy.contains(this.addingComment).should("exist");
      cy.get(this.commentContainer)
        .should("exist")
        .and("contain", this.comment);
    });
  }

  editComment() {
    this.getIssueDetailModal().within(() => {
      cy.get(this.commentContainer)
        .first()
        .contains(this.editButton)
        .click()
        .should("not.exist");

      cy.get(this.commentInput)
        .should("contain", this.comment)
        .clear()
        .type(this.newComment);

      cy.get(this.saveButton).click().should("not.exist");
      cy.get(this.commentContainer).should("contain", this.newComment);
    });
  }

  deleteComment() {
    this.getIssueDetailModal().within(() => {
      cy.get(this.commentContainer)
        .contains(this.newComment)
        .parent()
        .contains(this.deleteButton)
        .click();
    });
    cy.get(this.deleteConfirmation)
      .contains(this.confirmationButton)
      .click()
      .should("not.exist");

    this.getIssueDetailModal()
      .find(this.commentContainer)
      .should("not.contain", this.newComment);
  }
}

export default new CommentsFunc();
