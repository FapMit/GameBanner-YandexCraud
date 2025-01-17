let productsNode = document.querySelectorAll(".showcase__products-item");
let cartNode = document.querySelector(".cart");
let buyBtnNode = document.querySelector(".button");

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});
document.addEventListener(
  "touchover",
  (e) => {
    e.preventDefault();
  },
  true
);

productsNode.forEach((product) => {
  product.addEventListener("dragstart", (e) => {
    addToCartOnDesktop(e);
  });
  product.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      addToCartOnMobile(e);
    },
    { passive: false }
  );
});

function addToCartOnDesktop(e) {
  let selected = e.target;

  document.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("cart")) {
      if (selected) {
        selected.style.position = "absolute";

        if (!selected.style.left) {
          const rect = cartNode.getBoundingClientRect();
          let xPos = e.pageX - rect.left;
          let yPos = e.pageY - rect.top;

          [xPos, yPos] = validatePosition(xPos, yPos);

          selected.style.left = xPos + "px";
          selected.style.top = yPos + "px";
          selected.style.transform = "translate(-50%,-50%)";
          selected.style.scale = "1.2";
        }

        cartNode.appendChild(selected);

        let countProductsInCart = cartNode.querySelectorAll("img").length;
        if (countProductsInCart > 2) buyBtnNode.style.display = "block";
      }
    } else {
      selected = null;
    }
  });
}

function addToCartOnMobile(e) {
  let selected = e.target;
  const ghost = document.querySelector("img.ghost");

  document.addEventListener("touchmove", (e) => {
    try {
      if (e.target.offsetParent.classList.contains("wrapper")) {
        return;
      }
      if (selected) {
        ghost.src = e.target.src;
        ghost.style.zIndex = "20";
        ghost.style.opacity = "1";
        ghost.style.left = e.changedTouches[0].clientX + "px";
        ghost.style.top = e.changedTouches[0].clientY + "px";
        ghost.style.transform = "translate(-50%,-50%)";
        if (selected.offsetParent.classList.contains("showcase__products-item"))
          selected.style.opacity = "0";
      }
    } catch (error) {}
  });

  document.addEventListener("touchend", (e) => {
    try {
      if (
        e.target.offsetParent.classList.contains("wrapper") ||
        e.target.classList.contains("button")
      ) {
        return;
      }
      if (selected) {
        ghost.style.zIndex = "-1";
        ghost.style.opacity = "0";
        selected.style.opacity = "1";
      }
      e.preventDefault();
      const touchEndBlock = document.elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      );
      if (touchEndBlock.classList.contains("cart")) {
        if (selected) {
          selected.style.position = "absolute";

          if (!selected.style.left) {
            const rect = cartNode.getBoundingClientRect();
            let xPos = e.changedTouches[0].clientX - rect.left;
            let yPos = e.changedTouches[0].clientY - rect.top;

            [xPos, yPos] = validatePosition(xPos, yPos);

            selected.style.left = xPos + "px";
            selected.style.top = yPos + "px";
            selected.style.transform = "translate(-50%,-50%)";
            selected.style.scale = "1.2";
          }

          cartNode.appendChild(selected);

          let countProductsInCart = cartNode.querySelectorAll("img").length;
          if (countProductsInCart > 2) buyBtnNode.style.display = "block";
        }
      } else {
        selected = null;
      }
    } catch (error) {}
  });
}

function validatePosition(x, y) {
  if (x < 80) {
    x = 80;
  } else if (x > 240) {
    x = 240;
  }
  if (y < 80) {
    y = 80;
  } else if (y > 150) {
    y = 150;
  }
  return [x, y];
}
