// ===================================
// STATE MANAGEMENT
// ===================================
let currentScreen = 0;
const totalScreens = 21; // Module 1.1 (6) + 1.2 (6) + 1.3 (9)
let comparisonRevealed = false;

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    updateProgress();
});

function initializeApp() {
    // Show landing screen
    showScreen(0);

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Initialize theme
    initializeTheme();
}

// ===================================
// THEME MANAGEMENT
// ===================================
function initializeTheme() {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Optional: Add a subtle animation
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

function setupEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);

    // Track textarea changes for playground
    const textarea = document.getElementById('userPrompt');
    if (textarea) {
        textarea.addEventListener('input', handlePromptInput);
    }
}

// ===================================
// NAVIGATION
// ===================================
function startLearning() {
    nextScreen();
    smoothScrollToTop();
}

function nextScreen() {
    if (currentScreen < totalScreens - 1) {
        currentScreen++;
        showScreen(currentScreen);
        updateProgress();
        smoothScrollToTop();
    }
}

function previousScreen() {
    if (currentScreen > 0) {
        currentScreen--;
        showScreen(currentScreen);
        updateProgress();
        smoothScrollToTop();
    }
}

function showScreen(screenIndex) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // Show target screen with animation
    const targetScreen = document.getElementById(`screen-${screenIndex}`);
    if (targetScreen) {
        setTimeout(() => {
            targetScreen.classList.add('active');

            // Trigger typing effect for Screen 2
            if (screenIndex === 2) {
                setTimeout(() => {
                    initializeScreen2TypingEffect();
                }, 300);
            }

            // Trigger Timer for Task 1 in Module 1.3
            if (screenIndex === 14) {
                startPressureTimer();
            }
        }, 100);
    }

    // Update navbar visibility
    const navbar = document.getElementById('navbar');
    if (screenIndex === 0) {
        navbar.style.opacity = '0.5';
    } else {
        navbar.style.opacity = '1';
    }

    // Control global Continue button visibility
    const globalContinue = document.getElementById('globalContinue');
    if (globalContinue) {
        // Hide on landing page (0), Module 1.1 completion (5), Module 1.2 completion (11), and Module 1.3 completion (20)
        if (screenIndex === 0 || screenIndex === 5 || screenIndex === 11 || screenIndex === 20) {
            globalContinue.style.display = 'none';
        } else {
            globalContinue.style.display = 'inline-flex';
        }
    }

    // Control global Back button visibility
    const globalBack = document.getElementById('globalBack');
    if (globalBack) {
        // Hide on landing page (0)
        if (screenIndex === 0) {
            globalBack.style.display = 'none';
        } else {
            globalBack.style.display = 'inline-flex';
        }
    }
}

// ===================================
// MODAL / FEEDBACK SYSTEM
// ===================================
function showFeedback(title, message, type = 'success') {
    const modal = document.getElementById('customModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');

    if (!modal || !modalTitle || !modalMessage || !modalIcon) return;

    modalTitle.innerText = title;
    modalMessage.innerText = message;

    // Set icon based on type
    modalIcon.className = 'modal-icon ' + type;
    modalIcon.innerText = type === 'success' ? '✅' : '⚠️';

    modal.classList.add('active');
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
}


function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleKeyPress(e) {
    // Arrow right or Enter to go next
    if (e.key === 'ArrowRight' || (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA')) {
        if (!e.target.closest('.playground-editor')) {
            nextScreen();
        }
    }

    // Arrow left to go back
    if (e.key === 'ArrowLeft') {
        previousScreen();
    }
}

// ===================================
// PROGRESS TRACKING
// ===================================
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    const percentage = Math.round((currentScreen / (totalScreens - 1)) * 100);

    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    if (progressText) {
        progressText.textContent = `${percentage}% Complete`;
    }
}

// ===================================
// SCREEN 2: COMPARISON TOGGLE & TYPING EFFECT
// ===================================

// Typing effect function
function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
        element.textContent = '';
        element.classList.add('typing'); // Add typing cursor
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing'); // Remove typing cursor when done
                resolve();
            }
        }

        type();
    });
}

