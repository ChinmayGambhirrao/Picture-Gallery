const categoryInput = document.getElementById("categoryInput");
const searchButton = document.getElementById("searchButton");
const pictureGrid = document.getElementById("pictureGrid");

searchButton.addEventListener("click", searchPictures);

categoryInput.addEventListener("input", clearPictures);

const unsplashApiKey = "cHaUfnHKajRXiYiW6uvIsIkTVEyMMcWorOtrzeW-wYU";

async function searchPictures() {
  const category = categoryInput.value;

  pictureGrid.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${category}&per_page=10&client_id=${unsplashApiKey}`
    );
    const data = await response.json();

    const pictures = data.results;

    pictures.forEach((picture) => {
      const pictureCard = createPictureCard(picture);
      pictureGrid.appendChild(pictureCard);
    });
  } catch (error) {
    console.error("Error fetching pictures:", error);
  }
}

function clearPictures() {
  pictureGrid.innerHTML = "";
}

function createPictureCard(picture) {
  const pictureCard = document.createElement("div");
  pictureCard.classList.add("picture-card");

  const img = document.createElement("img");
  img.src = picture.urls.small;
  img.alt = picture.alt_description;

  const author = document.createElement("p");
  author.textContent = `Author: ${picture.user.name}`;

  const description = document.createElement("p");
  description.textContent = picture.description;

  const link = document.createElement("a");
  link.href = picture.links.html;
  link.textContent = "View on Unsplash";

  pictureCard.appendChild(img);
  pictureCard.appendChild(author);
  pictureCard.appendChild(description);
  pictureCard.appendChild(link);

  return pictureCard;
}
