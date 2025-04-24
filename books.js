  document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });
  });
















document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("book-grid");
  const loader = document.getElementById("loader");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  loader.style.display = "block";


  const displayBooks = (books) => {
    books.forEach((book) => {
      const encodedBook = encodeURIComponent(JSON.stringify(book));
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.authors.map(a => a.name).join(', ')}</p>
        <button class="download-btn" data-book="${encodedBook}">Download Now</button>
      `;
      grid.appendChild(card);
    });
  };


  const fetchMultiplePages = async (pagesToFetch = 4) => {
    let url = "https://gutendex.com/books?languages=en";
    for (let i = 0; i < pagesToFetch; i++) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        displayBooks(data.results);

        if (!data.next) break;
        url = data.next;
      } catch (err) {
        console.error("Error fetching page", i + 1, err);
        break;
      }
    }
    loader.style.display = "none";
  };


  await fetchMultiplePages(3);


  searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query === "") return;

    grid.innerHTML = "";
    loader.style.display = "block";

    let url = `https://gutendex.com/books?search=${encodeURIComponent(query)}&languages=en`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results.length === 0) {
        grid.innerHTML = "<p>No books found. Try a different search.</p>";
      } else {
        displayBooks(data.results);
      }
    } catch (err) {
      console.error("Search error:", err);
      grid.innerHTML = "<p>Error fetching search results.</p>";
    } finally {
      loader.style.display = "none";
    }
  });


  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });


  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("download-btn")) {
      const encodedBookData = e.target.getAttribute("data-book");
      try {
        const book = JSON.parse(decodeURIComponent(encodedBookData));
        localStorage.setItem(`book-${book.id}`, JSON.stringify(book));
        alert(`"${book.title}" saved successfully!`);
        window.location.href = `read.html?id=${book.id}`;
      } catch (error) {
        console.error("Failed to parse book data:", error);
        alert("An error occurred while processing the book data.");
      }
    }
  });

  
  
});


























