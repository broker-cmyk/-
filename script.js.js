const properties = [];
const adminCredentials = {
  username: "مهد احمد علي",
  password: "01156342313مهد@"
};

// تتبع عدد الزيارات للموقع
function trackSiteVisit() {
  let siteVisits = localStorage.getItem("siteVisits") || 0;
  siteVisits = parseInt(siteVisits) + 1;
  localStorage.setItem("siteVisits", siteVisits);
  document.getElementById("siteVisits").textContent = `عدد الزيارات للموقع: ${siteVisits}`;
}

// تتبع عدد الزيارات للعقار
function trackPropertyVisit(propertyTitle) {
  let propertyVisits = localStorage.getItem(propertyTitle) || 0;
  propertyVisits = parseInt(propertyVisits) + 1;
  localStorage.setItem(propertyTitle, propertyVisits);
  return propertyVisits;
}

function displayProperties(filteredProperties = properties) {
  const propertyListContainer = document.getElementById("property-list");
  propertyListContainer.innerHTML = "";

  filteredProperties.forEach((property, index) => {
    const propertyCard = document.createElement("div");
    propertyCard.classList.add("property-card");

    // تتبع الزيارة لكل عقار
    const propertyVisits = trackPropertyVisit(property.title);

    propertyCard.innerHTML = `
      <img src="${property.imageUrl}" alt="${property.title}">
      <div>
        <h3>${property.title}</h3>
        <p>الموقع: ${property.location}</p>
        <p>السعر: ${property.price} جنيه</p>
        <p>المساحة: ${property.size} م²</p>
        <p>الوصف: ${property.description}</p>
        <p>عدد الزيارات: ${propertyVisits}</p>
        ${property.videoUrl ? `<iframe src="${property.videoUrl}" style="width:100%; height:200px;"></iframe>` : ""}
        <button onclick="deleteProperty(${index})">حذف العقار</button>
      </div>
    `;
    propertyListContainer.appendChild(propertyCard);
  });
}

// حذف العقار من القائمة
function deleteProperty(index) {
  properties.splice(index, 1); // إزالة العقار من القائمة
  displayProperties(); // إعادة عرض العقارات بعد الحذف
}

function adminLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginError = document.getElementById("loginError");

  if (username === adminCredentials.username && password === adminCredentials.password) {
    document.getElementById("admin-login").classList.add("hidden");
    document.getElementById("admin-section").classList.remove("hidden");
  } else {
    loginError.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
  }
}

function submitProperty(event) {
  event.preventDefault();

  const title = document.getElementById("propertyTitle").value;
  const location = document.getElementById("propertyLocation").value;
  const price = document.getElementById("propertyPrice").value;
  const size = document.getElementById("propertySize").value;
  const imageUrl = document.getElementById("propertyImageUrl").value;
  const description = document.getElementById("propertyDescription").value;
  const videoUrl = document.getElementById("propertyVideoUrl").value;

  properties.push({ title, location, price, size, imageUrl, description, videoUrl });
  displayProperties();
}

function clearProperties() {
  properties.length = 0;
  displayProperties();
}

function filterProperties() {
  const locationFilter = document.getElementById("locationFilter").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;
  const minSize = document.getElementById("minSize").value;

  const filteredProperties = properties.filter(property => {
    return (
      (locationFilter ? property.location.includes(locationFilter) : true) &&
      (minPrice ? property.price >= minPrice : true) &&
      (maxPrice ? property.price <= maxPrice : true) &&
      (minSize ? property.size >= minSize : true)
    );
  });

  displayProperties(filteredProperties);
}

function sortPropertiesByPrice() {
  const sortedProperties = [...properties].sort((a, b) => a.price - b.price);
  displayProperties(sortedProperties);
}

window.onload = trackSiteVisit;
