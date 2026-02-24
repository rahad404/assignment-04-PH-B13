// list for interview and rejected cards
let interviewList = [];
let rejectedList = [];
let allCardsList = [];
let currentStatus = 'all';

// cards
let total = document.getElementById('total');
let total2 = document.getElementById('total-number');
let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');

let allCards = document.getElementById('all-cards');

// buttons
let allTabBtn = document.getElementById('all-tab-btn');
let interviewTabBtn = document.getElementById('interview-tab-btn');
let rejectTabBtn = document.getElementById('reject-tab-btn'); 


//------------{ change button color }---------------------
function changeButtonColor(activeBtn){
    allTabBtn.classList.remove('btn-primary');
    interviewTabBtn.classList.remove('btn-primary');
    rejectTabBtn.classList.remove('btn-primary');

    activeBtn.classList.add('btn-primary');
}

//----------------{ tab button functionality }-------------------------

// all tab button 
allTabBtn.addEventListener('click', function(){
    changeButtonColor(allTabBtn);
    currentStatus = 'all';

    filteredSection.classList.add('hidden');
    allCards.classList.remove('hidden');
});

// interview tab button 
interviewTabBtn.addEventListener('click', function(){
    changeButtonColor(interviewTabBtn);
    currentStatus = 'interview';

    allCards.classList.add('hidden');
    filteredSection.classList.remove('hidden');
    renderInterviewCards();
});

// reject tab button 
rejectTabBtn.addEventListener('click', function(){
    changeButtonColor(rejectTabBtn);
    currentStatus = 'rejected';

    allCards.classList.add('hidden');
    filteredSection.classList.remove('hidden');
    renderRejectedCards();
});

//----------------{ number count in card }------------------
// set stat card total number  
function calculateCount(){
    let x = allCards.children.length;
    total.innerText = x;
    total2.innerText = x;

    interview.innerText = interviewList.length;
    rejected.innerText = rejectedList.length;
}
calculateCount();

//-----------------------{ mak change in all section even if toggle in interview/rejected }---------------------------------------
// list all cards in the beginning and store in allCardsList
function listAllCards(){
    let x = allCards.children;
    console.log(x);
    for(let card of x){
        let companyName = card.querySelector('.company-name').innerText;
        let position = card.querySelector('.position').innerText;
        let info = card.querySelector('.info').innerText;
        let status = card.querySelector('.badge').innerText;
        let description = card.querySelector('.description').innerText;

        const cardInfo = {
            companyName,
            position,
            info,
            status,
            description
        }

        allCardsList.push(cardInfo);
    }
}  
listAllCards();

// Function to update badge in allCardsList and All tab view
function updateAllTabBadge(companyName, newStatus){
    const cardInAll = allCardsList.find(card => card.companyName === companyName);
    if(cardInAll){
        cardInAll.status = newStatus;
    }
    
    // Always update badge in All tab (whether visible or hidden)
    const allCardDivs = allCards.querySelectorAll('.card');
    for(let div of allCardDivs){
        const nameElement = div.querySelector('.company-name');
        if(nameElement && nameElement.innerText === companyName){
            div.querySelector('.badge').innerText = newStatus;
            break;
        }
    }
}


//----------------------------{ card button functionality like(interview/rejected)}---------------------------------
// event delegation for cards
let mainContainer = document.querySelector('main');
let filteredSection = document.getElementById('filtered-section');


// main functionality for interview and rejected button
mainContainer.addEventListener('click', function(event){
    // console.log(event.target.classList.contains('btn-interview'));

    if(event.target.classList.contains('btn-interview')){
        const parentCard = event.target.parentNode.parentNode;
        const companyName = parentCard.querySelector('.company-name').innerText;
        const position = parentCard.querySelector('.position').innerText;
        const info = parentCard.querySelector('.info').innerText;
        const status = parentCard.querySelector('.badge').innerText;
        const description = parentCard.querySelector('.description').innerText;
    
        const cardInfo = {
            companyName,
            position,
            info,
            status,
            description
        }
    
        const jobExist = interviewList.find(job=> job.companyName === cardInfo.companyName);
        const jobInRejected = rejectedList.find(job=> job.companyName === cardInfo.companyName);
        
        parentCard.querySelector('.badge').innerText = 'INTERVIEW';
    
        if(!jobExist){
            cardInfo.status = 'INTERVIEW';
            interviewList.push(cardInfo);
        }

        // Remove from rejected list if it exists there
        if(jobInRejected){
            rejectedList = rejectedList.filter(job => job.companyName !== cardInfo.companyName);
        }

        // Update All tab badge
        updateAllTabBadge(companyName, 'INTERVIEW');

        calculateCount();
        
        // Re-render current active tab to show latest data
        if(currentStatus === 'interview') renderInterviewCards();
        if(currentStatus === 'rejected') renderRejectedCards();
    }
    else if(event.target.classList.contains('btn-rejected')){
        const parentCard = event.target.parentNode.parentNode;
        const companyName = parentCard.querySelector('.company-name').innerText;
        const position = parentCard.querySelector('.position').innerText;
        const info = parentCard.querySelector('.info').innerText;
        const status = parentCard.querySelector('.badge').innerText;
        const description = parentCard.querySelector('.description').innerText;
    
        const cardInfo = {
            companyName,
            position,
            info,
            status,
            description
        }
    
        const jobExist = rejectedList.find(job=> job.companyName === cardInfo.companyName);
        const jobInInterview = interviewList.find(job=> job.companyName === cardInfo.companyName);
        
        parentCard.querySelector('.badge').innerText = 'REJECTED';
    
        if(!jobExist){
            cardInfo.status = 'REJECTED';
            rejectedList.push(cardInfo);
        }

        // Remove from interview list if it exists there
        if(jobInInterview){
            interviewList = interviewList.filter(job => job.companyName !== cardInfo.companyName);
        }

        // Update All tab badge
        updateAllTabBadge(companyName, 'REJECTED');

        calculateCount();
        
        // Re-render current active tab to show latest data
        if(currentStatus === 'interview') renderInterviewCards();
        if(currentStatus === 'rejected') renderRejectedCards();
    }
    else if(event.target.closest('.delete-btn')){
        const parentCard = event.target.closest('.card');
        const companyName = parentCard.querySelector('.company-name').innerText;
        
        // Remove from all lists
        allCardsList = allCardsList.filter(card => card.companyName !== companyName);
        interviewList = interviewList.filter(job => job.companyName !== companyName);
        rejectedList = rejectedList.filter(job => job.companyName !== companyName);
        
        // Remove from DOM
        parentCard.remove();
        
        // remove from All tab
        const allCardDivs = allCards.querySelectorAll('.card');
        for(let card of allCardDivs){
            const nameElement = card.querySelector('.company-name');
            if(nameElement && nameElement.innerText === companyName){
                card.remove();
                break;
            }
        }
        
        calculateCount();
        
        // Re-render current active tab
        if(currentStatus === 'interview') renderInterviewCards();
        if(currentStatus === 'rejected') renderRejectedCards();
    }
});

