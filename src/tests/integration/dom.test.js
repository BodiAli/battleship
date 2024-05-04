import Dom from "../../dom/dom-actions.js";

Dom.init();
describe.only("Dom tests", () => {
  test("test receiveAttack", () => {
    const mockObj = {
      receiveAttack: jest.fn(),
    };

    // Simulate attackOpponent function
    Dom.attackOpponent({
      target: {
        coord: { x: 1, y: 2 }, // Replace with appropriate coordinates
        isHit: false, // Adjust if needed based on your implementation
      },
      preventDefault: jest.fn(), // Mocking preventDefault
    });

    // Assert that receiveAttack is called with the correct arguments
    expect(mockObj.receiveAttack).toHaveBeenCalledWith(1, 2); // Adjust arguments based on your implementation
  });
});
