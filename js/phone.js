const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  console.log("is show all", isShowAll);
  // phones = phones.slice(0, 12);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = "card w-96 bg-gray-100 shadow-xl";

    phoneCard.innerHTML = `  
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;

    phoneContainer.appendChild(phoneCard);
  });
  //hide sppiner
  toggleLoadingSppiner(false);
};

//handle search

const handleSearch = (isShowAll) => {
  toggleLoadingSppiner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSppiner = (isLoading) => {
  const loadingSppiner = document.getElementById("loading-sppiner");
  if (isLoading) {
    loadingSppiner.classList.remove("hidden");
  } else {
    loadingSppiner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

const handleShowDetails = async (id) => {
  // console.log('clicked');
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const detailData = data.data;

  console.log(detailData);
  showPhoneDetails(detailData);
};

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");

  showDetailContainer.innerHTML = `
   <img src="${phone.image}" alt="" />
   <p><span>Stroge :</span> ${phone?.mainFeatures?.storage}</p>
   <p><span>Gps :</span> ${phone?.others?.GPS}</p>
  
  `;
  show_details_modal.showModal();
};

loadPhone("iphone",true);
