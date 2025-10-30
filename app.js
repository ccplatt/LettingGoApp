const emotions = [
  {
    name: "fear",
    label: "Fear & Anxiety",
    color: "fear",
    subEmotions: ["Nervous", "Worried", "Overwhelmed", "Powerless", "Panicked", "Guarded"],
  },
  {
    name: "sadness",
    label: "Sad & Low",
    color: "sadness",
    subEmotions: ["Lonely", "Grieving", "Disappointed", "Hopeless", "Drained", "Melancholic"],
  },
  {
    name: "guilt",
    label: "Guilt & Shame",
    color: "guilt",
    subEmotions: ["Regretful", "Embarrassed", "Self-critical", "Remorseful", "Burdened", "Exposed"],
  },
  {
    name: "anger",
    label: "Anger & Irritation",
    color: "anger",
    subEmotions: ["Frustrated", "Resentful", "Agitated", "Defensive", "Impatient", "Hostile"],
  },
  {
    name: "desire",
    label: "Desire & Craving",
    color: "desire",
    subEmotions: ["Longing", "Tempted", "Obsessed", "Fascinated", "Driven", "Infatuated"],
  },
  {
    name: "depression",
    label: "Apathy & Depression",
    color: "depression",
    subEmotions: ["Numb", "Indifferent", "Detached", "Heavy", "Withdrawn", "Deflated"],
  },
];

const clustersContainer = document.querySelector("#clusters");
const template = document.querySelector("#cluster-template");

const closeOthers = (currentEl) => {
  document.querySelectorAll(".cluster").forEach((cluster) => {
    if (cluster !== currentEl) {
      cluster.dataset.expanded = "false";
    }
  });
};

const createSubBubble = (label) => {
  const bubble = document.createElement("span");
  bubble.className = "sub-bubble";
  bubble.textContent = label;
  return bubble;
};

const buildCluster = (emotion) => {
  const clone = template.content.firstElementChild.cloneNode(true);
  clone.dataset.color = emotion.color;
  clone.dataset.expanded = "false";

  const bubble = clone.querySelector(".cluster__bubble");
  const label = clone.querySelector(".cluster__label");
  const heading = clone.querySelector(".cluster__heading");
  const cloud = clone.querySelector(".cluster__cloud");

  label.textContent = emotion.label;
  heading.textContent = `${emotion.label} feelings`;

  emotion.subEmotions.forEach((sub) => cloud.appendChild(createSubBubble(sub)));

  bubble.addEventListener("click", () => {
    const wasExpanded = clone.dataset.expanded === "true";
    closeOthers(clone);
    clone.dataset.expanded = wasExpanded ? "false" : "true";
  });

  return clone;
};

const init = () => {
  const fragment = document.createDocumentFragment();
  emotions.forEach((emotion) => fragment.appendChild(buildCluster(emotion)));
  clustersContainer.appendChild(fragment);
};

init();
