// Map and Current Location
const map = document.querySelector("#grid");
const birdLocation = document.querySelector("#birdLocation");
const mapwidth = 1000;
const mapHeight = 1000;
// Score Board
const score = document.querySelector("#score");
const highScore = document.querySelector("#highScore");
let currentScore = 0;
let currentHighScore = 0;

// Score Function
const scoreFunc = () => {
  if (currentScore > currentHighScore) {
    currentHighScore = currentScore;
    highScore.innerHTML = currentHighScore;
  }
  currentScore = 0;
  score.innerHTML = currentScore;
};

// Create Bird
const bird = document.createElement("div");
const birdWidth = 40;
const birdHeight = 40;
const birdStartingPosition = [0, 450];
let birdCurrentPosition = birdStartingPosition;

// Draw Bird
const drawBird = () => {
  bird.style.left = birdCurrentPosition[0] + "px";
  bird.style.bottom = birdCurrentPosition[1] + "px";
};

// Add Bird to Map
const createBird = () => {
  bird.classList.add("bird");
  map.appendChild(bird);
  drawBird();
};

createBird();

// Bird Movement
const birdMoveUp = () => {
  birdCurrentPosition[1] += 40;
  drawBird();
  checkForLose();
  checkForObstacleCollisions();
  checkForObstacleCollisionsTwo();
  // Bird Position for testing
  birdLocation.innerHTML = birdCurrentPosition;
};

// Event "CLICK" listener
map.addEventListener("click", birdMoveUp);

// Send bird home
const sendBirdHome = () => {
  console.log("do you read me?");
  bird.classList.remove("bird");
  map.removeChild(bird);
  birdCurrentPosition = [0, 450];
  createBird();
  scoreFunc();
  alert("You lose!");
};

// Bird Lose Conditions
const checkForLose = () => {
  if (
    birdCurrentPosition[1] + birdHeight > mapHeight ||
    birdCurrentPosition[1] < 0
  ) {
    sendBirdHome();
    scoreFunc();
    alert("You lose!");
  }
};

// Add Gravity
const decreaseBird = () => {
  birdCurrentPosition[1] -= 1;
  drawBird();
  checkForLose();
  checkForObstacleCollisions();
  checkForObstacleCollisionsTwo();
};

// Obstacles
const heightsArrayTopBottom = [
  [400, 400],
  [200, 600],
  [600, 200],
  [500, 300],
  [300, 400],
  [450, 450],
];

// Top Obstacle
const topObstacle = document.createElement("div");
let gap = 200;
let topObstacleHeight = 400;
const topObstacleWidth = 100;
let topObstaclePosition = [900, 600];

// Obstacle height randomizer
const obstacleTopHeightRandomizer = () => {
  return Math.floor(Math.random() * (650 - 250) + 250);
};

topObstacleHeight = obstacleTopHeightRandomizer();

// Draw Top Obstacle
const drawTopObstacle = () => {
  topObstacle.style.left = topObstaclePosition[0] + "px";
  topObstacle.style.bottom = topObstacleHeight + "px";
  topObstacle.style.height = topObstacleHeight + "px";
};

// Create Top Obstacle
const createTopObstacle = () => {
  topObstacle.classList.add("topObstacle");
  map.appendChild(topObstacle);
  topObstacleHeight = obstacleTopHeightRandomizer();
  console.log(topObstacleHeight);
  drawTopObstacle();
};

createTopObstacle();

// Bottom Obstacle
const bottomObstacle = document.createElement("div");
let bottomObstacleHeight = mapHeight - topObstacleHeight - gap;
const bottomObstacleWidth = 100;
let bottomObstaclePosition = [900, 0];

// const obstacleBottomHeightRandomizer = () => {
//   return Math.floor(Math.random() * (500 - 300) + 300);
// };

// bottomObstacleHeight = obstacleBottomHeightRandomizer();

// Draw Bottom Obstacle
const drawBottomObstacle = () => {
  bottomObstacle.style.left = bottomObstaclePosition[0] + "px";
  bottomObstacle.style.bottom = bottomObstaclePosition[1] + "px";
  bottomObstacle.style.height = bottomObstacleHeight + "px";
};

// Create Bottom Obstacle
const createBottomObstacle = () => {
  bottomObstacle.classList.add("bottomObstacle");
  map.appendChild(bottomObstacle);
  // bottomObstacleHeight = obstacleBottomHeightRandomizer();
  bottomObstacleHeight = mapHeight - topObstacleHeight - gap;
  console.log(bottomObstacleHeight);
  drawBottomObstacle();
};

