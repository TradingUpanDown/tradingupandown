
document.addEventListener("DOMContentLoaded", function () {
  const includes = {
    "top-ad-placeholder": "top-ad.html",
    "header-placeholder": "header.html",
    "sidebar-left-placeholder": "sidebar-left.html",
    "main-content-placeholder": "main-content.html",
    "sidebar-right-placeholder": "sidebar-right.html",
    "footer-placeholder": "footer.html"
  };

  for (const [id, file] of Object.entries(includes)) {
    const el = document.getElementById(id);
    if (el) {
      fetch(file)
        .then(res => res.text())
        .then(html => el.innerHTML = html);
    }
  }
}
);