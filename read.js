document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");
  
    const titleEl = document.getElementById("book-title");
    const contentEl = document.getElementById("book-content");
  
    if (!bookId) {
      titleEl.textContent = "No book ID provided.";
      return;
    }
  
    // Fetch book metadata using the Gutendex API
    fetch(`https://gutendex.com/books/${bookId}`)
      .then(res => res.json())
      .then(book => {
        titleEl.textContent = book.title;
  
        // Look for a plain text UTF-8 format first
        const textUrl = book.formats["text/plain; charset=utf-8"] || book.formats["text/plain"];
  
        if (!textUrl) {
          // If plain text format isn't available, check for other formats like epub
          contentEl.innerHTML = `
            <p>Download <a href="${book.formats['application/epub+zip']}" target="_blank">EPUB</a>.</p>
          `;
          return;
        }
  
        // Fetch the book's text content if a valid URL exists
        fetch(textUrl)
          .then(res => res.text())
          .then(text => {
            contentEl.textContent = text; // Display the full text of the book
          })
          .catch(err => {
            contentEl.textContent = "Failed to load book content.";
            console.error(err);
          });
      })
      .catch(err => {
        titleEl.textContent = "Failed to load book data.";
        console.error(err);
      });
  });
  