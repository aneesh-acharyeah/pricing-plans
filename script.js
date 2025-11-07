
// Persist selection
const STORAGE_KEY = "billing_cycle"; // 'monthly' | 'yearly'
const switchEl = document.getElementById("billingSwitch");
const priceEls = document.querySelectorAll(".price");

function formatPrice(n) {
  return `$${n}`;
}
function applyCycle(cycle) {
  priceEls.forEach((el) => {
    const monthly = parseFloat(el.dataset.month);
    const yearly  = parseFloat(el.dataset.year);
    const span = el.querySelector("span");

    // animation class
    el.classList.add("updating");

    // update number + suffix
    if (cycle === "yearly") {
      el.firstChild.nodeValue = formatPrice(yearly);
      span.textContent = "/yr";
    } else {
      el.firstChild.nodeValue = formatPrice(monthly);
      span.textContent = "/mo";
    }

    // end animation
    setTimeout(() => el.classList.remove("updating"), 180);
  });

  localStorage.setItem(STORAGE_KEY, cycle);
  switchEl.checked = (cycle === "yearly");
}

function init() {
  const saved = localStorage.getItem(STORAGE_KEY);
  applyCycle(saved === "yearly" ? "yearly" : "monthly");
  switchEl.addEventListener("change", () => {
    applyCycle(switchEl.checked ? "yearly" : "monthly");
  });
}
init();
