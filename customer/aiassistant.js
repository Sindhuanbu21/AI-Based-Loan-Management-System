async function askAI() {

    const input = document.getElementById("question");
    const chatBox = document.getElementById("chatBox");

    const question = input.value.trim();

    if (question === "") return;

    // Disable input while waiting for AI
    input.disabled = true;

    chatBox.innerHTML += `
        <div class="user-message">
            ${question}
        </div>
    `;

    input.value = "";

    try {

        const response = await fetch("http://localhost:3000/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: question
            })

        });

        const data = await response.json();

        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.reply}
            </div>
        `;

    } catch (error) {

        console.log(error);

        chatBox.innerHTML += `
            <div class="bot-message">
                ❌ Sorry, AI service is unavailable.
            </div>
        `;

    }

    // Enable input again
    input.disabled = false;
    input.focus();

    chatBox.scrollTop = chatBox.scrollHeight;
}

const input = document.getElementById("question");

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        askAI();
    }
});