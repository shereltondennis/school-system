const sidebar = document.querySelector(".sidebar");

if (sidebar) {
  const toggle = document.createElement("button");
  toggle.className = "sidebar-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Toggle sidebar");
  toggle.innerHTML = "<span></span><span></span><span></span>";
  document.body.appendChild(toggle);

  const setSidebarOpen = (isOpen) => {
    document.body.classList.toggle("sidebar-hidden", !isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close sidebar" : "Open sidebar");
    localStorage.setItem("sidebarOpen", String(isOpen));
  };

  setSidebarOpen(localStorage.getItem("sidebarOpen") === "true");

  toggle.addEventListener("click", () => {
    setSidebarOpen(document.body.classList.contains("sidebar-hidden"));
  });

  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setSidebarOpen(false);
    });
  });
}
