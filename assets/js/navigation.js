"use strict";

const navigation = document.getElementById("guide-navigation");
const sidebar = document.querySelector(".sidebar");
const headings = Array.from(document.querySelectorAll(".guide h2[id]"))
  .filter((heading) => heading.id !== "contents");

if (navigation && sidebar && headings.length) {
  const links = new Map();
  for (const heading of headings) {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    item.append(link);
    navigation.append(item);
    links.set(heading.id, link);
  }
  sidebar.hidden = false;
  document.documentElement.classList.add("enhanced");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          for (const link of links.values()) link.removeAttribute("aria-current");
          links.get(entry.target.id).setAttribute("aria-current", "location");
        }
      }
    }, { rootMargin: "-12% 0px -65% 0px" });
    for (const heading of headings) observer.observe(heading);
  }
}
