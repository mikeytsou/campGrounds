const mongoose = require("mongoose");
      Campground = require("./models/campground");
      Comment = require("./models/comment");


// let data = [
//   {
//     name: "Clouds Rest",
//     image : "http://cbsnews3.cbsistatic.com/hub/i/r/2017/02/02/2b766abd-de4a-4a2e-9a9b-877e3729cccb/thumbnail/620x350/ca132eeb2e04d9d15d3b8029e7dc76da/istock-513059696.jpg",
//     description: "Ground round bresaola short ribs burgdoggen. Ball tip picanha turkey ribeye, cow prosciutto t-bone shoulder. Pork loin shank flank ribeye. Meatloaf pastrami picanha ham pig short ribs tongue burgdoggen short loin hamburger strip steak bresaola bacon jerky pork. Strip steak ball tip spare ribs landjaeger, prosciutto andouille leberkas turkey. Ribeye bacon salami brisket shankle beef kevin pork belly doner spare ribs boudin jowl. Porchetta alcatra pork belly salami, ribeye t-bone pork chop short loin burgdoggen tenderloin kielbasa corned beef meatball landjaeger."
//   },
//   {
//     name: "Sky Peak",
//     image : "https://www.visitnc.com/resimg.php/imgcrop/2/35245/image/800/448/CampingEnoRiver.jpg",
//     description: "Bacon ipsum dolor amet kielbasa ribeye rump cow burgdoggen corned beef. Capicola tenderloin strip steak ham, pork belly shank bresaola jowl pork chop tri-tip ground round spare ribs filet mignon picanha beef. Burgdoggen spare ribs ham hock, jowl corned beef doner short ribs shank pastrami flank tenderloin. Jowl drumstick andouille beef. Andouille beef flank, tongue hamburger landjaeger short loin. Short ribs ham hock biltong pork loin kielbasa corned beef hamburger prosciutto. Shank jowl leberkas kevin, tri-tip porchetta t-bone drumstick fatback prosciutto. Pork chop ground round salami sausage kielbasa venison. Brisket ground round sausage pork loin salami ball tip cow kevin chicken tenderloin filet mignon shoulder hamburger."
//   },
//   {
//     name: "Mount Diablo",
//     image : "https://media.deseretdigital.com/file/691e1f5285?crop=top:0|left:0|width:400|height:284|gravity:Center&quality=55&interlace=none&resize=height:284&order=resize,crop&c=14&a=86335ee9",
//     description: "Kielbasa ribeye ham hock jerky cupim. Beef ribs fatback ground round, andouille tenderloin frankfurter ball tip short loin spare ribs shoulder. Tail pancetta hamburger corned beef, tri-tip shoulder pig salami pork belly. Drumstick shankle pork loin boudin chicken prosciutto fatback spare ribs. Beef pork chop pork belly bacon, chicken flank tenderloin. Strip steak salami jerky boudin swine ground round ball tip doner alcatra."
//   },
// ]

function seedDB() {
  // remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err)
    }
      console.log("removed campgrounds!");
      // add a few campgrounds
    //   data.forEach(function(seed) {
    //   Campground.create(seed, function(err, campground) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("added a campground");
    //       // create comment
    //       Comment.create(
    //         {
    //           text: "This place was great but i wish there was more space",
    //           author: "Homer"
    //         }, function(err, comment) {
    //           if (err) {
    //             console.log(err);
    //           } else {
    //             campground.comments.push(comment);
    //             campground.save();
    //             console.log("created new comment")
    //           }
    //       })
    //     }
    //   });
    // });
  });
}

module.exports = seedDB;