///------------------------------------{ render cards }-------------------------
// render interciew card function 
function renderInterviewCards(){
    filteredSection.innerHTML = '';
    if(interviewList.length === 0){
        let div = document.createElement('div');
        div.className = 'card flex-row justify-center p-8 mt-4'
        div.innerHTML= `
            <div class="flex flex-col items-center justify-center text-center py-16 px-6 bg-base-200 rounded-2xl shadow-sm">
                <img src="./img/jobs.png" alt="No jobs available" class="w-40 opacity-80 mb-6">
                <h2 class="text-2xl font-bold text-base-content">No jobs available</h2>
                <p class="text-base-content/60 mt-2 max-w-md">Check back soon for new job opportunities.</p>
            </div>
        `;
        filteredSection.appendChild(div);
    }
    else{
        filteredSection.innerHTML = '';
        for(let interviewCard of interviewList){
            let div = document.createElement('div');
            div.className = 'card flex-row justify-between p-8 mt-4'
            div.innerHTML= `
                <div class="flex flex-col gap-4">
                    <div>
                        <h2 class="company-name card-title text-2xl">${interviewCard.companyName}</h2>
                        <p class="position text-xl text-gray-500 mt-1">${interviewCard.position}</p>
                    </div>
    
                    <p class="info text-base-content/50">${interviewCard.info}</p>
    
                    <div>
                        <span class="badge  bg-gray-200 px-4 py-3 font-medium">${interviewCard.status}</span>
                        <p class="description mt-2 text-base leading-relaxed">${interviewCard.description}</p>
                    </div>
    
                    <div class="card-actions gap-3">
                        <button class="btn-interview btn btn-outline btn-success px-6">INTERVIEW</button>
                        <button class="btn-rejected btn btn-outline btn-error px-6">REJECTED</button>
                    </div>
                </div>
                <button class="btn btn-circle delete-btn">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `
            filteredSection.appendChild(div);
        }
    }
}

// render rejected card function 
function renderRejectedCards(){
    filteredSection.innerHTML = '';
    if(rejectedList.length === 0){
        let div = document.createElement('div');
        div.className = 'card flex-row justify-center p-8 mt-4'
        div.innerHTML= `
            <div class="flex flex-col items-center justify-center text-center py-16 px-6 bg-base-200 rounded-2xl shadow-sm">
                <img src="./img/jobs.png" alt="No jobs available" class="w-40 opacity-80 mb-6">
                <h2 class="text-2xl font-bold text-base-content">No jobs available</h2>
                <p class="text-base-content/60 mt-2 max-w-md">Check back soon for new job opportunities.</p>
            </div>
        `;
        filteredSection.appendChild(div);
    }
    else{
        filteredSection.innerHTML = '';
        for(let rejectedCard of rejectedList){
            let div = document.createElement('div');
            div.className = 'card flex-row justify-between p-8 mt-4'
            div.innerHTML= `
                <div class="flex flex-col gap-4">
                    <div>
                        <h2 class="company-name card-title text-2xl">${rejectedCard.companyName}</h2>
                        <p class="position text-xl text-gray-500 mt-1">${rejectedCard.position}</p>
                    </div>
    
                    <p class="info text-base-content/50">${rejectedCard.info}</p>
    
                    <div>
                        <span class="badge  bg-gray-200 px-4 py-3 font-medium">${rejectedCard.status}</span>
                        <p class="description mt-2 text-base leading-relaxed">${rejectedCard.description}</p>
                    </div>
    
                    <div class="card-actions gap-3">
                        <button class="btn-interview btn btn-outline btn-success px-6">INTERVIEW</button>
                        <button class="btn-rejected btn btn-outline btn-error px-6">REJECTED</button>
                    </div>
                </div>
                <button class="btn btn-circle delete-btn">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `;
            filteredSection.appendChild(div);
        }
    }
}