const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const Comment = require("./models/comments");

const data = [
  {
    name: "CLOUD REST",
    image:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet."
  },
  {
    name: "CLOUD REST",
    image:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet."
  },
  {
    name: "CLOUD REST",
    image:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet."
  }
];

function seedDB() {
  // REMOVE ALL CAMPGROUNDS
  Campground.remove({}, function(error) {
  //   if (error) {
  //     console.log("ERROR.!!!");
  //   } else {
  //     console.log("REMOVED CAMPGROUNDS.!!");
  //     //   ADD NEW CAMPGROUNDS
  //     data.forEach(function(element) {
  //       Campground.create(element, function(error, createdCampground) {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log("ADDED A CAMPGROUND.!!!");
  //           // ADD COMMENTS
  //           Comment.create(
  //             {
  //               text: "COMMENT OF POST.!!",
  //               author: "AUTHOR OF THIS COMMENT"
  //             },
  //             function(error, createdComment) {
  //               if (error) {
  //                 console.log(error);
  //               } else {
  //                 createdCampground.comments.push(createdComment);
  //                 createdCampground.save();
  //                 console.log("CREATED NEW COMMENT.!");
  //               }
  //             }
  //           );
  //         }
  //       });
  //     });
  //   }
  });
}
module.exports = seedDB;
