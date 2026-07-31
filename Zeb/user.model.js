/*{
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



*/