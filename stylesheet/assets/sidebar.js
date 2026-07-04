const sidebar = document.querySelector(".sidebar");

if (sidebar) {
  const toggle = document.createElement("button");
  toggle.className = "sidebar-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Toggle sidebar");
  toggle.setAttribute("aria-expanded", "true");
  toggle.innerHTML = "<span></span><span></span><span></span>";
  document.body.appendChild(toggle);

  toggle.addEventListener("click", () => {
    const isHidden = document.body.classList.toggle("sidebar-hidden");
    toggle.setAttribute("aria-expanded", String(!isHidden));
  });
}
