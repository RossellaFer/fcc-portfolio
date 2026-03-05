document.addEventListener("DOMContentLoaded", function () {
  const blogContentWrapper = document.getElementById("blog-content-wrapper");
  const latestBlogsContainer = document.getElementById("latest-blogs-container");
  const searchInput = document.getElementById("blog-search");

  // Helper: Get Icon Class
  const getIconClass = (type) => {
    switch (type) {
      case 'medium': return 'fab fa-medium';
      case 'dev': return 'fab fa-dev';
      default: return 'fas fa-external-link-alt';
    }
  };

  // 1. Common Data Processing
  const allArticles = [];
  if (typeof blogData !== 'undefined') {
    blogData.forEach(yearGroup => {
      yearGroup.articles.forEach(article => {
        allArticles.push({ ...article, year: yearGroup.year });
      });
    });
  }

  // Helper: Create Article HTML
  const createArticleHtml = (article) => {
    const imageHtml = article.image
      ? `<div class="blog-card-image"><img src="${article.image}" alt="${article.title}" loading="lazy"></div>`
      : '';

    return `
      ${imageHtml}
      <div class="blog-card-content">
        <div class="blog-list-title">
          <a target="_blank" href="${article.url}">${article.title}</a>
          <div class="blog-labels">
            ${article.tags.map(tag => `<span class="label ${tag.replace('#', '').toLowerCase()}">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="blog-list-item-small">
          <span>${article.year} • ${article.readTime}</span>
          <i class="${getIconClass(article.type)}" aria-hidden="true"></i>
        </div>
      </div>
    `;
  };

  // --- BLOG PAGE LOGIC ---
  if (blogContentWrapper) {
    const categoryCounts = { all: 0, shopify: 0, devlife: 0, tutorial: 0, react: 0, sustainable: 0, seo: 0 };
    const blogList = document.createElement("ul");
    blogList.className = "blog-list";
    blogContentWrapper.appendChild(blogList);

    allArticles.forEach((article) => {
      categoryCounts.all++;
      const li = document.createElement("li");
      li.className = "blog-list-item";

      article.tags.forEach(tag => {
        const className = tag.replace('#', '').toLowerCase();
        li.classList.add(`category-${className}`);
        if (categoryCounts[className] !== undefined) categoryCounts[className]++;
      });

      li.innerHTML = createArticleHtml(article);
      blogList.appendChild(li);
    });

    const filterButtons = document.querySelectorAll(".filter-btn");
    const blogCards = document.querySelectorAll(".blog-list-item");

    const filterArticles = () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const activeFilterBtn = document.querySelector(".filter-btn.active");
      const activeFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";

      blogCards.forEach((card) => {
        const title = card.querySelector(".blog-list-title a").textContent.toLowerCase();
        const labels = Array.from(card.querySelectorAll(".label")).map(label => label.textContent.toLowerCase());
        const matchesSearch = title.includes(searchTerm) || labels.some(tag => tag.includes(searchTerm));
        const matchesTag = activeFilter === "all" || card.classList.contains(`category-${activeFilter}`);
        if (matchesSearch && matchesTag) card.classList.remove("hidden");
        else card.classList.add("hidden");
      });
    };

    if (searchInput) {
      searchInput.addEventListener("input", filterArticles);
      searchInput.addEventListener("keyup", filterArticles);
    }

    filterButtons.forEach(button => {
      const filter = button.getAttribute("data-filter");
      if (categoryCounts[filter] !== undefined) {
        button.innerHTML += ` <span class="filter-count">(${categoryCounts[filter]})</span>`;
      }
      button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        filterArticles();
      });
    });
  }

  // --- HOMEPAGE LOGIC (Latest 3) ---
  if (latestBlogsContainer && typeof blogData !== 'undefined') {
    const latestList = document.createElement("ul");
    latestList.className = "blog-list"; // Reuse same grid styles
    latestBlogsContainer.appendChild(latestList);

    // Get the first 3
    allArticles.slice(0, 3).forEach(article => {
      const li = document.createElement("li");
      li.className = "blog-list-item";
      li.innerHTML = createArticleHtml(article);
      latestList.appendChild(li);
    });
  }
});