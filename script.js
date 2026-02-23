let interviewList = [];
let rejectedList = [];


let total = document.getElementById('total');
let total2 = document.getElementById('total-number');
let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');

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

// set stat card total number  
const allCards = document.getElementById('all-cards');

function calculateCount(){
    let x = allCards.children.length;
    total.innerText = x;
    total2.innerText = x;

    interview.innerText = interviewList.length;
    rejected.innerText = rejectedList.length;
}
calculateCount();