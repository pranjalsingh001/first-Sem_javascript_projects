// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carousel = document.querySelector('.carousel .flex');
    const cards = document.querySelectorAll('.study-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // Including margin
    const visibleCards = Math.floor(carousel.offsetWidth / cardWidth);
    const maxIndex = cards.length - visibleCards;
    
    // Update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        
        nextBtn.disabled = currentIndex >= maxIndex;
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newVisibleCards = Math.floor(carousel.offsetWidth / cardWidth);
        const newMaxIndex = cards.length - newVisibleCards;
        
        // Adjust current index if needed
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
        
        updateCarousel();
    });
    
    // Touch events for mobile swiping
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go next
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go previous
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }
    
    // NEW FEATURE: AI Study Assistant Demo
    const aiChatContainer = document.querySelector('.chat-bubble:last-child');
    const aiResponses = [
        "Let me break it down step by step...",
        "First, find the derivative of the function...",
        "To solve this problem, we need to integrate...",
        "This concept relates to the fundamental theorem...",
        "I'll create some practice problems to help you..."
    ];
    
    let responseIndex = 0;
    
    // Cycle through AI responses every 3 seconds
    setInterval(function() {
        responseIndex = (responseIndex + 1) % aiResponses.length;
        aiChatContainer.querySelector('p').textContent = aiResponses[responseIndex];
        
        // Add visual feedback
        aiChatContainer.classList.add('pulse-animation');
        setTimeout(() => {
            aiChatContainer.classList.remove('pulse-animation');
        }, 500);
    }, 3000);
    
    // Add functionality to the "Try it now" button in the AI section
    const tryAiButton = document.querySelector('.bg-gradient-to-r button:first-child');
    tryAiButton.addEventListener('click', function() {
        // Create and show AI assistant modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-900">AI Study Assistant</h3>
                    <button id="closeModal" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="bg-gray-100 rounded-lg p-4 h-64 overflow-y-auto mb-4" id="chatHistory">
                    <div class="chat-message ai mb-3">
                        <p class="bg-indigo-100 text-gray-800 p-3 rounded-lg inline-block">Hi! I'm your AI Study Assistant. What would you like help with today?</p>
                    </div>
                </div>
                <div class="flex">
                    <input type="text" id="userInput" placeholder="Type your question here..." class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <button id="sendMessage" class="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
                <div class="mt-4">
                    <h4 class="text-sm font-medium text-gray-700 mb-2">Suggested topics:</h4>
                    <div class="flex flex-wrap gap-2">
                        <button class="suggested-topic bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full">Math help</button>
                        <button class="suggested-topic bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full">Create flashcards</button>
                        <button class="suggested-topic bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full">Quiz me</button>
                        <button class="suggested-topic bg-gray-100 hover:bg-gray-200 text-sm px-3 py-1 rounded-full">Explain a concept</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Handle close modal button
        document.getElementById('closeModal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Handle send message in AI assistant
        const chatHistory = document.getElementById('chatHistory');
        const userInput = document.getElementById('userInput');
        const sendMessage = document.getElementById('sendMessage');
        
        function addMessage(text, isUser) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'} mb-3 ${isUser ? 'text-right' : ''}`;
            
            const messagePara = document.createElement('p');
            messagePara.className = isUser ? 
                'bg-indigo-600 text-white p-3 rounded-lg inline-block' : 
                'bg-indigo-100 text-gray-800 p-3 rounded-lg inline-block';
            messagePara.textContent = text;
            
            messageDiv.appendChild(messagePara);
            chatHistory.appendChild(messageDiv);
            
            // Scroll to bottom
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
        
        function getAIResponse(question) {
            // AI response logic - in a real app, this would call an API
            const responses = {
                'math help': "I'd be happy to help with math! What specific topic or problem are you working on?",
                'create flashcards': "I can help create flashcards from your notes or textbook. Just share the content you want to convert into flashcards.",
                'quiz me': "I'd be glad to quiz you! What subject would you like to be quizzed on?",
                'explain a concept': "I can explain concepts in various subjects. What specific concept would you like me to explain?",
                'default': "That's an interesting question! Let me help you with that. Could you provide more details so I can give you the most relevant information?"
            };
            
            // Check if the question contains any keywords
            for (const [key, value] of Object.entries(responses)) {
                if (question.toLowerCase().includes(key)) {
                    return value;
                }
            }
            
            return responses.default;
        }
        
        // Handle send button click
        sendMessage.addEventListener('click', function() {
            const userText = userInput.value.trim();
            if (userText) {
                // Add user message
                addMessage(userText, true);
                userInput.value = '';
                
                // Simulate AI thinking
                setTimeout(() => {
                    const aiResponse = getAIResponse(userText);
                    addMessage(aiResponse, false);
                }, 1000);
            }
        });
        
        // Handle Enter key press
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage.click();
            }
        });
        
        // Handle suggested topics
        document.querySelectorAll('.suggested-topic').forEach(button => {
            button.addEventListener('click', function() {
                const topic = this.textContent;
                userInput.value = topic;
                sendMessage.click();
            });
        });
    });
    
    // Add dark mode toggle
    const footer = document.querySelector('footer');
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg';
    darkModeToggle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    `;
    
    document.body.appendChild(darkModeToggle);
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        
        // Update icon based on dark mode state
        if (document.documentElement.classList.contains('dark')) {
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            `;
        } else {
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            `;
        }
    });
    
    // Add additional feature: Study Timer
    const timerButton = document.createElement('button');
    timerButton.className = 'fixed bottom-20 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg';
    timerButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    `;
    
    document.body.appendChild(timerButton);
    
    // Add Study Timer functionality
    timerButton.addEventListener('click', function() {
        const timerModal = document.createElement('div');
        timerModal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        timerModal.innerHTML = `
            <div class="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-900">Study Timer</h3>
                    <button id="closeTimerModal" class="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex justify-center mb-6">
                    <div class="text-5xl font-bold text-indigo-600" id="timerDisplay">25:00</div>
                </div>
                <div class="flex justify-center gap-4 mb-4">
                    <button id="startTimer" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Start</button>
                    <button id="pauseTimer" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50" disabled>Pause</button>
                    <button id="resetTimer" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50" disabled>Reset</button>
                </div>
                <div class="flex justify-center gap-4">
                    <button data-time="15" class="time-option bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full">15 min</button>
                    <button data-time="25" class="time-option bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded-full">25 min</button>
                    <button data-time="45" class="time-option bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full">45 min</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(timerModal);
        
        // Timer variables
        let timer;
        let isRunning = false;
        let timeLeft = 25 * 60; // 25 minutes in seconds
        
        // DOM elements
        const timerDisplay = document.getElementById('timerDisplay');
        const startButton = document.getElementById('startTimer');
        const pauseButton = document.getElementById('pauseTimer');
        const resetButton = document.getElementById('resetTimer');
        const timeOptions = document.querySelectorAll('.time-option');
        
        // Format time as mm:ss
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        
        // Update timer display
        function updateDisplay() {
            timerDisplay.textContent = formatTime(timeLeft);
        }
        
        // Start timer
        startButton.addEventListener('click', function() {
            if (!isRunning) {
                isRunning = true;
                startButton.disabled = true;
                pauseButton.disabled = false;
                resetButton.disabled = false;
                
                timer = setInterval(function() {
                    timeLeft--;
                    updateDisplay();
                    
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        isRunning = false;
                        startButton.disabled = false;
                        pauseButton.disabled = true;
                        
                        // Play notification sound and show alert
                        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
                        audio.play();
                        
                        // Change title to notify user
                        document.title = "⏰ Time's up! - Quizlet";
                        
                        // Add notification
                        const notification = document.createElement('div');
                        notification.className = 'fixed top-4 right-4 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg z-50';
                        notification.innerHTML = `
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p class="font-bold">Time's up!</p>
                                    <p class="text-sm">Take a break before your next study session.</p>
                                </div>
                            </div>
                        `;
                        
                        document.body.appendChild(notification);
                        
                        // Remove notification after 5 seconds
                        setTimeout(() => {
                            document.body.removeChild(notification);
                            document.title = 'Quizlet';
                        }, 5000);
                    }
                }, 1000);            }
        });
        
        // Pause timer
        pauseButton.addEventListener('click', function() {
            if (isRunning) {
                clearInterval(timer);
                isRunning = false;
                startButton.disabled = false;
                pauseButton.disabled = true;
            }
        });
        
        // Reset timer
        resetButton.addEventListener('click', function() {
            clearInterval(timer);
            isRunning = false;
            startButton.disabled = false;
            pauseButton.disabled = true;
            resetButton.disabled = true;
            
            // Reset to selected time
            const activeOption = document.querySelector('.time-option.bg-indigo-100');
            timeLeft = parseInt(activeOption.dataset.time) * 60;
            updateDisplay();
        });
        
        // Time option buttons
        timeOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Only change time if timer is not running
                if (!isRunning) {
                    // Update active button styling
                    timeOptions.forEach(btn => btn.className = 'time-option bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full');
                    this.className = 'time-option bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded-full';
                    
                    // Set new time
                    const minutes = parseInt(this.dataset.time);
                    timeLeft = minutes * 60;
                    updateDisplay();
                }
            });
        });
        
        // Close timer modal
        document.getElementById('closeTimerModal').addEventListener('click', function() {
            // Stop timer before closing
            if (isRunning) {
                clearInterval(timer);
            }
            document.body.removeChild(timerModal);
        });
    });
});

const flashcardData = [
    [
      { title: "JLPT N4 Kanji", terms: 326, user: "Prita_Sam", avatar: "A" },
      { title: "ECONOMICS CHPT 1", terms: 9, user: "Sejal_Neman", avatar: "👩" },
      { title: "Hindi", terms: 6, user: "gulabjithakor2691", avatar: "G" },
      { title: "Criminal Procedure Code", terms: 595, user: "salonigarg1007", avatar: "👩" },
      { title: "NCERT Class 7 Science: Light", terms: 17, user: "Sidharth494", avatar: "👦" },
      { title: "Harry Potter Chapter 1", terms: 530, user: "rajchauhan9999", avatar: "🧙" }
    ],
    [
      { title: "Psychology Attributes", terms: 365, user: "kabir_barot", avatar: "K" },
      { title: "Malabar Civet", terms: 5, user: "enamsana153", avatar: "🦝" },
      { title: "Wireless LAN", terms: 16, user: "pranita3", avatar: "P" },
      { title: "Learn Tamil", terms: 60, user: "ishika07042000", avatar: "🐱" },
      { title: "Power Sharing", terms: 20, user: "manjarekar_vihaan", avatar: "V" },
      { title: "February Vocabulary", terms: 31, user: "rahulguru1231997", avatar: "📆" }
    ]
  ];
  
  let currentPage = 0;
  const flashcardPage = document.getElementById("flashcardPage");
  const pageIndicator = document.getElementById("pageIndicator");
  
  function renderCards() {
    flashcardPage.innerHTML = "";
    flashcardData[currentPage].forEach(card => {
      flashcardPage.innerHTML += `
        <div class="bg-white shadow-md rounded-lg p-5 border-b-4 border-transparent hover:border-purple-500 transition-all">
          <h3 class="text-lg font-semibold mb-1">${card.title}</h3>
          <p class="text-sm text-gray-600 mb-3">${card.terms} terms</p>
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">${card.avatar}</div>
            <span class="text-sm">${card.user}</span>
          </div>
        </div>
      `;
    });
  
    pageIndicator.textContent = `${currentPage + 1}/${flashcardData.length}`;
  }
  
  document.getElementById("nextBtn").onclick = () => {
    if (currentPage < flashcardData.length - 1) {
      currentPage++;
      renderCards();
    }
  };
  
  document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      renderCards();
    }
  };
  
  renderCards();
  