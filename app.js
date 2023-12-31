function app(people) {
  displayWelcome();
  runSearchAndMenu(people);
  return exitOrRestart(people);
}

function displayWelcome() {
  alert("Hello and welcome to the Most Wanted search application!");
}

function runSearchAndMenu(people) {
  const searchResults = searchPeopleDataSet(people);

  if (searchResults.length > 1) {
    displayPeople("Search Results", searchResults);
  } else if (searchResults.length === 1) {
    const person = searchResults[0];
    mainMenu(person, people);
  } else {
    alert("No one was found in the search.");
  }
}

function searchPeopleDataSet(people) {
  const searchTypeChoice = validatedPrompt(
    "Please enter in what type of search you would like to perform.",
    ["id", "name", "traits"]
  );

  let results = [];
  switch (searchTypeChoice) {
    case "id":
      results = searchById(people);
      break;
    case "name":
      results = searchByName(people);
      break;
    case "traits":
      //! TODO
      results = searchByTraits(people);
      break;
    default:
      return searchPeopleDataSet(people);
  }

  return results;
}

function searchByTraits(people) {
  const lookuptraits = prompt(
    `What kind of trait do you want to look up? \n Gender\n Height\n Weight\n Eye Color`
  );
  switch (lookuptraits) {
    case "gender":
      const searchByGender = prompt(
        "Please enter a gender you would like to lookup."
      );
      const genderFilterResults = people.filter(
        (person) => person.gender === searchByGender
      );
      return genderFilterResults;
    case "height":
      const searchByHeight = prompt(
        "Please enter a Height Number you would like to lookup."
      );
      const heightToInt = parseInt(searchByHeight);
      const HeightFilterResults = people.filter(
        (person) => person.height === heightToInt
      );
      return HeightFilterResults;
    case "weight":
      const searchByWeight = prompt(
        "Please enter a Weight Number you would like to lookup."
      );
      const weightToInt = parseInt(searchByWeight);
      const weightFilterResults = people.filter(
        (person) => person.weight === weightToInt
      );
      return weightFilterResults;
    case "eye color":
      const searchByEyeColor = prompt(
        "Please enter a gender you would like to lookup."
      );
      const eyeColorFilterResults = people.filter(
        (person) => person.eyeColor === searchByEyeColor
      );
      return eyeColorFilterResults;
      case "occupation":
      const searchByOccupation = prompt(
        "Please enter a gender you would like to lookup."
      );
      const occupationFilterResults = people.filter(
        (person) => person.occupation === searchByOccupation
      );
      return occupationFilterResults;
    default:
      alert("Invalid trait entered. Please enter a valid trait.");
      return [];
  }
}

function searchById(people) {
  const idToSearchForString = prompt(
    "Please enter the id of the person you are searching for."
  );
  const idToSearchForInt = parseInt(idToSearchForString);
  const idFilterResults = people.filter(
    (person) => person.id === idToSearchForInt
  );
  return idFilterResults;
}

function searchByName(people) {
  const firstNameToSearchFor = prompt(
    "Please enter the the first name of the person you are searching for."
  );
  const lastNameToSearchFor = prompt(
    "Please enter the the last name of the person you are searching for."
  );
  const fullNameSearchResults = people.filter(
    (person) =>
      person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() &&
      person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()
  );
  return fullNameSearchResults;
}

function mainMenu(person, people) {
  const mainMenuUserActionChoice = validatedPrompt(
    `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
    ["info", "family", "descendants", "quit"]
  );

  switch (mainMenuUserActionChoice) {
    case "info":
      //! TODO
      displayPersonInfo(person);
      break;
    case "family":
      //! TODO
      let personFamily = findPersonFamily(person, people);
      displayPeople("Family", personFamily);
      break;
    case "descendants":
      //! TODO
      let personDescendants = findPersonDescendants(person, people);
      displayPeople("Descendants", personDescendants);
      break;
    case "quit":
      return;
    default:
      alert("Invalid input. Please try again.");
  }

  return mainMenu(person, people);
}

function findPersonDescendants(person, people) {
  const personId = person.id; 
  const family = people.filter((p) => p.parents.includes(personId));
  return family;
}


function findPersonFamily(person, people){
  const LastName = person.lastName; 
  const family = people.filter((p) => p.lastName === LastName);
  return family;
}

function displayPersonInfo(person) {
  alert(
    `${person.firstName} ${person.lastName} \n Gender: ${person.gender} \n dob: ${person.dob}, \n Height: ${person.height} \n Weight: ${person.weight} \n Eye Color: ${person.eyeColor} \n Occupation: ${person.occupation} \n Parents Id: ${person.parents} \n Spouse Id: ${person.currentSpouse}`
  );
}

function displayPeople(displayTitle, peopleToDisplay) {
  const formatedPeopleDisplayText = peopleToDisplay
    .map((person) => `${person.firstName} ${person.lastName}`)
    .join("\n");
  alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
  acceptableAnswers = acceptableAnswers.map((aa) => aa.toLowerCase());

  const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers
    .map((aa) => `\n-> ${aa}`)
    .join("")}`;

  const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

  if (acceptableAnswers.includes(userResponse)) {
    return userResponse;
  } else {
    alert(
      `"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers
        .map((aa) => `\n-> ${aa}`)
        .join("")} \n\nPlease try again.`
    );
    return validatedPrompt(message, acceptableAnswers);
  }
}

function exitOrRestart(people) {
  const userExitOrRestartChoice = validatedPrompt(
    "Would you like to exit or restart?",
    ["exit", "restart"]
  );

  switch (userExitOrRestartChoice) {
    case "exit":
      return;
    case "restart":
      return app(people);
    default:
      alert("Invalid input. Please try again.");
      return exitOrRestart(people);
  }
}