// Initialize typing effect when screen 2 becomes active
function initializeScreen2TypingEffect() {
    const badPromptText = document.querySelector('#badPrompt .prompt-text');
    const badOutputText = document.querySelector('#badPrompt .output-text');
    const goodPromptText = document.querySelector('#goodPrompt .prompt-text');
    const goodOutputText = document.querySelector('#goodPrompt .output-text');

    if (!badPromptText || !badOutputText) return;

    // Store original text
    const badPromptOriginal = badPromptText.textContent;
    const badOutputOriginal = badOutputText.innerHTML;
    const goodPromptOriginal = goodPromptText ? goodPromptText.textContent : '';
    const goodOutputOriginal = goodOutputText ? goodOutputText.innerHTML : '';

    // Hide AI responses initially
    if (badOutputText) {
        badOutputText.style.opacity = '0';
        badOutputText.style.transform = 'translateY(10px)';
    }
    if (goodOutputText) {
        goodOutputText.style.opacity = '0';
        goodOutputText.style.transform = 'translateY(10px)';
    }

    // Start typing effect for bad prompt
    typeText(badPromptText, badPromptOriginal, 30).then(() => {
        // After bad prompt typing completes, show bad response
        setTimeout(() => {
            badOutputText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            badOutputText.style.opacity = '1';
            badOutputText.style.transform = 'translateY(0)';
        }, 300);
    });

    // Start typing effect for good prompt if revealed
    if (comparisonRevealed && goodPromptText) {
        typeText(goodPromptText, goodPromptOriginal, 30).then(() => {
            // After good prompt typing completes, show good response
            setTimeout(() => {
                goodOutputText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                goodOutputText.style.opacity = '1';
                goodOutputText.style.transform = 'translateY(0)';
            }, 300);
        });
    }
}

function toggleComparison() {
    const goodPrompt = document.getElementById('goodPrompt');
    const toggleText = document.getElementById('toggleText');
    const toggleButton = document.querySelector('.toggle-button');
    const goodPromptText = document.querySelector('#goodPrompt .prompt-text');
    const goodOutputText = document.querySelector('#goodPrompt .output-text');

    if (!comparisonRevealed) {
        // Reveal the good prompt
        goodPrompt.classList.add('revealed');
        toggleText.textContent = 'Hide Improvement';
        comparisonRevealed = true;

        // Add animation
        goodPrompt.style.animation = 'fadeInUp 0.6s ease-out';

        // Start typing effect for good prompt
        if (goodPromptText && goodOutputText) {
            const goodPromptOriginal = '"Create a 3-step social media marketing plan for a new coffee shop targeting college students. Include platform recommendations and content ideas."';

            // Clear content before typing
            goodPromptText.textContent = '';

            // Hide output initially
            goodOutputText.style.opacity = '0';
            goodOutputText.style.transform = 'translateY(10px)';

            // Type the prompt
            typeText(goodPromptText, goodPromptOriginal, 30).then(() => {
                // After typing completes, show response
                setTimeout(() => {
                    goodOutputText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    goodOutputText.style.opacity = '1';
                    goodOutputText.style.transform = 'translateY(0)';
                }, 300);
            });
        }
    } else {
        // Hide the good prompt
        goodPrompt.classList.remove('revealed');
        toggleText.textContent = 'See the Improvement';
        comparisonRevealed = false;
    }
}

// ===================================
// SCREEN 4: INTERACTIVE PLAYGROUND
// ===================================
const originalPrompt = "Write a blog post about productivity";
let userScore = 0;

function handlePromptInput() {
    // Reset feedback when user types
    const feedbackContent = document.getElementById('feedbackContent');
    if (feedbackContent && feedbackContent.classList.contains('active')) {
        feedbackContent.classList.remove('active');
        feedbackContent.innerHTML = `
            <div class="feedback-placeholder">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="20" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
                    <path d="M24 16V24M24 32H24.02" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <p>Click "Analyze My Prompt" to get feedback</p>
            </div>
        `;
    }
}

