// list for interview and rejected cards
let interviewList = [];
let rejectedList = [];

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

function changeButtonColor(activeBtn){
    allTabBtn.classList.remove('btn-primary');
    interviewTabBtn.classList.remove('btn-primary');
    rejectTabBtn.classList.remove('btn-primary');

    activeBtn.classList.add('btn-primary');
}

// add event listener to buttons
// all tab button 
allTabBtn.addEventListener('click', function(){
    changeButtonColor(allTabBtn);

    filteredSection.classList.add('hidden');
    allCards.classList.remove('hidden');
});

// interview tab button 
interviewTabBtn.addEventListener('click', function(){
    changeButtonColor(interviewTabBtn);

    allCards.classList.add('hidden');
    filteredSection.classList.remove('hidden');
});

// reject tab button 
rejectTabBtn.addEventListener('click', function(){
    changeButtonColor(rejectTabBtn);
});

// set stat card total number  

function calculateCount(){
    let x = allCards.children.length;
    total.innerText = x;
    total2.innerText = x;

    interview.innerText = interviewList.length;
    rejected.innerText = rejectedList.length;
}
calculateCount();

// event delegation for cards
let mainContainer = document.querySelector('main');
let filteredSection = document.getElementById('filtered-section');

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
        
        parentCard.querySelector('.badge').innerText = 'INTERVIEW';
    
        if(!jobExist){
            cardInfo.status = 'INTERVIEW';
            interviewList.push(cardInfo);
        }
    
        renderInterviewCards();
    }
})

function renderInterviewCards(){
    filteredSection.innerHTML = '';
    for(let interviewCard of interviewList){
        let div = document.createElement('div');
        div.className = 'card flex-row justify-between p-8'
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
            <button class="btn btn-circle">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `
        filteredSection.appendChild(div);
    }
}