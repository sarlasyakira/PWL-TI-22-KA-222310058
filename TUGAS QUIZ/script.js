const input = document.getElementById("messageInput");
const button = document.getElementById("sendButton");
const chatBox = document.querySelector(".chat-messages");

button.addEventListener("click", () => {
  const text = input.value.trim();
  if (text !== "") {
    const msg = document.createElement("div");
    msg.classList.add("message", "positive");
    msg.innerHTML = `
      <p class="text">${text}</p>
      <div class="meta">
        <span class="sentiment-tag positive">POSITIVE</span>
        <span class="timestamp">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    `;
    chatBox.appendChild(msg);
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