function analyzePrompt() {
    const userPrompt = document.getElementById('userPrompt').value.trim();
    const feedbackContent = document.getElementById('feedbackContent');
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreCircle = document.getElementById('scoreCircle');

    if (!userPrompt) {
        showFeedback('Please enter a prompt to analyze.', 0);
        return;
    }

    // Analyze the prompt
    const analysis = evaluatePrompt(userPrompt);

    // Display feedback
    feedbackContent.classList.add('active');
    feedbackContent.innerHTML = generateFeedbackHTML(analysis);

    // Update score with animation
    animateScore(analysis.score);
}

function evaluatePrompt(prompt) {
    let score = 0;
    const feedback = [];
    const strengths = [];
    const improvements = [];

    // Check for specificity
    const specificWords = ['specific', 'detailed', 'step', 'list', 'create', 'explain', 'analyze', 'compare'];
    const hasSpecificity = specificWords.some(word => prompt.toLowerCase().includes(word));

    if (hasSpecificity) {
        score += 25;
        strengths.push('Uses specific action words');
    } else {
        improvements.push('Add specific action words (e.g., "create", "list", "explain")');
    }

    // Check for context
    const contextWords = ['for', 'about', 'targeting', 'audience', 'purpose', 'goal'];
    const hasContext = contextWords.some(word => prompt.toLowerCase().includes(word));

    if (hasContext) {
        score += 25;
        strengths.push('Includes context or target audience');
    } else {
        improvements.push('Add context about your audience or use case');
    }

    // Check for format request
    const formatWords = ['format', 'structure', 'outline', 'bullet', 'numbered', 'table', 'step-by-step'];
    const hasFormat = formatWords.some(word => prompt.toLowerCase().includes(word));

    if (hasFormat) {
        score += 20;
        strengths.push('Requests a specific format');
    } else {
        improvements.push('Specify the desired output format');
    }

    // Check length (good prompts are usually detailed)
    if (prompt.length > 50) {
        score += 15;
        strengths.push('Provides sufficient detail');
    } else {
        improvements.push('Add more details to your prompt');
    }

    // Check for uncertainty handling
    const uncertaintyWords = ['if unsure', 'don\'t know', 'uncertain', 'not sure'];
    const hasUncertainty = uncertaintyWords.some(phrase => prompt.toLowerCase().includes(phrase));

    if (hasUncertainty) {
        score += 15;
        strengths.push('Allows AI to express uncertainty');
    } else {
        improvements.push('Consider adding "If you\'re unsure, say so"');
    }

    return {
        score: Math.min(score, 100),
        strengths,
        improvements,
        prompt
    };
}

