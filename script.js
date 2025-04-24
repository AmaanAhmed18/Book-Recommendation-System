// document.addEventListener("DOMContentLoaded", function () {
//   const toggle = document.getElementById('menu-toggle');
//   const navLinks = document.getElementById('nav-links');

//   toggle.addEventListener('click', function () {
//     navLinks.classList.toggle('show');
//   });
// });






  // const HF_API_KEY = "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"; // Replace with your key
  // let booksWithEmbeddings = [];
  
  // document.addEventListener("DOMContentLoaded", async () => {
  //   document.getElementById('menu-toggle').addEventListener('click', () => {
  //     document.getElementById('nav-links').classList.toggle('show');
  //   });
  
  //   await loadBooks();
  // });
  
  // async function loadBooks() {
  //   const books = [];
  //   for (let i = 1; i <= 4; i++) {
  //     const res = await fetch(`https://gutendex.com/books?languages=en&page=${i}`);
  //     const data = await res.json();
  //     books.push(...data.results);
  //   }
  
  //   for (let book of books) {
  //     const text = `${book.title} by ${book.authors.map(a => a.name).join(', ')}. Subjects: ${book.subjects.slice(0, 5).join(', ')}`;
  //     const embedding = await embedText(text);
  //     booksWithEmbeddings.push({
  //       id: book.id,
  //       title: book.title,
  //       author: book.authors[0]?.name || "Unknown",
  //       subjects: book.subjects,
  //       description: text,
  //       embedding: embedding
  //     });
  //   }
  
  //   console.log("Books loaded:", booksWithEmbeddings.length);
  // }
  
  // async function embedText(text) {
  //   try {
  //     const res = await fetch("https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${HF_API_KEY}`,
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ inputs: text })
  //     });
  
  //     const result = await res.json();
  
  //     if (Array.isArray(result)) {
  //       return result[0];
  //     }
  //     console.error("Invalid embedding result:", result);
  //     return null;
  //   } catch (err) {
  //     console.error("Embedding error:", err);
  //     return null;
  //   }
  // }
  
  // function cosineSimilarity(a, b) {
  //   const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  //   const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  //   const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  //   return dot / (magA * magB);
  // }
  
  // function isGreeting(message) {
  //   const greetings = ["hi", "hello", "hey", "hola", "namaste", "what's up"];
  //   return greetings.includes(message.toLowerCase());
  // }
  
  // function isBookRelated(message) {
  //   const keywords = ["book", "novel", "read", "recommend", "story", "author", "literature", "genre", "title"];
  //   return keywords.some(kw => message.toLowerCase().includes(kw));
  // }
  
  // async function sendMessage() {
  //   const input = document.getElementById("userInput");
  //   const chatBox = document.getElementById("chatBox");
  //   const userMsg = input.value.trim();
  
  //   if (userMsg === "") return;
  
  //   chatBox.innerHTML += `<div class="user-msg">${userMsg}</div>`;
  //   chatBox.innerHTML += `<div class="bot-msg">Thinking... 🤔</div>`;
  //   input.value = "";
  //   chatBox.scrollTop = chatBox.scrollHeight;
  
   
  //   if (isGreeting(userMsg)) {
  //     chatBox.lastChild.innerHTML = "Hey there! 👋 Looking for book suggestions?";
  //     return;
  //   }
  
   
  //   if (!isBookRelated(userMsg)) {
  //     chatBox.lastChild.innerHTML = "I can only help with book-related questions 📚. Try asking for a book recommendation!";
  //     return;
  //   }
  
  
  //   if (booksWithEmbeddings.length === 0) {
  //     chatBox.lastChild.innerHTML = "Book data not loaded. Please try again later.";
  //     return;
  //   }
  
   
  //   const userEmbed = await embedText(userMsg);
  //   if (!userEmbed) {
  //     chatBox.lastChild.innerHTML = "Sorry, I couldn't understand that. 😕";
  //     return;
  //   }
  
    
  //   const scoredBooks = booksWithEmbeddings
  //     .map(book => ({
  //       ...book,
  //       similarity: cosineSimilarity(userEmbed, book.embedding)
  //     }))
  //     .sort((a, b) => b.similarity - a.similarity)
  //     .filter(book => book.similarity > 0.3) // Threshold
  //     .slice(0, 3);
  
  //   let botReply = "Hmm... I couldn't find anything that matches your interest. Try rephrasing your query.";
  //   if (scoredBooks.length > 0) {
  //     botReply = "Here are some books you might like:<br><br>";
  //     botReply += scoredBooks.map(book =>
  //       `📘 <strong>${book.title}</strong> by ${book.author}<br>Topics: ${book.subjects.slice(0, 3).join(", ")}`
  //     ).join("<br><br>");
  //   }
  
  //   setTimeout(() => {
  //     chatBox.lastChild.innerHTML = botReply;
  //     chatBox.scrollTop = chatBox.scrollHeight;
  //   }, 800);
  // }
  











  

