////// select bar -categories match

let $selectBar = document.getElementById("selectBar");

console.log($selectBar);

// categories array fetch

async function getCategories() {
  await fetch("https://v2.jokeapi.dev/categories");

  return await fetch("https://v2.jokeapi.dev/categories");
  // async returns a promise so we can later do "then". to the fetched url
}

function handleCategories() {
  let aaa = getCategories().then((response) => {
    response
      .json()

      .then((bodyAsObject) =>
        localStorage.setItem("categories", bodyAsObject.categories)
      );
  });
}

handleCategories();

// console.log(localStorage.getItem("categories"));

let stringCategories = localStorage.getItem("categories");

let categoriesArr = stringCategories.split(",").map((u) => {
  return u.trim();
});

let i = 0;
for (let category of categoriesArr) {
  $selectBar.innerHTML += ` <option onchange="getJokeByCategory()" id="i" value="${category}">${category}</option>`;

  i++;
}

console.log($selectBar);

/////////////////////////////////////////////////////////
// joke box- their jokes match

$selectBar.addEventListener("change", getJokeByCategory);
$selectBar.addEventListener("change", handleJokes);

let chosenCategory = "";

async function getJokeByCategory() {
  let chosenCategory = $selectBar.value;
//   console.log(chosenCategory);

  await fetch(` https://v2.jokeapi.dev/joke/${chosenCategory}`);

  return await fetch(` https://v2.jokeapi.dev/joke/${chosenCategory}`);

  //   console.log(event.target);
  // console.log ($selectBar.value)
}

// getJokeByCategory()

let $jokeQ = document.getElementById("jokeQ");
let $jokeAnswer = document.getElementById("jokeAnswer");
let $justJoke = document.getElementById("justJoke");

function handleJokes() {
  let setup = getJokeByCategory().then((response) => {
    response
      .json()
      .then((bodyAsObject) =>
        
          ($jokeQ.innerHTML = bodyAsObject.setup
            ? "Q:   " +
              bodyAsObject.setup +
              "<br><br>" +
              "A:   " +
              bodyAsObject.delivery
            : bodyAsObject.joke
            ? "<br>" + bodyAsObject.joke
            : "")
        )
      ;
  });
}
