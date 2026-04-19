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
    parentElement.insertAdjacentHTML("beforeend", `
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
  `);
  });
  
}

async function buildEvents(){
  const url = "https://raw.githubusercontent.com/matchatea-tech/frontend-BSWG/main/data/events/events.json";
  const response = await fetch(url);
  const events = await response.json();
  events.forEach(element => buildEvent(element));
  window.Webflow?.destroy();
  window.Webflow?.ready();
  window.Webflow?.require('ix2').init();
}

window.addEventListener("load", () => {
    buildEvents();
});
