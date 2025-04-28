<script>
  document.addEventListener("DOMContentLoaded", function () {
    // Delegate clicks from header links
    document.querySelector("header").addEventListener("click", function (e) {
      const link = e.target.closest("a");

      if (link && link.href && !link.href.includes("http") && !link.href.includes("mailto") && !link.href.includes("tel")) {
        e.preventDefault();
        const url = link.getAttribute("href");

        fetch(url)
          .then(res => res.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const content = doc.querySelector("#main-content") || doc.body;

            document.querySelector("#main-content").innerHTML = content.innerHTML;
            window.history.pushState({}, "", url); // Update URL without reload
          })
          .catch(err => {
            console.error("Failed to load page:", err);
            document.querySelector("#main-content").innerHTML = "<p>Error loading content.</p>";
          });
      }
    });

    // Support browser back/forward
    window.addEventListener("popstate", () => {
      fetch(location.pathname)
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const content = doc.querySelector("#main-content") || doc.body;
          document.querySelector("#main-content").innerHTML = content.innerHTML;
        });
    });
  });
</script>