const HF_API_KEY = "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"; // Replace with your key
let booksWithEmbeddings = [];



document.addEventListener("DOMContentLoaded", async () => {
      document.getElementById('menu-toggle').addEventListener('click', () => {
      document.getElementById('nav-links').classList.toggle('show');
    });
  await loadBooks();
});

async function loadBooks() {
  const books = [];
  for (let i = 1; i <= 4; i++) {
    const res = await fetch(`https://gutendex.com/books?languages=en&page=${i}`);
    const data = await res.json();
    books.push(...data.results);
  }

  for (let book of books) {
    const text = `${book.title} by ${book.authors.map(a => a.name).join(', ')}. Subjects: ${book.subjects.slice(0, 5).join(', ')}`;
    const embedding = await embedText(text);
    if (embedding) {
      booksWithEmbeddings.push({
        id: book.id,
        title: book.title,
        author: book.authors[0]?.name || "Unknown",
        subjects: book.subjects,
        description: text,
        embedding: embedding
      });
    }
  }

  console.log("Books loaded:", booksWithEmbeddings.length);
}

async function embedText(text) {
  try {
    const res = await fetch("https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text })
    });

    const result = await res.json();
    console.log("Embedding API response:", result);

    if (Array.isArray(result)) {
      if (Array.isArray(result[0])) return result[0];
      if (typeof result[0] === "number") return result;
    }

    if (result.error) {
      console.error("HuggingFace API error:", result.error);
    } else {
      console.error("Unexpected embedding format:", result);
    }

    return null;
  } catch (err) {
    console.error("Embedding error:", err);
    return null;
  }
}

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
    console.error("Invalid vectors for cosine similarity", { a, b });
    return 0;
  }

  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

function isGreeting(message) {
  const greetings = ["hi", "hello", "hey", "hola", "namaste", "what's up"];
  return greetings.includes(message.toLowerCase());
}

function isBookRelated(message) {
  const keywords = ["book", "novel", "read", "recommend", "story", "author", "literature", "genre", "title"];
  return keywords.some(kw => message.toLowerCase().includes(kw));
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const userMsg = input.value.trim();

  if (userMsg === "") return;

  chatBox.innerHTML += `<div class="user-msg">${userMsg}</div>`;
  chatBox.innerHTML += `<div class="bot-msg">Thinking... 🤔</div>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  if (isGreeting(userMsg)) {
    chatBox.lastChild.innerHTML = "Hey there! 👋 Looking for book suggestions?";
    return;
  }

  if (!isBookRelated(userMsg)) {
    chatBox.lastChild.innerHTML = "I can only help with book-related questions 📚. Try asking for a book recommendation!";
    return;
  }

  if (booksWithEmbeddings.length === 0) {
    chatBox.lastChild.innerHTML = "Book data not loaded. Please try again later.";
    return;
  }

  const userEmbed = await embedText(userMsg);
  if (!userEmbed) {
    chatBox.lastChild.innerHTML = "Sorry, I couldn't understand that. 😕";
    return;
  }

  const scoredBooks = booksWithEmbeddings
    .map(book => ({
      ...book,
      similarity: cosineSimilarity(userEmbed, book.embedding)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .filter(book => book.similarity > 0.3)
    .slice(0, 3);

  let botReply = "Hmm... I couldn't find anything that matches your interest. Try rephrasing your query.";
  if (scoredBooks.length > 0) {
    botReply = "Here are some books you might like:<br><br>";
    botReply += scoredBooks.map(book =>
      `📘 <strong>${book.title}</strong> by ${book.author}<br>Topics: ${book.subjects.slice(0, 3).join(", ")}`
    ).join("<br><br>");
  }

  setTimeout(() => {
    chatBox.lastChild.innerHTML = botReply;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 800);
}

  
