(function () {
  const searchInput = document.querySelector('input[type="search"]');
  if (!searchInput) return;

  function getCards() {
    return Array.from(document.querySelectorAll(".grid .card, .category-grid .card, main .card"));
  }
  const resultsSection = document.getElementById("search-results");
  const resultsList = document.getElementById("results-list");
  const resultsEmpty = document.getElementById("results-empty");
  const currentPage = document.body.getAttribute("data-page") || "index.html";

  const SEARCH_DATA = [
    { title: "Michigan Online Logo (Horizontal)", page: "index.html", url: "index.html#asset-mo-logo", keywords: "course images michiganOnline.png logo horizontal" },
    { title: "University of Michigan Logo", page: "index.html", url: "index.html#asset-umich-logo", keywords: "course images umichlogo.png logo" },
    { title: "Video icon", page: "index.html", url: "index.html#asset-video-icon", keywords: "icons video.png video" },
    { title: "Discussion icon", page: "index.html", url: "index.html#asset-discussion-icon", keywords: "icons discussion.png comment" },
    { title: "Objectives icon", page: "index.html", url: "index.html#asset-objectives-icon", keywords: "icons objectives.png light bulb lightbulb" },
    { title: "Overview icon", page: "index.html", url: "index.html#asset-overview-icon", keywords: "icons overview.png clipboard" },
    { title: "Reading icon", page: "index.html", url: "index.html#asset-reading-icon", keywords: "icons reading.png book page" },
    { title: "Star icon", page: "index.html", url: "index.html#asset-star-icon", keywords: "icons star.png star" },
    { title: "Time icon", page: "index.html", url: "index.html#asset-time-icon", keywords: "icons time.png clock" },
    { title: "Text Block Section", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-text-block", keywords: "new canvas text block section h2 h3 h4 paragraph" },
    { title: "Heading 2", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-heading-h2", keywords: "new canvas heading h2 text block section title" },
    { title: "Heading 3", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-heading-h3", keywords: "new canvas heading h3 accent line text block" },
    { title: "Heading 4", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-heading-h4", keywords: "new canvas heading h4 text block" },
    { title: "Information Callout Box", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-callout-info", keywords: "new canvas callout box information tag takeaway definition" },
    { title: "Action Callout Box", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-callout-action", keywords: "new canvas callout box action reflection prompt tag" },
    { title: "Highlight Callout Box", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-callout-highlight", keywords: "new canvas callout box highlight warning emphasis tag" },
    { title: "Video Block", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-video-block", keywords: "new canvas video block lecture tag text block" },
    { title: "Guest Lecture Video Block", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-video-block-highlight", keywords: "new canvas video block guest lecture highlight" },
    { title: "Blue Video Block", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-video-block-blue", keywords: "new canvas video block blue tag" },
    { title: "Accordion", page: "new-canvas-elements.html", url: "new-canvas-elements.html#new-canvas-accordion", keywords: "new canvas accordion details summary faq frequently asked accordions" },
    { title: "Snippet checklist", page: "snippets.html", url: "snippets.html#snippet-checklist", keywords: "snippet rules checklist role presentation alt width height base url icons" }
  ];
  const dynamicSearchData = [];

  function normalize(text) {
    return text.toLowerCase().replace(/\s+/g, " ").trim();
  }

  function renderOtherResults(query) {
    if (!resultsSection || !resultsList || !resultsEmpty) return;
    if (!query) {
      resultsSection.hidden = true;
      return;
    }

    const matches = SEARCH_DATA.concat(dynamicSearchData).filter((item) => {
      if (item.page === currentPage) return false;
      const haystack = normalize(item.title + " " + item.keywords);
      return haystack.includes(query);
    });

    resultsList.innerHTML = matches
      .map((item) => {
        return (
          '<li class="result-item">' +
          '<a href="' + item.url + '">' + item.title + "</a>" +
          '<div class="result-meta">From ' + item.page + "</div>" +
          "</li>"
        );
      })
      .join("");

    resultsEmpty.hidden = matches.length > 0;
    resultsSection.hidden = false;
  }

  function filterCards(query) {
    getCards().forEach((card) => {
      const haystack = card.dataset.search || normalize(card.textContent);
      card.dataset.search = haystack;
      const match = !query || haystack.includes(query);
      card.style.display = match ? "" : "none";
    });
  }

  searchInput.addEventListener("input", () => {
    const query = normalize(searchInput.value);
    filterCards(query);
    renderOtherResults(query);
  });

  fetch("elements.json")
    .then((res) => (res.ok ? res.json() : []))
    .then((items) => {
      if (!Array.isArray(items)) return;
      items.forEach((item) => {
        if (!item || !item.title || !item.id) return;
        dynamicSearchData.push({
          title: item.title,
          page: "html-elements.html",
          url: "html-elements.html#" + item.id,
          keywords: item.keywords || ""
        });
      });
      if (searchInput.value) {
        const query = normalize(searchInput.value);
        renderOtherResults(query);
      }
    })
    .catch(() => {});
})();
