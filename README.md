# CallStack Test

# Requirements (__iOS__):
* react-native-cli v2.0 and higher
    * For more information on this, check the documentation on [Facebook/RN](https://github.com/facebook/react-native/blob/master/README.md "react-native")
* cocoapods
    * Install by using this command ```$ sudo gem install cocoapods```
* XCode 10.1 and higher
* node (npm and yarn) v2.0 and higher
    * Install __rnpm__ using ```$ npm install rnpm -g```
* git
    * For more information on this, check the documentation on [Git Version Control](https://git-scm.com/docs "Git")

# Run the application 
## STEP 1: 
Please unbundle the git repo which should be named "Jeremiah-Nwaeze-callstack-task.bundle"

## STEP 2: 
In the root directory, use command ```yarn install```. You do not need to run any other command except step 3 because a postinstall script handles the rest.

## STEP 3: 
Run the project on a simulator using ```react-native run-ios```

# Understanding the Project Structure
I try to implement an "Atoms structure", we all know that atoms are the basic units of an element. Here we say that atoms are the basic units of a component. Atoms are technically structured to be reusable and presentational components, for example: ButtonAtom; an application theme button that takes in styles as props. In this application, I created 4 atoms, and most notably the ListItemAtom, that displays the repos and is used in a FlaList, and PickerAtom (Higher Order Component), which is used as a picker/dropdown, both of which were reused in the application. The atoms structure helps with separation of concerns and overall optimization. Atoms use the functional component(with hooks) or React.PureComponent method of creating components.
I used redux for global state management, react-navigation for routing, @react-native-community/async-storage for caching and react-native-fast-image for Image caching (Images are added for better UI/UX purposes).

Apologies for using react-native-auth0 (auth0.com) to handle github login :(

# CHECKLIST
- ### Render a list with rows containing "repository ID", "title", "owner", "stars" and "created at" timestamp
This is done (Check Home.tsx -> ListItemAtom.tsx). Rows can also be clicked to be viewed properly.

- ### Render an input element to search for repositories by name
This is done (Check Search.tsx)

- ### Cache the results of every search (or have a limit) - do not make an API request if the results are already stored
This is done on every successful search request, the data is cached and when the SEARCH API is called, the cached data is displayed. This improved overall performance, and helped with faster loading. Since caching enhanced the loading processes, I took it a step further and also cached the image, because I wanted to reduce image loading. 

<image src="./src/Images/sorted.png" height="400" />

- ### Do not fire requests as long as the user is typing - use throttle or debounce
This is done. I took this a step further to suggest the users' past searches instead, using underscore throttling, and therefore making the search process more easier. And so API calls are not made during typing.
I also ensured that a user can decide what order (Ascending/Descending) that he wants to fetch from the API.
The idea of this UI/UX came from Twitter and Snapchat search process. 

<image src="./src/Images/suggestion.png" height="400" />

- ### Implement pagination (locally, not by using API queries)
This is done. I made a UX implementation where if the search list has ended the next button is disabled with a color change. As can be seen here.

<image src="./src/Images/move.png" height="400" />

- ### Add ability to control number of rows rendered per page (5 - default/10/15/20)
This is done. The ability to do this and local pagination was easy to do because I saved the full list in the redux store as an  array called repos, and I took the amount I wanted to be displayed in an array called viewRepos. This made it easy for me to extend and move through repos without altering or compromising the full list. This was done as a picker on the left side.

- ### Implement ASC/DESC sorting by every field
This is done. This was implemented using a picker that took all the field names and suggested Ascending/ Descending order. Default is Repo name (Ascending)

- ### Add GitHub authentication mechanism (eg: Log in with GitHub button) and highlight the row of repository of the logged-in user
This is done using react-native-auth0, a third party service. I apologize a lot if this was not the expected approach as this was what seemed to be the easier route for me. :( 
I also went further to implement a persistent login process on the application using react-native-keychain to store the accessToken. This ensures that user does not login every single time they open the app. The logout button is on the menu at the top right corner of the home screen. I also made sure user was highlighted when they viewed any of their repo as seen below:

<image src="./src/Images/own.png" height="400" />

# OPTIONAL POINTS
- ### Use linting and/or formatting tool - ESLint, Prettier (if you use @callstack/eslint-config you should be good to go)
I ended up using prettier

- ### Use a type checker - Flow or Typescript
I used Typescript for static typing 

- ### Write test suites - for example with Jest 
I created 4 Tests, 2 Test suites :(

- ### Write a good README to make reviewers lives easier
Currently doing that :) I hope it is not so long.

# FINAL NOTES (THOUGHTS AND CONSIDERATIONS)
I tried as much as possible to use best practices like DRY - Don't Repeat Yourself, a major example is the PickerAtom that appears three times in the HeaderAtom. I used HOC pattern to simplify and minify code. I also used redux hooks like useSelector in some atoms but I removed them in later commits because I realized a better shorter way was to pass props. I put all configurations/properties in the config folder. I moved all styling to the Styles folder which also reduced a lot of repetitive styles and imports. I also used theme colors from Styles/Colors which from my experience makes it easy to change theme colors all over the project (Maintainability & Scalability). 
I also used a lot of Guarding (Typescript also helped) to ensure the unexpected are handled properly.
I used a lot of ES6/ES7 features like const, map, filter, string templates, spread parameters, arrow functions, async and await, destructuring, I used Hooks like useRef, useSelector etc. I used redux also.
I use git for version control, though I only used the master branch.
I thank you for this opportunity. This job would mean a lot to me.

