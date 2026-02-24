## ProgrammingHero B-13
### Assignment-4 ***(Job Application Tracker)***
---

**Question Answer:**
###### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

<u>*Ans:*</u>
**getElementById:** Id is unique identifier of an html element. so if we use  'getElementById' we would get a single html element.

**getElementByClassName:**  Many html element share same class name. so if we ue 'getElementByClassName' wewould ge a collection of html element sharing same class name.

**querySelector:** it uses css like syntax to get element. 'querySelector' only select the first element match with criteria.

**querySelector:** its same as querySelector but it returns all the match element  with the criteria.

###### 2. How do you create and insert a new element into the DOM?

<u>*Ans:*</u>
first we have to create the element  like 
```js
const element = document.createElement('div') 
```
then we have to add element content 
```js
element.textcontent = "hello prithibi";
```
then we have to add the element to a parent element like
```js
parent.appendChild(element);
```

###### 3. What is Event Bubbling? And how does it work?
when we click an element or a event happend we can get the parents, parents prents(grandprents)and so on. it grow like a bubble so its called event bubbling.

it works like: if we click a button we can get its parent section then we can get its parent.
```js
const parentCard = event.target.parentNode.parentNode;
```

###### 4. What is Event Delegation in JavaScript? Why is it useful?
it's is sme as adding eventlistener. here we add event listener to parent section instede of adding listener to indevidual element.

Its use less memory and gives dinamic advantage we can add dinamic element letter to it.
In this project we delegate in the cards.

###### 5. What is the difference between preventDefault() and stopPropagation() methods?
**preventDefault():** stop the default behavior of browser. like submit button in form reload default so we use preventDefault().
**stopPropagation():** stop the event bubble to grow to parent and grandparent.
