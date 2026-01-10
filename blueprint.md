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
    *   The form is initially hidden (`display: none;`) and is toggled visible/hidden using JavaScript.
    *   Includes a "닫기 (Close)" button (`close-form-btn`) to hide the form and return to the `start-screen`.
*   **Styling:**
    *   Form elements are styled to align with the existing theme, using CSS variables for colors and fonts.
    *   Responsive design principles applied to the form.
*   **Accessibility:** Basic accessibility considerations for form elements (labels, required attributes).

## Plan for Current Request: Integrate Formspree Contact Form

### Objective
To add a functional and visually integrated contact form for partnership inquiries using Formspree.

### Steps Implemented
1.  **Insert Form into `index.html`:**
    *   A new `div` with `id="contact-form-screen"` and class `screen` was added below the main `div.container`.
    *   This `div` contains an `<h2>` for "제휴 문의" and a `<form>` element.
    *   The `<form>`'s `action` attribute is set to the provided Formspree endpoint (`https://formspree.io/f/mlggrlaq`).
    *   Form fields include:
        *   `label` and `input type="text"` for Name (`name="name"`).
        *   `label` and `input type="email"` for Email (`name="_replyto"`).
        *   `label` and `textarea` for Message (`name="message"`).
    *   All input fields are marked `required`.
    *   A `button type="submit"` is included for form submission.
    *   A `button id="close-form-btn"` is added to close the form.
    *   The `contact-form-screen` is initially hidden with `style="display: none;"`.
    *   A new button, `contact-form-btn`, was added to the `result-screen` in `index.html` to serve as the entry point for the contact form.
2.  **Add Styles to `style.css`:**
    *   New CSS rules were added for `#contact-form-screen` to make it visually similar to the main `.container`.
    *   Styles for `.form-group`, `label`, `input[type="text"]`, `input[type="email"]`, and `textarea` were added to ensure consistent styling and responsiveness.
    *   Styles for the submit button and the close button were also added, leveraging existing theme variables where appropriate.
3.  **Add JavaScript Logic to `main.js`:**
    *   References to `contactFormScreen`, `contactFormBtn`, and `closeFormBtn` were added.
    *   An event listener was added to `contactFormBtn` to show `contactFormScreen` and hide `startScreen`, `questionScreen`, and `resultScreen`.
    *   An event listener was added to `closeFormBtn` to hide `contactFormScreen` and show `startScreen`.
    *   All original `getElementById` calls and event listeners for the MBTI test functionality were preserved and correctly placed to ensure full application functionality.