createBottomObstacle();

// Delete Obstacles
const deleteObstacles = () => {
  map.removeChild(topObstacle);
  map.removeChild(bottomObstacle);
};

// Move Obstacles left
const moveObstaclesLeft = () => {
  topObstaclePosition[0] -= 2;
  bottomObstaclePosition[0] -= 2;
  drawTopObstacle();
  drawBottomObstacle();
  obstacleEndCheck();
  createSecondObstacleSet();
};

//Remove Obstacles from the board
const obstacleEndCheck = () => {
  checkForObstacleCollisions();
  if (topObstaclePosition[0] < -100) {
    deleteObstacles();
    //clearInterval(moveObstaclesLeftTimer);
    topObstaclePosition = [900, 600];
    bottomObstaclePosition = [900, 0];
    createTopObstacle();
    createBottomObstacle();
    currentScore += 1;
    console.log(currentScore);
    score.innerHTML = currentScore;
  }
};

// add
const addObstaclesTwo = () => {};

// Obstacle Collision Detections
const checkForObstacleCollisions = () => {
  if (
    (birdCurrentPosition[0] + birdWidth >= topObstaclePosition[0] && // Bottom left
      birdCurrentPosition[0] <= topObstaclePosition[0] + topObstacleWidth && // Bottom Right
      birdCurrentPosition[1] + birdHeight > mapHeight - topObstacleHeight) || // Top Left
    (birdCurrentPosition[0] + birdWidth >= bottomObstaclePosition[0] && // Top left
      birdCurrentPosition[0] <=
        bottomObstaclePosition[0] + bottomObstacleWidth && // Top Right
      birdCurrentPosition[1] <=
        bottomObstaclePosition[1] + bottomObstacleHeight)
  ) {
    console.log("HIT!");
    sendBirdHome();
    deleteObstacles();
    deleteObstaclesTwo();
    //clearInterval(moveObstaclesLeftTimer);
    topObstaclePosition = [900, 600];
    bottomObstaclePosition = [900, 0];
    createTopObstacle();
    createBottomObstacle();
    topObstaclePositionTwo = [900, 600];
    bottomObstaclePositionTwo = [900, 0];
    createTopObstacleTwo();
    createBottomObstacleTwo();
  }
};

//////////////////////////////////////////////////

// Top Obstacle Two
const topObstacleTwo = document.createElement("div");
let topObstacleTwoHeight = 400;
const topObstacleTwoWidth = 100;
let topObstacleTwoPosition = [900, 600];

// Obstacle height randomizer
const obstacleTopTwoHeightRandomizer = () => {
  return Math.floor(Math.random() * (650 - 250) + 250);
};

topObstacleTwoHeight = obstacleTopTwoHeightRandomizer();

// Draw Top Obstacle
const drawTopObstacleTwo = () => {
  topObstacleTwo.style.left = topObstacleTwoPosition[0] + "px";
  topObstacleTwo.style.bottom = topObstacleTwoHeight + "px";
  topObstacleTwo.style.height = topObstacleTwoHeight + "px";
};

// Create Top Obstacle
const createTopObstacleTwo = () => {
  topObstacleTwo.classList.add("topObstacle");
  map.appendChild(topObstacleTwo);
  topObstacleTwoHeight = obstacleTopTwoHeightRandomizer();
  console.log(topObstacleTwoHeight);
  drawTopObstacleTwo();
};

// Bottom Obstacle Two
const bottomObstacleTwo = document.createElement("div");
let bottomObstacleTwoHeight = mapHeight - topObstacleTwoHeight - gap;
const bottomObstacleTwoWidth = 100;
let bottomObstacleTwoPosition = [900, 0];

// const obstacleBottomTwoHeightRandomizer = () => {
//   return Math.floor(Math.random() * (500 - 300) + 300);
// };

// bottomObstacleTwoHeight = obstacleBottomHeightRandomizer();

// Draw Bottom Obstacle
const drawBottomObstacleTwo = () => {
  bottomObstacleTwo.style.left = bottomObstacleTwoPosition[0] + "px";
  bottomObstacleTwo.style.bottom = bottomObstacleTwoPosition[1] + "px";
  bottomObstacleTwo.style.height = bottomObstacleTwoHeight + "px";
};

