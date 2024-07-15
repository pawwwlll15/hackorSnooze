"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $storyContainer.show();

}
$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  hideUserLinks();
  $loginForm.show();
  $signupForm.show();
  $storyContainer.hide();
 
  

}
$navLogin.on("click", navLoginClick);

/* hide everything besides profile */
function navProfileClick(){
  hidePageComponents();
  $userProfile.show();
  userStories.show();
}
$navUserProfile.on('click',navProfileClick);
/** When a user first logins in, update the navbar to reflect that. */
function updateNavOnLogin() {
  
  console.debug("updateNavOnLogin");
  showUserLinks();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/* handling what happens once the submit story link is clicked */
function navStorySubmissionClick(e){
  e.preventDefault();
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}
$navStorySubmit.on('click',navStorySubmissionClick);

/* handling what happens once My Stories is clicked */
function navUserStoriesClick(e){
  e.preventDefault();
  hidePageComponents();
  /* put user stories on page */
  showUserStories();
  userStories.show();
  $userProfile.hide();
  favStories.hide();
}
$navUserStories.on('click',navUserStoriesClick);


function navFavStoriesClick(){
  hidePageComponents();
  putFavListOnPage();
  $userProfile.hide();
  userStories.hide();
}
$navFavStories.on('click',navFavStoriesClick);

function hideUserLinks(){
  $navStorySubmit.hide();
  $navUserStories.hide();
  $navFavStories.hide();
}

function showUserLinks(){
  $navStorySubmit.show();
  $navUserStories.show();
  $navFavStories.show();
}