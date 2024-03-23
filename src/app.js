const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://localhost:27017';
const dbname = "FifthTask";

//Note: Each section works if all the other sections are commented.

mongoClient.connect(connectionURL, async (error, data) => {
    if (error)
        return console.log("An error has occured");

    console.log("Connection Successful");
    const db = data.db(dbname);

    //InsertOne (2 times)
    for (let i = 0; i < 2; i++) {
        db.collection('users').insertOne({
            name: 'person' + (i + 1),
            age: 20 + (i)
        }, (error, data) => {
            if (error) {
                console.log('Error: Failed to insert data')
            }
        })
    }

    //InsertMany (10 times and 5 of them are age 27)
    db.collection('users').insertMany(
        [{
            name: "person3",
            age: 20
        },
        {
            name: "person4",
            age: 20
        },
        {
            name: "person5",
            age: 20
        },
        {
            name: "person6",
            age: 20
        },
        {
            name: "person7",
            age: 20
        },
        {
            name: "person8",
            age: 27
        },
        {
            name: "person9",
            age: 27
        },
        {
            name: "person10",
            age: 27
        },
        {
            name: "person11",
            age: 27
        },
        {
            name: "person12",
            age: 27
        },
    ])

    //Find Match documents who's age is 27
    db.collection('users').find({ age: 27 }).toArray((error, data) => {
        if (error)
            return console.log("Error: didn't find data ");

        console.log(data);
    })

    //Limit the result to 3 persons
    db.collection('users').find({ age: 27 }).limit(3).toArray((error, data) => {
        if (error)
            return console.log("Error: didn't find data ");

        console.log(data);
    })

    //Set the name & increment the age of the first 4 persons
    const documentsToUpdate = await db.collection('users').find().limit(4).toArray();
    for (const document of documentsToUpdate) {
        await db.collection("users").updateOne({_id: document._id},
        {
            $set: { name: "nameWasModifiedUsingSet" },
            $inc: { age: 20 }
        })
    }

    //Update 1 document by incrementing the age by 5
    db.collection("users").updateOne({ _id: mongodb.ObjectId("65fe20c44415c08c9f19caf6") }, {
        $inc: { age: 5 }
    }).then((document) => { console.log(document) }).catch((error) => { console.log(error) })

    //Update documents who's age is 20 by incrementing their age by 5 and print modified count
    db.collection("users").updateMany({ age: 20 }, {
        $inc: { age: 5 }
    }).then((document) => { console.log(document.modifiedCount) }).catch((error) => { console.log(error) })

    //Delete documents who's age is 27
    db.collection("users").deleteMany({ age: 27 }).then((document) => { console.log(document.deletedCount) }).catch((error) => { console.log(error) });

})