// Create Bottom Obstacle
const createBottomObstacleTwo = () => {
  bottomObstacleTwo.classList.add("bottomObstacle");
  map.appendChild(bottomObstacleTwo);
  // bottomObstacleTwoHeight = obstacleBottomHeightRandomizer();
  bottomObstacleTwoHeight = mapHeight - topObstacleTwoHeight - gap;
  console.log(bottomObstacleTwoHeight);
  drawBottomObstacleTwo();
};

// Delete Obstacles
const deleteObstaclesTwo = () => {
  map.removeChild(topObstacleTwo);
  map.removeChild(bottomObstacleTwo);
};

// Move Obstacles left
const moveObstaclesLeftTwo = () => {
  topObstacleTwoPosition[0] -= 2;
  bottomObstacleTwoPosition[0] -= 2;
  drawTopObstacleTwo();
  drawBottomObstacleTwo();
  obstacleEndCheckTwo();
};

//Remove Obstacles from the board
const obstacleEndCheckTwo = () => {
  checkForObstacleCollisionsTwo();
  if (topObstacleTwoPosition[0] < -100) {
    deleteObstaclesTwo();
    //clearInterval(moveObstaclesLeftTimer);
    topObstacleTwoPosition = [900, 600];
    bottomObstacleTwoPosition = [900, 0];
    createTopObstacleTwo();
    createBottomObstacleTwo();
    currentScore += 1;
    console.log(currentScore);
    score.innerHTML = currentScore;
  }
};

// add
const addObstacles = () => {};

// Obstacle Collision Detections
const checkForObstacleCollisionsTwo = () => {
  if (
    (birdCurrentPosition[0] + birdWidth >= topObstacleTwoPosition[0] && // Bottom left
      birdCurrentPosition[0] <=
        topObstacleTwoPosition[0] + topObstacleTwoWidth && // Bottom Right
      birdCurrentPosition[1] + birdHeight > mapHeight - topObstacleTwoHeight) || // Top Left
    (birdCurrentPosition[0] + birdWidth >= bottomObstacleTwoPosition[0] && // Top left
      birdCurrentPosition[0] <=
        bottomObstacleTwoPosition[0] + bottomObstacleTwoWidth && // Top Right
      birdCurrentPosition[1] <=
        bottomObstacleTwoPosition[1] + bottomObstacleTwoHeight)
  ) {
    console.log("HIT!");
    sendBirdHome();
    deleteObstaclesTwo();
    //clearInterval(moveObstaclesLeftTimer);
    topObstacleTwoPosition = [900, 600];
    bottomObstacleTwoPosition = [900, 0];
    createTopObstacleTwo();
    createBottomObstacleTwo();
    topObstaclePosition = [900, 600];
    bottomObstaclePosition = [900, 0];
    createTopObstacle();
    createBottomObstacle();
  }
};

// Create Second obstacle set
const createSecondObstacleSet = () => {
  if (topObstaclePosition[0] === 400) {
    topObstacleTwoPosition = [900, 600];
    bottomObstacleTwoPosition = [900, 0];
    createTopObstacleTwo();
    createBottomObstacleTwo();
  }
};

createSecondObstacleSet();

let dropTimer = setInterval(decreaseBird, 10);
let moveObstaclesLeftTimer = setInterval(moveObstaclesLeft, 10);
let moveObstaclesLeftTimerTwo = setInterval(moveObstaclesLeftTwo, 10);

// Tool Box

// Frogger movement
const birdMovement = (e) => {
  switch (e.key) {
    case "ArrowLeft":
      birdCurrentPosition[0] -= 5;
      drawBird();
      checkForObstacleCollisions();
      birdLocation.innerHTML = birdCurrentPosition;
      break;
    case "ArrowRight":
      birdCurrentPosition[0] += 5;
      drawBird();
      birdLocation.innerHTML = birdCurrentPosition;
      checkForObstacleCollisions();
      break;
    case "ArrowUp":
      birdCurrentPosition[1] += 5;
      drawBird();
      checkForObstacleCollisions();
      birdLocation.innerHTML = birdCurrentPosition;
      break;
    case "ArrowDown":
      birdCurrentPosition[1] -= 5;
      drawBird();
      checkForObstacleCollisions();
      birdLocation.innerHTML = birdCurrentPosition;
      break;
  }
};

// Adding move frogger function to an addEventListener
document.addEventListener("keydown", birdMovement);
