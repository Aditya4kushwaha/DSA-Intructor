const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const API_KEY = "AIzaSyCUyIuEAZyb6pzzyQlzuNCiM-FEwbDiU8Y";

async function sendMessage() {
  const question = userInput.value.trim();
  if (!question) return;

  appendMessage(question, "user");
  userInput.value = "";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
        API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
          systemInstruction: {
            role: "system",
            parts: [
              {
                text: `You are a Data Structure and Algorithm Instructor. You will only reply to the points related to Data Structure and Algorithm. You have to solve the user's query in the simplest way. 
If the user asks any question which is not related to Data Structure and Algorithm, reply to him rudely. 
Example: If user asks, "How are you?" 
You will reply: "You dumb, ask me some sensible question."

You have to reply rudely if the question is not related to Data Structure and Algorithm.  
Else, reply politely with a simple explanation.`,
              },
            ],
          },
        }),
      }
    );

    const data = await response.json();
    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    appendMessage(botReply, "bot");
  } catch (error) {
    appendMessage("Error: " + error.message, "bot");
  }
}

function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
