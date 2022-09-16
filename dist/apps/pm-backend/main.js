(()=>{var __webpack_modules__={208:(module,__unused_webpack_exports,__webpack_require__)=>{const tslib_1=__webpack_require__(752),mongoose=__webpack_require__(185);module.exports=()=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){console.log("Connecting to mongoDB...");yield mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:!0,useUnifiedTopology:!0});console.log("MongoDB connection successful !")}))},199:(__unused_webpack_module,exports,__webpack_require__)=>{const tslib_1=__webpack_require__(752),asyncHandler=__webpack_require__(606),User=__webpack_require__(656),CustomErrorResponse=__webpack_require__(475);__webpack_require__(251);exports.getAllUsersProfiles=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){try{const allUsers=yield User.find();res.status(200).json({user:allUsers})}catch(error){return next(new CustomErrorResponse("Error! Please try later",500))}}))))},366:(__unused_webpack_module,exports,__webpack_require__)=>{const tslib_1=__webpack_require__(752),asyncHandler=__webpack_require__(606),User=__webpack_require__(656),CustomErrorResponse=__webpack_require__(475);__webpack_require__(185);exports.sendMessage=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const oktaUserId1=req.query.sender,oktaUserId2=req.query.receiver,message={message:req.body.message,messageSenderId:oktaUserId1,messageReceiverId:oktaUserId2,isRead:!1};console.log(message);const session=yield User.startSession();try{session.startTransaction();let user1=yield User.find({oktaUserId:oktaUserId1});user1=user1[0];let user2=yield User.find({oktaUserId:oktaUserId2});user2=user2[0];const didUser1SendInterestToUser2=user1.interestsSent.some((interest=>String(interest.interestReceiverId)===oktaUserId2)),didUser1ReceiveInterestFromUser2=user1.interestsReceived.some((interest=>String(interest.interestSenderId===oktaUserId2)));if(didUser1SendInterestToUser2)user1.interestsSent=user1.interestsSent.map((interest=>(String(interest.interestReceiverId)===oktaUserId2&&interest.conversations.push(message),interest))),user2.interestsReceived=user2.interestsReceived.map((interest=>(String(interest.interestSenderId)===oktaUserId1&&interest.conversations.push(message),interest)));else{if(!didUser1ReceiveInterestFromUser2)throw"Permission denied.";user1.interestsReceived=user1.interestsReceived.map((interest=>(String(interest.interestSenderId)===oktaUserId2&&interest.conversations.push(message),interest))),user2.interestsSent=user2.interestsSent.map((interest=>(String(interest.interestReceiverId)===oktaUserId1&&interest.conversations.push(message),interest)))}yield user1.save(),yield user2.save(),yield session.commitTransaction(),session.endSession(),res.status(200).json({success:!0,message:"Message sent !"})}catch(error){return yield session.abortTransaction(),session.endSession(),next(new CustomErrorResponse("Message not sent! Please try later",500))}})))),exports.markMessagesAsRead=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const oktaUserId1=req.query.user1,oktaUserId2=req.query.user2,session=yield User.startSession();try{session.startTransaction();let user1=yield User.find({oktaUserId:oktaUserId1});user1=user1[0];let user2=yield User.find({oktaUserId:oktaUserId2});user2=user2[0];const didUser1SendInterestToUser2=user1.interestsSent.some((interest=>String(interest.interestReceiverId)===oktaUserId2)),didUser1ReceiveInterestFromUser2=user1.interestsReceived.some((interest=>String(interest.interestSenderId===oktaUserId2)));if(didUser1SendInterestToUser2)user1.interestsSent=user1.interestsSent.map((interest=>(String(interest.interestReceiverId)===user2.oktaUserId&&(interest.conversations=interest.conversations.map((message=>(message.isRead||(message.isRead=!0),message)))),interest))),user2.interestsReceived=user2.interestsReceived.map((interest=>(String(interest.interestSenderId)===user1.oktaUserId&&(interest.conversations=interest.conversations.map((message=>(message.isRead||(message.isRead=!0),message)))),interest)));else{if(!didUser1ReceiveInterestFromUser2)throw"Permission denied.";user1.interestsReceived=user1.interestsReceived.map((interest=>(String(interest.interestSenderId)===user2.oktaUserId&&(interest.conversations=interest.conversations.map((message=>(message.isRead||(message.isRead=!0),message)))),interest))),user2.interestsSent=user2.interestsSent.map((interest=>(String(interest.interestReceiverId)===user1.oktaUserId&&(interest.conversations=interest.conversations.map((message=>(message.isRead||(message.isRead=!0),message)))),interest)))}yield user1.save(),yield user2.save()}catch(error){return yield session.abortTransaction(),session.endSession(),next(new CustomErrorResponse("Error! Please try later",500))}res.status(200).json({success:!0,message:"Messages marked as read !"})})))),exports.getMessages=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){try{let user=yield User.find({oktaUserId:req.params.oktaUserId});if(user=user[0],console.log(user),!user)return next(new CustomErrorResponse("User not found!",404));res.status(200).json({success:!0,message:"Data Retrieved Successfull !",interestsReceived:[...user.interestsReceived],interestsSent:[...user.interestsSent]})}catch(error){return next(new CustomErrorResponse("Error! Please try later",500))}}))))},200:(__unused_webpack_module,exports,__webpack_require__)=>{const tslib_1=__webpack_require__(752),asyncHandler=__webpack_require__(606),User=__webpack_require__(656),CustomErrorResponse=__webpack_require__(475);__webpack_require__(185);exports.sendInterest=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const oktaUserId1=req.query.sender,oktaUserId2=req.query.receiver,session=yield User.startSession();console.log("oktaUserId1 ",oktaUserId1),console.log("oktaUserId2 ",oktaUserId2);try{session.startTransaction();let user1=yield User.find({oktaUserId:oktaUserId1});user1=user1[0];let user2=yield User.find({oktaUserId:oktaUserId2});user2=user2[0];const didUser1AlreadySendInterestToUser2=user1.interestsSent.some((interest=>interest.interestReceiverId===oktaUserId2));if(console.log("didUser1AlreadySendInterestToUser2",didUser1AlreadySendInterestToUser2),didUser1AlreadySendInterestToUser2)return yield session.abortTransaction(),session.endSession(),next(new CustomErrorResponse(`Interest already sent to ${user2.name}. Please wait for response.`,400));const didUser1AlreadyReceiveInterestFromUser2=user1.interestsReceived.some((interest=>interest.interestSenderId===oktaUserId2));if(console.log("didUser1AlreadyReceiveInterestFromUser2",didUser1AlreadyReceiveInterestFromUser2),didUser1AlreadyReceiveInterestFromUser2)return yield session.abortTransaction(),session.endSession(),next(new CustomErrorResponse(`Interest already received from ${user2.name}. Please respond to it.`,400));const maleImagePlaceholder="https://res.cloudinary.com/pesto-matrimony/image/upload/v1662374871/e0kfqgvenrb2mhpzya4a.png",femaleImagePlaceholder="https://res.cloudinary.com/pesto-matrimony/image/upload/v1662458482/tufqrbcs4pnkwcukvynw.png";user1.interestsSent.push({conversations:[],interestSenderAge:user1.age,interestSenderId:user1.oktaUserId,interestSenderImage:user1.images[0]||"male"===user1.gender?maleImagePlaceholder:femaleImagePlaceholder,interestSenderName:user1.name,interestReceiverAge:user2.age,interestReceiverId:user2.oktaUserId,interestReceiverImage:user2.images[0]||"male"===user2.gender?maleImagePlaceholder:femaleImagePlaceholder,interestReceiverName:user2.name,isAccepted:!1,isRejected:!1}),user2.interestsReceived.push({conversations:[],interestSenderAge:user1.age,interestSenderId:user1.oktaUserId,interestSenderImage:user1.images[0]||"male"===user1.gender?maleImagePlaceholder:femaleImagePlaceholder,interestSenderName:user1.name,interestReceiverAge:user2.age,interestReceiverId:user2.oktaUserId,interestReceiverImage:user2.images[0]||"male"===user2.gender?maleImagePlaceholder:femaleImagePlaceholder,interestReceiverName:user2.name,isAccepted:!1,isRejected:!1}),yield user1.save(),yield user2.save(),yield session.commitTransaction(),session.endSession(),res.status(200).json({success:!0,message:"Interest sent!"})}catch(error){return yield session.abortTransaction(),session.endSession(),next(new CustomErrorResponse("Interest not sent. Please try later!",500))}})))),exports.acceptInterest=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const oktaUserId1=req.query.sender,oktaUserId2=req.query.receiver,session=yield User.startSession();try{session.startTransaction();let user1=yield User.find({oktaUserId:oktaUserId1});user1=user1[0];let user2=yield User.find({oktaUserId:oktaUserId2});user2=user2[0],user2.interestsReceived=user2.interestsReceived.map((interest=>(String(interest.interestSenderId)===user1.oktaUserId&&(interest.isAccepted=!0),interest))),user1.interestsSent=user1.interestsSent.map((interest=>(String(interest.interestReceiverId)===user2.oktaUserId&&(interest.isAccepted=!0),interest))),yield user1.save(),yield user2.save(),yield session.commitTransaction(),session.endSession(),res.status(200).json({success:!0,message:"Interest accepted!"})}catch(error){return yield session.abortTransaction(),session.endSession(),next(new CustomErrorResponse("Error accepting interest. Please try later!",500))}})))),exports.declineInterest=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const oktaUserId1=req.query.sender,oktaUserId2=req.query.receiver,session=yield User.startSession();try{session.startTransaction();let user1=yield User.find({oktaUserId:oktaUserId1});user1=user1[0];let user2=yield User.find({oktaUserId:oktaUserId2});user2=user2[0],user2.interestsReceived=user2.interestsReceived.map((interest=>(String(interest.interestSenderId)===user1.oktaUserId&&(interest.isRejected=!0),interest))),user1.interestsSent=user1.interestsSent.map((interest=>(String(interest.interestReceiverId)===user2.oktaUserId&&(interest.isRejected=!0),interest))),yield user1.save(),yield user2.save(),yield session.commitTransaction(),session.endSession(),res.status(200).json({success:!0,message:"Interest rejected!"})}catch(error){return yield session.abortTransaction(),session.endSession(),next(new CustomErrorResponse("Error rejecting interest. Please try later!",500))}})))),exports.cancelInterest=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const oktaUserId1=req.query.sender,oktaUserId2=req.query.receiver,session=yield User.startSession();try{session.startTransaction();let user1=yield User.find({oktaUserId:oktaUserId1});user1=user1[0];let user2=yield User.find({oktaUserId:oktaUserId2});user2=user2[0],user1.interestsSent=user1.interestsSent.filter((interest=>!1!==interest.isAccepted||interest.interestReceiverId!==oktaUserId2)),user2.interestsReceived=user2.interestsReceived.filter((interest=>!1!==interest.isAccepted||interest.interestSenderId!==oktaUserId1)),yield user1.save(),yield user2.save(),yield session.commitTransaction(),session.endSession(),res.status(200).json({success:!0,message:"Interest Cancelled!"})}catch(error){return yield session.abortTransaction(),session.endSession(),next(new CustomErrorResponse("Could not cancel interest. Please try later!",500))}}))))},43:(__unused_webpack_module,exports,__webpack_require__)=>{const tslib_1=__webpack_require__(752),asyncHandler=__webpack_require__(606),User=__webpack_require__(656),CustomErrorResponse=__webpack_require__(475);exports.getRecommendations=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){try{const currentUser=yield User.find({oktaUserId:req.params.oktaUserId});if(!currentUser)return next(new CustomErrorResponse("User not found!",404));const currentUserGender=currentUser[0].gender,currentUserAge=currentUser[0].age,currentUserReligion=currentUser[0].religion,recommendations=(yield User.find({gender:{$ne:currentUserGender}}).exec()).filter((profile=>("male"===currentUserGender?profile.age<=currentUserAge:profile.age>=currentUserAge)&&(!currentUserReligion||profile.religion===currentUserReligion)));if(console.log("No. of Recommendations: ",recommendations.length),recommendations.length<1)return void res.status(200).json({success:!1,message:"Recommendations not found. Please update your age and religion to get recommendations.",number:recommendations.length,data:recommendations});res.status(200).json({success:!0,message:"Recommendations found.",number:recommendations.length,data:recommendations})}catch(error){return next(new CustomErrorResponse("Error!. Please try later!",500))}}))))},964:(__unused_webpack_module,exports,__webpack_require__)=>{const tslib_1=__webpack_require__(752),asyncHandler=__webpack_require__(606),User=__webpack_require__(656),CustomErrorResponse=__webpack_require__(475);exports.searchProfiles=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){try{console.log("search route has been hit...");const currentUser=yield User.find({oktaUserId:req.params.oktaUserId});if(console.log(req.body),!currentUser)return next(new CustomErrorResponse("User not found!",404));const currentUserGender=currentUser[0].gender,searchCriteria=req.body;console.log(searchCriteria),Object.keys(searchCriteria).forEach((key=>{void 0!==searchCriteria[key]&&null!==searchCriteria[key]||delete searchCriteria[key]}));const{ageRange,city,country,heightRange,religion,marriageStatus,motherTongue,state}=searchCriteria,minAge=void 0===ageRange?21:ageRange[0],maxAge=void 0===ageRange?50:ageRange[1],minHeight=void 0===heightRange?122:heightRange[0],maxHeight=void 0===heightRange?214:heightRange[1],matchingProfiles=(yield User.find({gender:{$ne:currentUserGender}}).exec()).filter((profile=>!(!(profile.age>=minAge&&profile.age<=maxAge&&profile.height>=minHeight&&profile.height<=maxHeight)||city&&profile.location!==city||country&&profile.country!==country||motherTongue&&profile.motherTongue!==motherTongue||marriageStatus&&profile.marriageStatus!==marriageStatus||religion&&profile.religion!==religion||state&&profile.state!==state)));if(console.log("No. of Matches: ",matchingProfiles.length),matchingProfiles.length<1)return void res.status(200).json({success:!1,message:"Matches not found. Please adjust your search criteria",number:matchingProfiles.length,data:matchingProfiles});res.status(200).json({success:!0,message:"Matches found.",number:matchingProfiles.length,data:matchingProfiles})}catch(error){return next(new CustomErrorResponse("Error!. Please try later!",500))}}))))},35:(__unused_webpack_module,exports,__webpack_require__)=>{const tslib_1=__webpack_require__(752),asyncHandler=__webpack_require__(606),User=__webpack_require__(656),CustomErrorResponse=__webpack_require__(475);__webpack_require__(251);exports.toggleShortlist=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const shortlisterOktaId=req.query.shortlister,shortlisteeOktaId=req.query.shortlistee;console.log(shortlisterOktaId),console.log(shortlisteeOktaId);try{let shortlister=yield User.find({oktaUserId:shortlisterOktaId});shortlister=shortlister[0];const{shortlistedMatches}=shortlister;let shortlistee=yield User.find({oktaUserId:shortlisteeOktaId});shortlistee=shortlistee[0];const wasAlreadyShortlisted=shortlister.shortlistedMatches.some((oktaId=>oktaId===shortlisteeOktaId));shortlister.shortlistedMatches=wasAlreadyShortlisted?shortlister.shortlistedMatches.filter((oktaId=>oktaId!==shortlisteeOktaId)):[...shortlistedMatches,shortlisteeOktaId],yield shortlister.save();const message=wasAlreadyShortlisted?`${shortlistee.name} has been removed from your shortlist`:`${shortlistee.name} was added to your shortlisted profiles`;res.status(200).json({success:!0,message})}catch(error){return next(new CustomErrorResponse("Please try later",500))}}))))},151:(__unused_webpack_module,exports,__webpack_require__)=>{const tslib_1=__webpack_require__(752),asyncHandler=__webpack_require__(606),User=__webpack_require__(656),CustomErrorResponse=__webpack_require__(475),okta=__webpack_require__(251);function findUserByOktaId(oktaId){return tslib_1.__awaiter(this,void 0,void 0,(function*(){return yield User.find({oktaUserId:oktaId})}))}exports.oktaSignUp=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const client=new okta.Client({orgUrl:"https://dev-42684472.okta.com/",token:"00TW3soK2Eq883PaRVu5rjqRniqE6iaueZOivSe91P"}),body=req.body,response=yield client.createUser(body),mongoUser={oktaUserId:response.id,name:`${response.profile.firstName} ${response.profile.lastName}`,gender:response.profile.gender,email:response.profile.email},user=yield User.create(mongoUser);res.status(200).send({res:user})})))),exports.getUserProfile=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const oktaId=req.params.id,currentUser=yield findUserByOktaId(oktaId);if(!currentUser)return next(new CustomErrorResponse("User not found!",404));res.status(200).json({currentUser})})))),exports.uploadImageToMongoDb=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const imageUrl=req.body.imageUrlString,currentUserId=req.body.oktaUserId,currentUser=yield findUserByOktaId(currentUserId),imageUrls=currentUser[0].images;if(!currentUser)return next(new CustomErrorResponse("User not found!",404));yield User.updateOne({oktaUserId:currentUserId},{images:[...imageUrls,imageUrl]}),res.status(200).json({status:"success"})})))),exports.updateUserProfile=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const currentUserId=req.params.userId,body=req.body;return body?currentUserId?(yield User.updateOne({oktaUserId:currentUserId},{$set:body}),void res.status(200).json({success:!0,message:"Updated User successfully",data:"user"})):next(new CustomErrorResponse("Can't update data of non-existent user",400)):next(new CustomErrorResponse("req.body is empty",400))})))),exports.searchProfiles=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const searchCriteria=req.body;Object.keys(searchCriteria).forEach((key=>{void 0===searchCriteria[key]&&delete searchCriteria[key]}));let matchingProfiles=yield User.find({name:"john",age:{$gte:18}}).exec();if(matchingProfiles.length<1)return next(new CustomErrorResponse("Could not find matching profiles",400));res.status(200).json({success:!0,message:"Updated User successfully",data:matchingProfiles})})))),exports.deleteImage=asyncHandler(((req,res,next)=>tslib_1.__awaiter(void 0,void 0,void 0,(function*(){const currentUserOktaId=req.params.userId,imageArrayIndex=req.params.index,currentUserProfile=yield findUserByOktaId(currentUserOktaId);currentUserProfile[0].images.splice(imageArrayIndex,1),yield User.updateOne({oktaUserId:currentUserOktaId},{images:currentUserProfile[0].images}),res.status(200).json({success:!0,message:"Deleted user successfully",data:"user"}),res.status(400).json({success:!1,message:"Image is not deleted",error:err})}))))},606:module=>{module.exports=fn=>(req,res,next)=>{Promise.resolve(fn(req,res,next)).catch(next)}},60:(module,__unused_webpack_exports,__webpack_require__)=>{const ErrorResponse=__webpack_require__(475);module.exports=(err,req,res,next)=>{let error=Object.assign({},err);if(error.message=err.message,console.log(error),11e3===err.code){error=new ErrorResponse("Email / Phone already used for registration.",400)}if("E0000001"===err.code){error=new ErrorResponse("password: This password was found in a list of commonly used passwords. Please try another password.",400)}if("ValidationError"===err.name){const message=Object.values(err.errors).map((val=>val.message));console.log(message),error=new ErrorResponse(message.join(" & "),400)}res.json({success:!1,error:error.message||"Server Error"})}},656:(module,__unused_webpack_exports,__webpack_require__)=>{const mongoose=__webpack_require__(185),MessageSchema=new mongoose.Schema({messageSenderId:{type:String,trim:!0},messageReceiverId:{type:String,trim:!0},message:{type:String,trim:!0,maxlength:[500,"Message can not be more than 500 characters"]},isRead:{type:Boolean,default:!1},timeStamp:{type:Date,default:Date.now}}),UserSchema=new mongoose.Schema({name:{type:String,trim:!0,required:[!0,"Name is missing!"],maxlength:[50,"Name can not be more than 50 characters"]},gender:{type:String,required:[!0,"Gender is missing!"],trim:!0},email:{type:String,required:[!0,"Email is missing!"],unique:!0,match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please add a valid email"]},oktaUserId:{type:String,unique:!0,required:[!0,"Okta User Id is missing !"]},images:{type:[String],default:[]},aboutMe:{type:String,trim:!0,default:""},age:{type:Number,trim:!0,default:21},height:{type:Number,trim:!0,default:140},weight:{type:Number,trim:!0},physique:{type:String,default:"",trim:!0},motherTongue:{type:String,trim:!0,default:""},marriageStatus:{type:String,trim:!0,default:""},citizenship:{type:String,trim:!0,default:""},country:{type:String,trim:!0,default:""},state:{type:String,trim:!0,default:""},location:{type:String,trim:!0,default:""},eatingHabits:{type:String,trim:!0,default:""},smokingHabits:{type:String,trim:!0,default:""},drinkingHabits:{type:String,trim:!0,default:""},hobbies:{type:[String],default:[]},spokenLanguages:{type:[String],default:[]},employer:{type:String,default:""},income:{type:Number},occupation:{type:String,default:""},qualification:{type:String,default:""},aboutFamily:{type:String,default:""},brothers:{type:Number},familyStatus:{type:String,default:""},marriedBrothers:{type:Number},marriedSisters:{type:Number},sisters:{type:Number},dateOfBirth:{type:String,trim:!0,default:""},timeOfBirth:{type:String,trim:!0,default:""},gothram:{type:String,trim:!0,default:""},placeOfBirth:{type:String,trim:!0,default:""},religion:{type:String,trim:!0},zodiacSign:{type:String,trim:!0,default:""},partnerAgeRange:{type:[Number],default:[21,50]},partnerCountry:{type:String,default:""},partnerEatingHabits:{type:String,trim:!0,default:""},partnerHeightRange:{type:[Number],default:[]},partnerIncomeRange:{type:[Number],default:[]},partnerMaritalStatus:{type:String,trim:!0,default:""},partnerMotherTongue:{type:String,trim:!0,default:""},partnerReligion:{type:String,trim:!0,default:""},phone:{type:String,default:"",trim:!0,maxlength:[20,"Phone number can not be longer than 20 characters"]},createdAt:{type:Date,default:Date.now()},lastModifiedAt:{type:Date,default:Date.now},role:{type:String,default:"User",enum:["User","Admin"]},shortlistedMatches:{type:[String],default:[]},interestsReceived:[{interestSenderAge:{type:Number},interestSenderId:{type:String},interestSenderImage:{type:String},interestSenderName:{type:String},interestReceiverAge:{type:Number},interestReceiverId:{type:String},interestReceiverImage:{type:String},interestReceiverName:{type:String},isAccepted:{type:Boolean,default:!1},isRejected:{type:Boolean,default:!1},conversations:[MessageSchema]}],interestsSent:[{interestSenderAge:{type:Number},interestSenderId:{type:String},interestSenderImage:{type:String},interestSenderName:{type:String},interestReceiverAge:{type:Number},interestReceiverId:{type:String},interestReceiverImage:{type:String},interestReceiverName:{type:String},isAccepted:{type:Boolean,default:!1},isRejected:{type:Boolean,default:!1},conversations:[MessageSchema]}]});module.exports=mongoose.model("User",UserSchema)},483:(module,__unused_webpack_exports,__webpack_require__)=>{const express=__webpack_require__(860),{getAllUsersProfiles}=__webpack_require__(199),router=express.Router();router.route("/getallusers").get(getAllUsersProfiles),module.exports=router},373:(module,__unused_webpack_exports,__webpack_require__)=>{const express=__webpack_require__(860),{getMessages,sendMessage,markMessagesAsRead}=__webpack_require__(366),router=express.Router();router.route("/").post(sendMessage).put(markMessagesAsRead),router.route("/:oktaUserId").get(getMessages),module.exports=router},194:(module,__unused_webpack_exports,__webpack_require__)=>{const express=__webpack_require__(860),{acceptInterest,cancelInterest,declineInterest,sendInterest}=__webpack_require__(200),router=express.Router();router.route("/").post(sendInterest),router.route("/accept").put(acceptInterest),router.route("/cancel").put(cancelInterest),router.route("/decline").put(declineInterest),module.exports=router},521:(module,__unused_webpack_exports,__webpack_require__)=>{const router=__webpack_require__(860).Router(),{getRecommendations}=__webpack_require__(43);router.route("/:oktaUserId").get(getRecommendations),module.exports=router},97:(module,__unused_webpack_exports,__webpack_require__)=>{const router=__webpack_require__(860).Router(),{searchProfiles}=__webpack_require__(964);router.route("/:oktaUserId").post(searchProfiles),module.exports=router},255:(module,__unused_webpack_exports,__webpack_require__)=>{const router=__webpack_require__(860).Router(),{toggleShortlist}=__webpack_require__(35);router.route("/").put(toggleShortlist),module.exports=router},634:(module,__unused_webpack_exports,__webpack_require__)=>{const express=__webpack_require__(860),{getUserProfile,uploadImageToMongoDb,updateUserProfile,oktaSignUp,searchProfiles,deleteImage}=__webpack_require__(151),router=express.Router();router.route("/oktasignup").post(oktaSignUp),router.route("/userprofile/:id").get(getUserProfile),router.route("/imageupload").post(uploadImageToMongoDb),router.route("/:userId").put(updateUserProfile),router.route("/search").get(searchProfiles),router.route("/delete-image/:userId/:index").delete(deleteImage),router.route("/:userId").put(updateUserProfile),module.exports=router},475:module=>{class CustomErrorResponse extends Error{constructor(message,statusCode){super(message),this.statusCode=statusCode}}module.exports=CustomErrorResponse},251:module=>{"use strict";module.exports=require("@okta/okta-sdk-nodejs")},856:module=>{"use strict";module.exports=require("@sentry/node")},842:module=>{"use strict";module.exports=require("@sentry/tracing")},986:module=>{"use strict";module.exports=require("body-parser")},582:module=>{"use strict";module.exports=require("cors")},860:module=>{"use strict";module.exports=require("express")},185:module=>{"use strict";module.exports=require("mongoose")},752:module=>{"use strict";module.exports=require("tslib")}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}var __webpack_exports__={};(()=>{const cors=__webpack_require__(582),express=__webpack_require__(860),dbConnection=__webpack_require__(208),errorHandler=__webpack_require__(60),bodyParser=__webpack_require__(986),Sentry=__webpack_require__(856),Tracing=__webpack_require__(842);dbConnection();const app=express();Sentry.init({dsn:"https://e1d7d0bf5be74e7b99f42b24a991095a@o1408574.ingest.sentry.io/6744194",integrations:[new Sentry.Integrations.Http({tracing:!0}),new Tracing.Integrations.Express({app})],tracesSampleRate:1}),app.use(Sentry.Handlers.requestHandler()),app.use(Sentry.Handlers.tracingHandler()),app.use(cors()),app.use(express.json()),app.use(bodyParser.urlencoded({extended:!1})),app.use(bodyParser.json());const admin=__webpack_require__(483),conversations=__webpack_require__(373),interests=__webpack_require__(194),recommendations=__webpack_require__(521),search=__webpack_require__(97),toggleShortlist=__webpack_require__(255),users=__webpack_require__(634);app.use("/api/v1/admin",admin),app.use("/api/v1/conversations",conversations),app.use("/api/v1/interests",interests),app.use("/api/v1/recommendations",recommendations),app.use("/api/v1/search",search),app.use("/api/v1/toggleShortlist",toggleShortlist),app.use("/api/v1/users",users),console.log("mounting routes completed..."),app.use(Sentry.Handlers.errorHandler()),app.use(errorHandler);const server=app.listen(process.env.PORT||8e3,console.log(`Server is listening on port : ${process.env.PORT||8e3}\nMode: ${"production".toUpperCase()}`));process.on("unhandledRejection",((err,promise)=>{console.log(`Error: ${err.message}`),server.close((()=>process.exit(1)))}))})();var __webpack_export_target__=exports;for(var i in __webpack_exports__)__webpack_export_target__[i]=__webpack_exports__[i];__webpack_exports__.__esModule&&Object.defineProperty(__webpack_export_target__,"__esModule",{value:!0})})();
//# sourceMappingURL=main.js.map