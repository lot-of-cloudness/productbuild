# Blueprint for MBTI Test Application

## Overview
This application is an interactive MBTI test, designed to determine a user's MBTI type through a series of 12 questions. It features a responsive design, theme toggling (light/dark mode), and a progress bar for the test. Additionally, a partnership inquiry form using Formspree has been integrated.

## Project Outline

### Initial Version (MBTI Test)
*   **Application Type:** Web application (HTML, CSS, JavaScript)
*   **Core Functionality:**
    *   Start screen with a brief introduction.
    *   Question screen displaying one question at a time with two answer choices.
    *   Progress bar indicating test completion.
    *   Result screen displaying the calculated MBTI type and a description.
    *   Ability to retry the test.
*   **Styling & Design:**
    *   Modern, clean design with a focus on readability.
    *   Themed (light/dark mode) using CSS variables.
    *   Responsive layout for various screen sizes.
*   **Technologies Used:**
    *   HTML5
    *   CSS3 (with CSS variables for theming)
    *   JavaScript (ES Modules not explicitly used, but modern syntax)

### Current Version (with Formspree Contact Form)
*   **New Feature:** Integrated a simple partnership inquiry contact form.
*   **Form Details:**
    *   Uses Formspree (`https://formspree.io/f/mlggrlaq`) for form submission.
    *   Fields include "이름 (Name)", "이메일 (Email)", and "메시지 (Message)".
    *   A button "제휴 문의" has been added to the `result-screen` to open the contact form.
    *   The form is now visible by default on page load. The `start-screen` is initially hidden.
    *   Includes a "닫기 (Close)" button (`close-form-btn`) to hide the form and return to the `start-screen`.
*   **Styling:**
    *   Form elements are styled to align with the existing theme, using CSS variables for colors and fonts.
    *   Responsive design principles applied to the form.
*   **Accessibility:** Basic accessibility considerations for form elements (labels, required attributes).

## Plan for Current Request: Make Form Visible

### Objective
To modify the application so that the Formspree contact form is visible by default when the page loads, instead of the MBTI test start screen.

### Steps Implemented
1.  **Modify `index.html`:**
    *   Added `style="display: none;"` to `<div id="start-screen">` to hide it initially.
    *   Removed `style="display: none;"` from `<div id="contact-form-screen">` to make it visible by default.
2.  **Modify `main.js`:**
    *   Adjusted the `applyTheme()` function to explicitly set `startScreen.style.display = 'none';`, `questionScreen.style.display = 'none';`, `resultScreen.style.display = 'none';`, and `contactFormScreen.style.display = 'flex';` on page load. This ensures the contact form is the initial view.
    *   Updated `startQuiz()` to ensure the `contactFormScreen` is hidden when the quiz starts.
    *   Updated `showResult()` to ensure the `contactFormScreen` is hidden when quiz results are displayed.
    *   Updated `retryQuiz()` to ensure the `contactFormScreen` is hidden when the quiz is retried and the `startScreen` is shown.
    *   Updated `closeContactForm()` to ensure `contactFormScreen` is hidden and `startScreen` is shown, along with hiding other quiz screens.