function generateFeedbackHTML(analysis) {
    let html = '<div class="feedback-results">';

    // Overall assessment
    let assessment = '';
    let assessmentColor = '';

    if (analysis.score >= 80) {
        assessment = 'Excellent! Your prompt is clear and specific.';
        assessmentColor = '#10B981';
    } else if (analysis.score >= 60) {
        assessment = 'Good start! A few improvements will make it even better.';
        assessmentColor = '#F59E0B';
    } else {
        assessment = 'Needs improvement. Try adding more specificity and context.';
        assessmentColor = '#EF4444';
    }

    html += `
        <div class="feedback-item" style="border-left-color: ${assessmentColor}">
            <h4>Overall Assessment</h4>
            <p>${assessment}</p>
        </div>
    `;

    // Strengths
    if (analysis.strengths.length > 0) {
        html += `
            <div class="feedback-item" style="border-left-color: #10B981">
                <h4>✅ Strengths</h4>
                <ul style="margin: 0; padding-left: 1.5rem; color: #1A1A1A;">
                    ${analysis.strengths.map(s => `<li style="margin-bottom: 0.5rem; color: #1A1A1A;">${s}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Improvements
    if (analysis.improvements.length > 0) {
        html += `
            <div class="feedback-item" style="border-left-color: #FF6B35">
                <h4>💡 Suggestions for Improvement</h4>
                <ul style="margin: 0; padding-left: 1.5rem; color: #1A1A1A;">
                    ${analysis.improvements.map(i => `<li style="margin-bottom: 0.5rem; color: #1A1A1A;">${i}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    html += '</div>';
    return html;
}

function animateScore(targetScore) {
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreCircle = document.getElementById('scoreCircle');
    const circumference = 2 * Math.PI * 54; // radius = 54

    let currentScore = 0;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    function updateScore(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        currentScore = Math.round(targetScore * easeProgress);
        scoreNumber.textContent = currentScore;

        // Update circle
        const offset = circumference - (currentScore / 100) * circumference;
        scoreCircle.style.strokeDashoffset = offset;

        if (progress < 1) {
            requestAnimationFrame(updateScore);
        }
    }

    requestAnimationFrame(updateScore);
}

function resetPrompt() {
    const textarea = document.getElementById('userPrompt');
    const feedbackContent = document.getElementById('feedbackContent');
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreCircle = document.getElementById('scoreCircle');

    // Reset textarea
    textarea.value = originalPrompt;

    // Reset feedback
    feedbackContent.classList.remove('active');
    feedbackContent.innerHTML = `
        <div class="feedback-placeholder">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
                <path d="M24 16V24M24 32H24.02" stroke="#333" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>Click "Analyze My Prompt" to get feedback</p>
        </div>
    `;

    // Reset score
    scoreNumber.textContent = '0';
    scoreCircle.style.strokeDashoffset = '339.292';
}

// ===================================
// SCREEN 5: COMPLETION
// ===================================
function restartCourse() {
    currentScreen = 0;
    showScreen(0);
    updateProgress();
    smoothScrollToTop();

    // Reset comparison
    comparisonRevealed = false;
    const goodPrompt = document.getElementById('goodPrompt');
    const toggleText = document.getElementById('toggleText');
    if (goodPrompt) {
        goodPrompt.classList.remove('revealed');
    }
    if (toggleText) {
        toggleText.textContent = 'See the Improvement';
    }

    // Reset playground
    resetPrompt();
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// SCROLL EFFECTS
// ===================================
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide navbar on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
}, 100));

// ===================================
// ANALYTICS & TRACKING (Placeholder)
// ===================================
function trackScreenView(screenIndex) {
    // Placeholder for analytics
    console.log(`Screen ${screenIndex} viewed`);
}

