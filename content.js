if (window.location.href.includes("linkedin.com/in/")) {
  addUserInfoBoxAfterLoad();
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "url-change") addUserInfoBoxAfterLoad();
});

async function addUserInfoBox() {
  const randomUser = await getRandomUser();
  const newSection = document.createElement("section");
  newSection.className = "leadjet-user-info-box";
  newSection.innerHTML = builProfileBoxHtml(randomUser);
  document
    .getElementById("main")
    .insertBefore(newSection, document.getElementById("main").children[1]);

  async function getRandomUser() {
    const response = await fetch("https://randomuser.me/api/");
    const responseJson = await response.json();
    const randomUser = responseJson.results[0];
    return randomUser;
  }

  function builProfileBoxHtml(user) {
    return `
      <div>
        <div>${user.name.first} ${user.name.last}</div>
        <div>${user.email}</div>
        <div>${user.phone}</div>
        <div>${user.location.city} (${user.location.country})</div>
      </div>
    `;
  }
}

function addUserInfoBoxAfterLoad() {
  const observer = new MutationObserver(observerCallback);
  const mainElement = document.getElementById("main");
  observer.observe(mainElement, { childList: true });

  function observerCallback(mutations, observer) {
    const mainElement = document.getElementById("main");
    const isLoading =
      mainElement.firstElementChild.nextElementSibling.className.includes(
        "load"
      );
    if (!isLoading) {
      addUserInfoBox();
      observer.disconnect();
    }
  }
}
