



/*{
aggeration piple: one stage 2 state and 3 stage

if you have 1000 document 



$lookup: {
    from: "authors",
    localField: "author_id",
    foreignField: "_id",
    as: "author_details"
  }
}


books collection
{
  "_id": 1,
  "title": "Node.js Tutorial",
  "author_id": 101
}
authors collection
{
  "_id": 101,
  "name": "John Smith",
  "country": "USA"
}



| Option         | Meaning             | Where do we find it?                              | Example              |
| -------------- | ------------------- | ------------------------------------------------- | -------------------- |
| `from`         | Where to search     | **Other collection name**                         | `authors` collection |
| `localField`   | My ID               | **Current collection (where aggregation starts)** | `books.author_id`    |
| `foreignField` | Other collection ID | **Collection mentioned in "from"**                | `authors._id`        |
| `as`           | Save result here    | **Create a new field in current document**        | `author_details`     |


4. as
as: "author_details"

Means: Put the result here


New book document:

BOOKS
--------------------

title: "MongoDB"

author_id: 100

author_details:
[
 {
   _id:100,
   name:"John Smith",
   age:35
 }
]


What happens before $addFields?

After $lookup, your data looks like this:

{
  "title": "MongoDB Tutorial",
  "author_id": 100,

  "author_details": [
    {
      "_id": 100,
      "name": "John Smith",
      "age": 35
    }
  ]
}

Notice:

author_details is an array ([ ]).

Why?

Because $lookup always returns an array, even if it finds only one result.


Now $addFields changes it:
$arrayElemAt: ["$author_details", 0]

Means:

$arrayElemAt = Get one item from an array

"$author_details" = Which array?
0 = Which position? (first item)



$project  : in your documents there are lot of feilds and you will tell me i will return only that feild
 
*/