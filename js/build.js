function buildMember(element){
  const parentElement = document.getElementById(element.role);
  const link = document.createElement("a");
  link.classList.add("card", "w-inline-block");
  const pictureWrapper = document.createElement("div");
  pictureWrapper.classList.add("profile-picture-wrapper");
  const img = document.createElement("img");
  img.src = element.images.small.url;
  img.loading = "lazy";
  img.style.width = "100%";
  img.style.height = "auto";
  img.alt = "Profile Picture"
  img.srcset = `
    ${element.images.small.url} 500w,
    ${element.images.medium.url} 800w,
    ${element.images.big.url} 1536w
  `;
  img.sizes = "(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px";
  pictureWrapper.appendChild(img);
  link.appendChild(pictureWrapper);
  const h2 = document.createElement("h2");
  h2.classList.add("heading-7");
  h2.textContent = element.name;
  link.appendChild(h2);
  const email = document.createElement("div");
  email.classList.add("text-block-4");
  email.textContent = element.email;
  link.appendChild(email);
  const description = document.createElement("p");
  description.classList.add("paragraph-9");
  description.textContent = element.paragraph;
  link.appendChild(description);
  parentElement.appendChild(link);
}


async function buildMembers(){
  const url = "https://raw.githubusercontent.com/matchatea-tech/frontend-BSWG/main/data/aboutUs/members.json";
  const response = await fetch(url);
  const members = await response.json();
  members.forEach(element => buildMember(element));
}

window.addEventListener("DOMContentLoaded", () => {
    buildMembers(); 
});
