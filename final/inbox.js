const vendorListItems = document.querySelectorAll(".vendor-list li");
const chatMessages = document.getElementById("chat-messages");
const vendorName = document.getElementById("vendor-name");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

let chats = {
  vendor1: [],
  vendor2: [],
  vendor3: []
};

let activeVendor = null;

vendorListItems.forEach(item => {
  item.addEventListener("click", () => {
    vendorListItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    activeVendor = item.dataset.vendor;
    vendorName.textContent = item.textContent;

    input.disabled = false;
    sendBtn.disabled = false;

    renderChat();
  });
});

function renderChat() {
  chatMessages.innerHTML = "";
  if (activeVendor && chats[activeVendor]) {
    chats[activeVendor].forEach(msg => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message", msg.sender);
      messageDiv.textContent = msg.text;
      chatMessages.appendChild(messageDiv);
    });
  }
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const messageText = input.value.trim();
  if (!messageText || !activeVendor) return;

  chats[activeVendor].push({ sender: "buyer", text: messageText });
  renderChat();
  input.value = "";

 
  setTimeout(() => {
    const replies = [
      "Sure, I can help with that.",
      "Yes, that’s available right now.",
      "We deliver on weekdays only.",
      "Thanks for reaching out!",
      "Would you like me to prepare an order?"
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    chats[activeVendor].push({ sender: "vendor", text: randomReply });
    renderChat();
  }, 1000);
}

const offerBtn = document.getElementById("offerBtn");

vendorListItems.forEach(item => {
  item.addEventListener("click", () => {
    activeVendor = item.dataset.vendor;
    input.disabled = false;
    sendBtn.disabled = false;
    offerBtn.disabled = false; 
    renderChat();
  });
});


offerBtn.addEventListener("click", () => {
  if (!activeVendor) return;
  const offer = prompt("Enter your offer price (A$):");
  if (!offer) return;


  chats[activeVendor].push({ sender: "buyer", text: `Offer: A$${offer}` });
  renderChat();

  setTimeout(() => {
    const replies = [
      `Thanks! I can accept A$${parseFloat(offer) + 1}.`,
      `Hmm, can you do A$${parseFloat(offer) - 1}?`,
      `Let me check, I’ll get back to you.`,
      `Deal at A$${offer}!`
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    chats[activeVendor].push({ sender: "vendor", text: randomReply });
    renderChat();
  }, 1500);
});