function trackInteraction(action, label) {
    // Placeholder for analytics
    console.log(`Interaction: ${action} - ${label}`);
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
function announceScreenChange(screenIndex) {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    announcer.textContent = `Now viewing screen ${screenIndex + 1} of ${totalScreens}`;
    document.body.appendChild(announcer);

    setTimeout(() => {
        document.body.removeChild(announcer);
    }, 1000);
}

// Add screen reader only class
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(style);

// ===================================
// MODULE 1.2: INTERACTIVE FUNCTIONS
// ===================================

// Practice text transformation
function transformText(format) {
    const input = document.getElementById('practiceInput').value.trim();
    const output = document.getElementById('practiceOutput');

    if (!input) {
        output.innerHTML = `
            <div class="output-placeholder">
                <p style="color: var(--color-danger);">Please enter some text first!</p>
            </div>
        `;
        return;
    }

    let transformedText = '';

    switch (format) {
        case 'summary':
            transformedText = generateSummary(input);
            break;
        case 'email':
            transformedText = generateEmail(input);
            break;
        case 'table':
            transformedText = generateTable(input);
            break;
    }

    output.innerHTML = `
        <div class="transform-output">
            <div class="transform-header" style="background: var(--color-cream-light); padding: var(--spacing-md); border-radius: var(--radius-md) var(--radius-md) 0 0; margin: calc(var(--spacing-lg) * -1) calc(--spacing-lg) * -1) var(--spacing-md); border-bottom: 1px solid rgba(0, 0, 0, 0.08);">
                <strong>Transformed to ${format.charAt(0).toUpperCase() + format.slice(1)}:</strong>
            </div>
            ${transformedText}
        </div>
    `;
}

function generateSummary(text) {
    // Simple bullet point summary
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let summary = '<ul style="list-style-position: inside; padding-left: 0;">';

    sentences.forEach(sentence => {
        const trimmed = sentence.trim();
        if (trimmed) {
            summary += `<li style="margin-bottom: var(--spacing-xs);">${trimmed}</li>`;
        }
    });

    summary += '</ul>';
    return summary;
}

function generateEmail(text) {
    return `
        <p><strong>Subject:</strong> Project Update</p>
        <p>Hi Team,</p>
        <p>${text}</p>
        <p>Please let me know if you have any questions or need additional information.</p>
        <p>Best regards</p>
    `;
}

function generateTable(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    let table = `
        <table class="status-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Action/Impact</th>
                    <th>Note</th>
                </tr>
            </thead>
            <tbody>
    `;

    sentences.forEach((sentence, index) => {
        const trimmed = sentence.trim();
        if (trimmed) {
            // Simulated split for a 3-column look in practice
            const parts = trimmed.split(/[:,-]/);
            const col1 = parts[0] || `Point ${index + 1}`;
            const col2 = parts[1] || trimmed;
            const col3 = parts[2] || "Requires Action";

            table += `
                <tr>
                    <td><strong>${col1}</strong></td>
                    <td>${col2}</td>
                    <td>${col3}</td>
                </tr>
            `;
        }
    });

    table += `
            </tbody>
        </table>
    `;

    return table;
}

function resetPractice() {
    const textarea = document.getElementById('practiceInput');
    const output = document.getElementById('practiceOutput');

    textarea.value = 'Meeting with client went well. Budget approved for Q1. Need to finalize timeline. Sarah will lead design. Launch target is March 15.';

    output.innerHTML = `
        <div class="output-placeholder">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
                <path d="M24 16V24M24 32H24.02" stroke="#333" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>Select a format above to see the transformation</p>
        </div>
    `;
}

// ===================================
// MODULE 1.3: PROMPT STRUCTURE LOGIC
// ===================================

const promptParts = {
    role: "as a Senior Project Analyst, ",
    context: "given that the project is delayed by two weeks but the budget is healthy, ",
    task: "please write a weekly update summary, ",
    constraints: "keeping it under 100 words in length, ",
    format: "formatted as three distinct bullet points."
};

let activeParts = { role: false, context: false, task: false, constraints: false, format: false };

function toggleComponent(part) {
    activeParts[part] = !activeParts[part];
    const btn = document.getElementById(`btn${part.charAt(0).toUpperCase() + part.slice(1)}`);

    if (activeParts[part]) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }

    updateBuiltPrompt();
}

function updateBuiltPrompt() {
    const box = document.getElementById('builtPrompt');
    let fullText = "";

    for (let part in activeParts) {
        if (activeParts[part]) {
            fullText += `<span class="t-${part}">${promptParts[part]}</span>`;
        }
    }

    if (fullText === "") {
        box.innerHTML = "Start adding components...";
        box.classList.add('italic');
    } else {
        box.innerHTML = fullText;
        box.classList.remove('italic');
    }
}

