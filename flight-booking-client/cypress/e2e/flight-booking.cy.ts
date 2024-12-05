describe('Flight Booking E2E Tests', () => {
  it('should load the homepage', () => {
    cy.visit('http://localhost:4200'); // ה
    cy.contains('Search Flights'); // ב
  });

  it('should search for flights', () => {
    cy.visit('http://localhost:4200'); // החלף בכתובת של הפרויקט שלך
    cy.get('input[name="departure"]').type('Tel Aviv');
    cy.get('input[name="destination"]').type('London');
    cy.get('button[type="submit"]').click();
    cy.contains('Available Flights'); // בדוק שהחיפוש הוביל לתוצאה
  });

  it('should book a flight', () => {
    cy.visit('http://localhost:4200'); // החלף בכתובת של הפרויקט שלך
    cy.get('.flight-card').first().click(); // לחץ על טיסה
    cy.get('button.book-flight').click(); // לחץ על כפתור הזמנה
    cy.contains('Booking Confirmed'); // בדוק שההזמנה אושרה
  });
});
