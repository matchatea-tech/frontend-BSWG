function buildMember(element){
  const parentElement = document.getElementById(element.role);
  const link = document.createElement("a");
  link.classList.add("card", "w-inline-block");
  const pictureWrapper = document.createElement("div");
  pictureWrapper.classList.add("profile-picture-wrapper");
  const img = document.createElement("img");
  img.src = element.images.small.url;
  img.loading = "lazy";
  img.alt = "Profile Picture"
  img.srcset = `
    ${element.images.small.url} 500w,
    ${element.images.medium.url} 800w,
    ${element.images.big.url} 1536w
  `;
  img.sizes = "(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px";
  img.classList.add("image-5");
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


function buildEvent(element){
  const date = new Date(element.date_full);
  const today = new Date();
  today.setHours(0,0,0,0);
  date.setHours(0,0,0,0);
  const parentElements = [];
  parentElements.push(document.getElementById("all_events"))
  if (date < today){
    parentElements.push(document.getElementById("past_events"));
  }
  else{
    parentElements.push(document.getElementById("upcoming_events"));
  }
  const formattedDate = new Date(element.date_full).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  parentElements.forEach(parentElement => {
    parentElement.innerHTML += `
    <h3 class="heading-10">${formattedDate}</h3>
    <div class="w-layout-grid grid-5">
      <h3 class="heading-11">
        ${element.title}
      </h3>
      <p class="paragraph-10">
        ${element.paragraph}
      </p>
      <div class="div-block-8" style="opacity: 1; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg); transform-style: preserve-3d;">
        <ul class="list">
          <li><span class="text-span-2">When:</span> ${formattedDate}</li>
          <li class="list-item-2"><span class="text-span-2">Where:</span> ${element.location}</li>
          <li class="list-item-3">
            <span class="text-span-2 text-cta-cc">Want to join us ?</span>
            Contact ${element.join_contact}
          </li>
        </ul>
      </div>
    </div>
  `;
  });
  
}


async function buildMembers(){
  const url = "https://raw.githubusercontent.com/matchatea-tech/frontend-BSWG/main/data/aboutUs/members.json";
  const response = await fetch(url);
  const members = await response.json();
  members.forEach(element => buildMember(element));
}

async function buildEvents(){
  const url = "https://raw.githubusercontent.com/matchatea-tech/frontend-BSWG/main/data/events/events.json";
  const response = await fetch(url);
  const events = await response.json();
  events.forEach(element => buildEvent(element));
}

window.addEventListener("DOMContentLoaded", () => {
    //buildMembers();
    buildEvents();
});
