"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showBtn = false){
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  /* if there is a user logged in, show the star to offer favorite*/
  const showFav = Boolean(currentUser);
  return $(`
      <li id="${story.storyId}">
        <div>
          ${showFav ? createFavStar(story,currentUser): ''}
          <a href="${story.url}" target="a_blank" class="story-link">
            ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
          ${showBtn ? createDeleteBtn(): ''}
        </div>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const markUpStory = generateStoryMarkup(story);
    $allStoriesList.append(markUpStory);
  }

  $allStoriesList.show();
}


async function newStorySubmission(e){
  e.preventDefault();

  /* snag info from story form */
  const title = $('#createNewTitle').val();
  const author = $('#createNewAuthor').val();
  const url = $('#createNewURL').val();
  const username = currentUser.username;
  const storyObj = {title,url,author,username};

  const story = await storyList.addStory(currentUser,storyObj);

  const markUpStory = generateStoryMarkup(story);
  /* add to end of allStoryList */
  $allStoriesList.prepend(markUpStory);
  userStories.prepend(markUpStory,true);

  console.log('submitted properly');

  /* rehide and reset submission form  */
  $submitForm.slideUp('fast');
  $submitForm.trigger('reset');
 
}

$submitForm.on('submit',newStorySubmission);

/* handling fav/unFav stories */

function createFavStar(story,user){
  console.log(user);
  const isFav = user.isFavorite(story);
  /* determines if star is filled in or empty */
  const star = isFav ? "fas" : 'far';
  /* fa-star is a built in html character */
  return `
  <span class="star">
  <i class="${star} fa-star"></i></span>`;
}

function createDeleteBtn(){
  return`
    <span class="trash-can">
      <i class="fas fa-trash-alt"></i>
    <span>`;
}

/* deleting stories */
async function removeStory(e){
  const targetLi = $(e.target).closest('li');
  const storyId = targetLi.attr('id');

  await storyList.deleteStory(currentUser,storyId);
  await showUserStories();
}

userStories.on('click','.trash-can',removeStory);


/* putting user stories on the page */
function showUserStories(){
  userStories.empty();

  if(currentUser.ownStories.length === 0){
    userStories.append(`<h3>no stories added by ${currentUser.username}</h3>`);
  } else{
    for(let story of currentUser.ownStories){
      let markUpStory = generateStoryMarkup(story,true);
      userStories.append(markUpStory);
    }
  }

  userStories.show();
}


/* showing list of favorite stories */
function putFavListOnPage(){
  favStories.empty();

  if(currentUser.favorites.length === 0){
    favStories.append('<h3>No Favorite Stories</h3>');

  } else{
    for(let story of currentUser.favorites){
      const markUpStory = generateStoryMarkup(story);
      favStories.append(markUpStory);
    }
  }
  favStories.show();
}

/* first attempt at using .closest. Found this method during my google searches and wanted to try it out. */
/* extracting the storyId to determine if it is in the favorite list or not. */
async function toggleFavStory(e){
  const targetStory = $(e.target);
  const selectedLi = targetStory.closest('li');
  const storyId = selectedLi.attr('id');
  /* story = the story with the same id as the targeted story. */
  const story = storyList.stories.find(tStory => tStory.storyId === storyId);

  if(targetStory.hasClass('fas')){
    await currentUser.removeFavStory(story);
    targetStory.closest('i').toggleClass('fas far');
  } else {
    await currentUser.addFavStory(story);
    targetStory.closest('i').toggleClass('fas far');
  }

}

$allStoriesList.on('click','.star',toggleFavStory);


