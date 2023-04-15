const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://admin:password@localhost:27017/";
const client = new MongoClient(uri);
var assert = require("assert");

const connect = async () => {
   try {
      MongoClient.connect(uri);
      console.log("Connect successfully!");
   } catch (error) {
      console.log(error);
   }
};

const insert = async (userRequest) => {
   try {
      const database = client.db("myProject");
      let counters = database.collection("counters");
      let users = database.collection("users");
      if (userRequest.email) {
         let emailChecking = await users.findOne({
            email: userRequest.email,
         });
         if (emailChecking) {
            throw new Error("email is used");
         }
      } else {
         throw new Error("email should not be null");
      }

      if(userRequest.username) {
         let usernameChecking = await users.findOne({
            username: userRequest.username,
         });
         if (usernameChecking) {
            throw new Error("username is used");
         }
      } else {
         throw new Error("username should not be null");
      }

      if(userRequest.phone) {
         let phoneChecking = await users.findOne({
            phone: userRequest.phone,
         });
         if (phoneChecking) {
            throw new Error("phone is used");
         }
      } else {
         throw new Error("phone should not be null");
      }

      let userId = await counters.findOneAndUpdate(
         { _id: "user_id" },
         { $inc: { seq: 1 } },
         { upsert: true, returnOriginal: false }
      );

      if (!userId.value) {
         userId = await counters.findOneAndUpdate(
            { _id: "user_id" },
            { $inc: { seq: 1 } },
            { upsert: true, returnOriginal: false }
         );
      }
      const filter = { user_id: userId.value.seq };
      let userUtil = {
         user_id: userId.value.seq,
         username: userRequest.username,
         email: userRequest.email,
         password: userRequest.password,
         phone: userRequest.phone
      };

      await users.insertOne(userUtil);
      let userResponse = await users.findOne(filter);
      return userResponse;
   } catch (error) {
      throw new Error(error.message);
   }
};

const findOneByUsername = async (username) => {
   try {
      const database = client.db("myProject");
      let users = database.collection("users");

      const query = { username: username };
      let currentUser = await users.findOne(query);
      if (!currentUser) {
         throw new Error("User is not existed!");
      }
      return currentUser;
   } catch (error) {
      throw new Error(error.message);
   }
};

const findOneById = async (userId) => {
   try {
      const database = client.db("myProject");
      let users = database.collection("users");

      const query = { user_id: userId };
      let currentUser = await users.findOne(query);
      if (!currentUser) {
         throw new Error("User is not existed!");
      }
      return currentUser;
   } catch (error) {
      throw new Error(error.message);
   }
};

const findOneByPhone = async (phone) => {
   try {
      const database = client.db("myProject");
      let users = database.collection("users");
      console.log(phone);
      const query = { phone: phone };
      let currentUser = await users.findOne(query);
      if (!currentUser) {
         throw new Error("User is not existed!");
      }
      return currentUser;
   } catch (error) {
      throw new Error(error.message);
   }
};

const findAll = async () => {
   try {
      const database = client.db("myProject");
      let users = database.collection("users");

      let userList = await users.find({}).toArray();
      return userList;
   } catch (error) {
      throw new Error(error.message);
   }
};

const update = async (userId, userRequest) => {
   try {
      const database = client.db("myProject");
      let users = database.collection("users");

      const filter = { user_id: userId };
      let currentUser = await users.findOne(filter);
      if (!currentUser) {
         throw new Error("User is not existed!");
      }

      if (userRequest.phone) {
         let phoneChecking = await users.findOne({
            phone: userRequest.phone,
         });
         if (phoneChecking) {
            throw new Error("phone is used");
         }
      }
      if (userRequest.username) {
         let usernameChecking = await users.findOne({
            username: userRequest.username,
         });
         if (usernameChecking) {
            throw new Error("username is used");
         }
         currentUser.username = userRequest.username;
      }
      if (userRequest.password) {
         currentUser.password = userRequest.password;
      }
      if (userRequest.email) {
         let emailChecking = await users.findOne({
            email: userRequest.email
         });
         if (emailChecking) {
            throw new Error("email is used");
         }
         currentUser.email = userRequest.email;
      }
      const update = { $set: currentUser };
      await users.updateOne(filter, update);

      let userResponse = await users.findOne(filter);
      return userResponse;
   } catch (error) {
      throw new Error(error.message);
   }
};

const deleteOne = async (userId) => {
   try {
      const database = client.db("myProject");
      let users = database.collection("users");

      const filter = { user_id: userId };
      let currentUser = await users.findOne(filter);
      if (!currentUser) {
         throw new Error("User is not existed!");
      }
      await users.deleteOne(filter);
      return "Delete Successfully";
   } catch (error) {
      throw new Error(error.message);
   }
};

const insertList = async (userList) => {
   try {
      const database = client.db("myProject");
      let counters = database.collection("counters");
      let users = database.collection("users");
      let userListResponse = [];
      for (let user of userList) {
         let userId = await counters.findOneAndUpdate(
            { _id: "user_id" },
            { $inc: { seq: 1 } },
            { upsert: true, returnOriginal: false }
         );

         if (!userId.value) {
            userId = await counters.findOneAndUpdate(
               { _id: "user_id" },
               { $inc: { seq: 1 } },
               { upsert: true, returnOriginal: false }
            );
         }

         const filter = { user_id: userId.value.seq };
         let userUtil = {
            user_id: userId.value.seq,
            username: user.username,
            email: user.email,
            password: user.password,
         };
         await users.insertOne(userUtil);
         let userResponse = await users.findOne(filter);
         userListResponse.push(userResponse);
      }
      return userListResponse;
   } catch (error) {
      throw new Error(error.message);
   }
};

module.exports = {
   connect,
   insert,
   findOneById,
   findAll,
   findOneByUsername,
   update,
   deleteOne,
   insertList,
   findOneByPhone
};
