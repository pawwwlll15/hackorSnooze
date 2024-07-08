"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();

}
$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
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
  $(".main-nav-links").show();
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
function navUserStoriesClick(){
  hidePageComponents();
  /* put user stories on page */
  showUserStories();
  userStories.show();
  $userProfile.hide();
}
$navUserStories.on('click',navUserStoriesClick);


function navFavStoriesClick(){
  hidePageComponents();
  putFavListOnPage();
  $userProfile.hide();
  userStories.hide();
}
$navFavStories.on('click',navFavStoriesClick);