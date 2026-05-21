# Refactoring Summary: Modular q_mon_parent Handling & Dynamic HTML Generation

## Overview
The survey module has been refactored to:
1. Make `q_mon_parent` handling modular and config-driven
2. Generate HTML dynamically from the JavaScript config
3. Add helper functions for better code organization

---

## Changes Made

### 1. Config-Driven Input Names (JS)

**Added `inputName` property to Config:**
```javascript
{
    number: 14,
    step: 3,
    text: 'Does your setting currently use digital monitoring to spot students at risk?',
    category: 'detect',
    inputName: 'q_mon_parent',  // ← NEW: Custom input name
    toggles: [15, 16, 17]
}
```

**Why:** Instead of hardcoding `number === 14 ? 'q_mon_parent' : 'q${number}'` in the JS, the input name is now defined in the config. Any question can have a custom input name without special-case logic.

---

### 2. Refactored Helper Functions (JS)

**Before:**
```javascript
function getQuestionName(questionOrNumber) {
    const number = typeof questionOrNumber === 'object' ? questionOrNumber.number : questionOrNumber;
    return number === 14 ? 'q_mon_parent' : `q${number}`;  // ← Hardcoded
}
```

**After:**
```javascript
function getQuestionName(questionOrNumber) {
    let question;
    if (typeof questionOrNumber === 'object') {
        question = questionOrNumber;
    } else {
        question = findQuestionByNumber(questionOrNumber);
    }
    return question?.inputName || `q${question.number}`;  // ← Config-driven fallback
}

function getParentQuestion(question) {
    if (question.dependsOn) {
        return findQuestionByNumber(question.dependsOn);
    }
    return null;
}

function getChildQuestions(question) {
    if (question.toggles) {
        return question.toggles.map(num => findQuestionByNumber(num));
    }
    return [];
}
```

**Why:** These helper functions make the codebase more maintainable and reusable. Parent/child relationships are now explicitly queryable without hardcoded question numbers.

---

### 3. HTML Generator Module (JS)

**New `HTMLGenerator` object:**
```javascript
const HTMLGenerator = {
    generateQuestionHTML(question) { ... }      // Generate individual question HTML
    generateStepHTML(stepNumber) { ... }        // Generate entire step
    getSubsections(stepNumber) { ... }          // Map subsection headers by step
    getSubsectionForQuestion(question) { ... }  // Determine subsection for a question
    getStepTitle(stepNumber) { ... }            // Get step titles from config
    generateFormHTML() { ... }                  // Generate complete form
}
```

**Key Features:**
- All HTML is generated from `Config.questions`
- Subsections are driven by step number and question number mappings
- Parent questions with `toggles` automatically create collapsible child sections
- No hardcoded HTML structure in the JS

---

### 4. New Dynamic HTML File

**File:** `module-generated.html`

**Structure:**
```html
<div class="ai-survey" id="survey">
    <!-- Survey form will be generated dynamically from JS config -->
</div>
<!-- (Results, Modal, Progress bar remain static) -->

<script>
// Inject generated HTML into the survey container
document.addEventListener('DOMContentLoaded', function() {
    const surveyContainer = document.getElementById('survey');
    if (surveyContainer && typeof HTMLGenerator !== 'undefined') {
        surveyContainer.innerHTML = HTMLGenerator.generateFormHTML();
    }
});
</script>
```

**Why:** The HTML file is now much simpler. All survey form markup is generated dynamically, reducing maintenance burden. If you add a new question to the config, the HTML is automatically generated without manual edits.

---

## How to Add a Question with Custom Input Name

**Example:** Add a new question with custom input name `q_custom_parent`:

```javascript
{
    number: 28,
    step: 5,
    text: 'Your question text here?',
    category: 'empower',
    inputName: 'q_custom_parent',  // ← Custom name (optional)
    toggles: [29, 30]              // ← Child questions
}
```

The system will automatically:
1. Use `q_custom_parent` as the input name instead of `q28`
2. Create a collapsible section for questions 29 and 30
3. No JS code changes needed—just update the config

---

## Benefits

✅ **Modularity:** No hardcoded question IDs or special cases  
✅ **Maintainability:** Single source of truth for survey structure  
✅ **Extensibility:** Add custom input names or parent/child relationships easily  
✅ **Simplicity:** HTML file reduced from 400+ lines to ~40 lines  
✅ **DRY:** Subsection logic, step titles, and question mappings are centralized  

---

## Files Modified

- `module-refactored.js`: Added config-driven input names, helper functions, and HTMLGenerator
- `module-generated.html`: New simplified HTML that uses dynamic generation

---

## Testing Checklist

- [ ] Verify all questions render with correct input names
- [ ] Confirm `q_mon_parent` renders as before
- [ ] Check that child questions (15, 16, 17) appear in collapsible section
- [ ] Test form submission captures correct data
- [ ] Verify all steps and subsections display correctly
- [ ] Confirm progress bar and navigation work as expected
