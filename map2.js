let combine = null;
let la1, lo1, la2, lo2;

// make sure dimensions always length this
const combineSize = 1;

function createCombine(lat1, long1) {
  la1 = lat1;
  lo1 = long1;

  let top = la1 + combineSize;
  let bot = la1 - combineSize;

  let left = lo1 - combineSize;
  let right = lo1 + combineSize;

  // rightTop, leftTop, leftBot, rightBot
  // imageBounds =[[45, -85],[45, -86], [44,-86],[44, -85]]
  let bounds = [
    [top, right],
    [top, left],
    [bot, left],
    [bot, right],
  ];
  console.log(bounds);
  combine = L.imageTransform("combine.png", bounds).addTo(map);
  console.log("create");
}

// input is new points
function computeLine(lat2, long2) {
  if (combine === null) {
    createCombine(lat2, long2);
    return;
  }

  let yDiff = lat2 - la1;
  let xDiff = long2 - lo1;

  // let angleRadians = Math.atan2(yDiff, xDiff);
  let angleRadians = Math.atan2(yDiff, xDiff) - Math.PI/2
  // let angleRadians = 0 - Math.PI/2;
  console.log("angle" + angleRadians);
  // let m = yDiff / xDiff;

  let newMidY = (la1 + lat2) / 2;
  let newMidX = (lo1 + long2) / 2;

  // let oldMidY = (la1 + la2) / 2;
  // let oldMidX = (lo1 + lo2) / 2;

  // const latMove = newMidY - oldMidY;
  // const longMove = newMidX - oldMidX;

  let top = newMidY + combineSize;
  let bot = newMidY - combineSize;
  let left = newMidX - combineSize;
  let right = newMidX + combineSize;

  // let bounds = [
  //   [top, right],
  //   [top, left],
  //   [bot, left],
  //   [bot, right],
  // ];

  let bounds = [
    [combineSize, combineSize],
    [combineSize, -combineSize],
    [-combineSize, -combineSize],
    [-combineSize, combineSize],
  ];
  console.log("before " + bounds);
  bounds.forEach((bound, index) => {
    let y = bound[0];
    let x = bound[1];
    let newY = x * Math.cos(angleRadians) - y * Math.sin(angleRadians);
    let newX = x * Math.sin(angleRadians) + y * Math.cos(angleRadians);
    newY += newMidY
    newX += newMidX
    bounds[index] = [newY, newX];
  });
  // console.log("after " + bounds);
  // return
  //y,x
  // top right, topleft, botleft, bot right
  // rightTop, leftTop, leftBot, rightBot
  // imageBounds =[[45, -85],[45, -86], [44,-86],[44, -85]]

  // const combine = L.imageOverlay('combine.png', imageBounds)
  // combine.addTo(map)
  // console.log(combine)
  // const combineHTML = combine._image;
  // combineHTML.style.transform="rotate(70deg)"
  // console.log(combineHTML.style.transform)
  console.log(bounds);
  combine.setAnchors(bounds);
  console.log("hi");
}

computeLine(42, -85);
setTimeout(500,)
computeLine(42, -86);
setTimeout(500)
computeLine(42, -87);
setTimeout(500)
computeLine(42, -90);
setTimeout(500)
computeLine(43, -90);
setTimeout(500)
computeLine(44, -90);
// computeLine(42, -86);
// computeLine(44, -85);