function checkRepair() {
    const checkboxes = document.querySelectorAll('#repairQuiz input');
    let allCorrect = true;

    checkboxes.forEach(cb => {
        const isMissing = cb.getAttribute('data-ans') === 'true';
        if (cb.checked !== isMissing) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        showFeedback("Success", "Correct! You identified the missing building blocks. 🚀", "success");
    } else {
        showFeedback("Keep Trying", "Not quite. Review the prompt—does it have a Role? Context? Constraints? Format?", "error");
    }
}

function switchAudience(type) {
    const output = document.getElementById('audienceOutput');
    const btn1 = document.getElementById('btnAudience1');
    const btn2 = document.getElementById('btnAudience2');

    if (type === 'leadership') {
        btn1.classList.add('active');
        btn2.classList.remove('active');
        output.innerHTML = `<div class="output-content">"You are a <b>Senior Analyst</b>. Focus on <b>mitigation strategies and budget health</b>. Format as a <b>Formal Executive Summary</b>."</div>`;
    } else {
        btn1.classList.remove('active');
        btn2.classList.add('active');
        output.innerHTML = `<div class="output-content">"You are a <b>Customer Success Specialist</b>. Focus on <b>reassurance and updated timelines</b>. Format as a <b>Friendly Email</b>."</div>`;
    }
}

function selectStressAns(el, isCorrect) {
    const cards = document.querySelectorAll('.stress-test-container .option-card');
    cards.forEach(c => c.classList.remove('correct', 'wrong'));

    if (isCorrect) {
        el.classList.add('correct');
        showFeedback("Well Done", "Perfect! This resolves the conflict by setting a realistic length constraint while asking for the most important data points.", "success");
    } else {
        el.classList.add('wrong');
        showFeedback("Not Quite", "This doesn't quite solve the Stress Test. Try to find a balance between detail and length.", "error");
    }
}

const templates = {
    weekly: "You are [ROLE]. Given this [CONTEXT], your task is to write a Weekly Update. Use a professional tone and format it as [FORMAT]. Keep it under [CONSTRAINTS].",
    meeting: "Act as a [ROLE]. Based on the [CONTEXT] of the meeting, please summarize the key decisions. Use [FORMAT] and ensure [CONSTRAINTS] are met.",
    status: "Prompt: You are a [ROLE]. Status of project: [CONTEXT]. Task: Create a report in [FORMAT]. Important: [CONSTRAINTS]."
};

function loadTemplate() {
    const type = document.getElementById('templateType').value;
    document.getElementById('templateText').value = templates[type];
}

function saveToLibrary() {
    const status = document.getElementById('libraryStatus');
    status.classList.remove('hidden');
    setTimeout(() => {
        status.classList.add('hidden');
        showFeedback("Saved", "Prompt Template Saved to your Reusable Library! 💾", "success");
    }, 3000);
}

// ===================================
// MODULE 1.3: ENHANCED CHALLENGE LOGIC
// ===================================

let timerInterval;
let timeLeft = 60;

function startPressureTimer() {
    timeLeft = 60;
    const timerDisplay = document.getElementById('pressureTimer');
    if (!timerDisplay) return;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time Remaining: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showFeedback("Time's Up", "Time's up! Let's see what you built.", "error");
        }
    }, 1000);
}

function checkPressureTask() {
    const role = document.getElementById('p1_role').value;
    const ctx = document.getElementById('p1_context').value;
    const task = document.getElementById('p1_task').value;
    const cons = document.getElementById('p1_constraints').value;
    const fmt = document.getElementById('p1_format').value;

    if (!role || !ctx || !task || !cons || !fmt) {
        showFeedback("Missing Info", "Wait! Your prompt is missing building blocks. High-stakes communication needs all 5 parts.", "error");
        return;
    }

    if (role === "PM" && ctx === "Lag" && task === "Update" && cons === "Fact" && fmt === "Bullets") {
        clearInterval(timerInterval);
        showFeedback("Mission Success", "Perfect! You've successfully translated messy notes into a structured, VP-ready prompt under pressure. 🚀", "success");
    } else {
        showFeedback("Review Selection", "The structure is there, but some choices might not fit the VP's preferences. Try again for a better result.", "error");
    }
}

function selectBattleWinner(el, type) {
    const cards = document.querySelectorAll('.battle-card');
    cards.forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');

    const judgmentBox = document.getElementById('judgmentBox');
    judgmentBox.classList.remove('hidden');

    if (type === 'structured') {
        el.setAttribute('data-correct', 'true');
    } else {
        el.setAttribute('data-correct', 'false');
    }
}

function submitJudgment() {
    const selected = document.querySelector('.battle-card.selected');
    const input = document.getElementById('battleJustification').value;

    if (!input) {
        showFeedback("Quick Note", "Please explain why you made this choice.", "error");
        return;
    }

    if (selected.getAttribute('data-correct') === 'true') {
        showFeedback("Sharp Judgment", "Correct! Prompt B is structured without noise. Over-engineering (Prompt A) often confuses the AI and leads to redundant explanations.", "success");
    } else {
        showFeedback("Learning Point", "Actually, Prompt B is better. It uses the 5-part structure clearly, while Prompt A includes too much conversational noise that makes the instruction less precise.", "error");
    }
}

