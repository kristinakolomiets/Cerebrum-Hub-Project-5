import TimeTracking from "../../pages/TimeTracking";
import { faker } from "@faker-js/faker";

describe("Time Tracking", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  const issueDetails = {
    title: "Time tracking",
    description: faker.lorem.words(15),
  };

  const estimation = "10";
  const estimation2 = "20";
  const expectedAmountIssues = "5";
  const spentTime = "2";
  const remainingTime = "5";

  it("Should Create Issue and Test Time Estimation and Time Logging Functionality: Add, Edit, Assert, and Remove", () => {
    TimeTracking.createIssue(issueDetails);
    TimeTracking.ensureIssueIsCreated(expectedAmountIssues, issueDetails);
    TimeTracking.addNewTime(estimation, issueDetails.title);
    TimeTracking.ensureNewTimeWasAdded(estimation, issueDetails.title);
    TimeTracking.editTime(estimation2, issueDetails.title);
    TimeTracking.ensureEditedTimeWasAdded(estimation2, issueDetails.title);
    TimeTracking.deleteTimeEstimation(issueDetails.title);
    TimeTracking.ensureTimeWasRemoved(issueDetails.title);
    TimeTracking.logTimeModal(spentTime, remainingTime);
    TimeTracking.ensureTimeWasLogged(
      spentTime,
      remainingTime,
      issueDetails.title
    );
    TimeTracking.removeLoggedTime();
    TimeTracking.ensureLoggedTimeRemoved(issueDetails.title);
  });
});
