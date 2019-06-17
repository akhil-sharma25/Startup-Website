var mongoose= require("mongoose");
var Campground= require("./models/campground.js");
var Comment = require("./models/comment.js");
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        discription: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        discription: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    }
];
function SeedsDb(){
			Campground.remove({},function(err){
// 				if(err){
// 					console.log(err);
// 				}
// 				else{
// 				for(i=0;i<data.length;i++){
// 					Campground.create(data[i],function(err,seed){
// 						if(err){
// 							console.log(err);
// 						}
// 						else{
// 							console.log(seed);
// 							Comment.create({
// 								text:"Great Place but no internet",
// 								author:"Visitor"
// 							},function(err,comment){
// 								if(err){
// 									console.log(err);
// 								}
// 								else{
// 									seed.comments.push(comment);
// 									seed.save(function(err,seed){
// 										if(err){
// 											console.log("We have Eroor here");
// 											console.log(err);
// 										}
// 										else{
// 											console.log("balle balle");
// 											console.log(seed);
// 										}
// 									});
// 								}
// 							});
// 				}
					
// 			});
// }
// 			}
			});	
}
module.exports = SeedsDb;