const simData = {
    leadership: {
        prompt: "Role: Senior Analyst. Constraints: Strategic tone, focus on ROI and Mitigation.",
        output: "Executive Summary: 15% dip identified. Recommended action: Diversify suppliers and prioritize high-margin SKUs."
    },
    client: {
        prompt: "Role: Customer Success Lead. Constraints: Empathetic tone, focus on Transparency.",
        output: "Client Email: We value your partnership. Supply issues have caused a minor dip. Here is our plan to ensure your orders stay priority."
    },
    team: {
        prompt: "Role: Operations Manager. Constraints: Direct tone, focus on Recovery Tasks.",
        output: "Internal Memo: Q4 Target Missed. All hands on deck. Shift focus to resolving backlog by Friday."
    }
};

function updateSim(audience) {
    const btns = document.querySelectorAll('.sim-btn-pill');
    btns.forEach(b => b.classList.remove('active'));

    const content = simData[audience];
    document.getElementById('simPromptContent').innerText = content.prompt;
    document.getElementById('simOutputContent').innerText = content.output;

    if (audience === 'leadership') document.getElementById('sim1').classList.add('active');
    if (audience === 'client') document.getElementById('sim2').classList.add('active');
    if (audience === 'team') document.getElementById('sim3').classList.add('active');
}

function checkFailPart(el) {
    const tiles = document.querySelectorAll('.diagnostic-tile');
    tiles.forEach(t => {
        t.classList.remove('active-correct', 'active-wrong');
        t.style.background = ""; // Clear any old inline styles from previous versions
        t.style.color = "";
    });

    const part = el.getAttribute('data-part');
    if (part === 'Constraints') {
        el.classList.add('active-correct');
        showFeedback("Perfect Fix", "Spot on! The prompt failed because it lacked specific Constraints on Tone and Risk Focus.", "success");
    } else {
        el.classList.add('active-wrong');
        showFeedback("Try Again", "That's part of the prompt, but the real issue here was the lack of Constraints (Tone & Missing Data).", "error");
    }
}

function flagGovernance(el, isCorrect) {
    const opts = document.querySelectorAll('.safe-opt');
    opts.forEach(o => o.classList.remove('correct'));

    if (isCorrect) {
        el.classList.add('correct');
        showFeedback("Safe & Smart", "Excellent. You've identified a massive risk. AI should never be given autonomous approval power over finances or legal decisions. It should remain an assistant in the loop.", "success");
    } else {
        showFeedback("Governance Alert", "DANGEROUS CHOICE! Giving AI autonomous approval over budgets or legal actions is a major governance failure. Try again.", "error");
    }
}

const blueprintData = {
    weekly: {
        role: "Senior Project Manager",
        context: "Raw project data/notes from the past 7 days",
        task: "Draft a high-level Weekly Executive Update",
        constraints: "Neutral tone, max 3 bullets per section",
        format: "Markdown (Professional Columns)"
    },
    meeting: {
        role: "Executive Assistant",
        context: "Audio transcript or messy shorthand notes",
        task: "Create a Decisions & Actions Summary",
        constraints: "Active voice, focus on 'Owners' and 'Deadlines'",
        format: "Checklist Structure"
    },
    status: {
        role: "Risk Compliance Officer",
        context: "Operational logs and timeline deviations",
        task: "Identify Red Flags and Mitigation Steps",
        constraints: "Highly specific, no conversational fillers",
        format: "Risk Level Table (Red/Amber/Green)"
    }
};

function loadBlueprint(type, el) {
    // UI selection
    const btns = document.querySelectorAll('.blueprint-btn');
    btns.forEach(b => b.classList.remove('active'));
    el.classList.add('active');

    // Content update
    const data = blueprintData[type];
    document.querySelector('#row-role .fw-pill').innerText = data.role;
    document.querySelector('#row-context .fw-pill').innerText = data.context;
    document.querySelector('#row-task .fw-pill').innerText = data.task;
    document.querySelector('#row-constraints .fw-pill').innerText = data.constraints;
    document.querySelector('#row-format .fw-pill').innerText = data.format;
}

function saveTemplateToLibrary() {
    showFeedback("Enterprise Asset Created", "Template successfully deployed to your Reusable Library. You've now built a framework that ensures consistent AI output quality across your entire workflow. 💾", "success");
}

function restartCourse() {
    currentScreen = 0;
    showScreen(0);
    window.scrollTo(0, 0);
}
// Trigger timer for Task 1 when arriving at Screen 14
// This will be called from showScreen()
