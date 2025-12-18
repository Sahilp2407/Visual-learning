// ===================================
// STATE MANAGEMENT
// ===================================
let currentScreen = 0;
const totalScreens = 6;
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
        }, 100);
    }

    // Update navbar visibility
    const navbar = document.getElementById('navbar');
    if (screenIndex === 0) {
        navbar.style.opacity = '0.5';
    } else {
        navbar.style.opacity = '1';
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
