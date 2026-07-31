const reviewSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Client
    required: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Consultant or Translator
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

/*

                   +------------------+
                   |      User        |
                   +------------------+
                   | _id              |
                   | name             |
                   | email            |
                   | role             | --> client | consultant | translator
                   +--------+---------+
                            |
            +---------------+---------------+
            |                               |
            |                               |
 +----------v-----------+      +------------v-----------+
 | Consultant Profile   |      | Translator Profile     |
 +----------------------+      +------------------------+
 | userId (FK)          |      | userId (FK)            |
 | expertise            |      | languages              |
 | hourlyRate           |      | translationRate        |
 +----------------------+      +------------------------+

                            |
                            |
                   +--------v---------+
                   |     Service      |
                   +------------------+
                   | _id              |
                   | providerId (FK)  |
                   | type             | --> consultant | translator
                   | title            |
                   | price            |
                   +--------+---------+
                            |
                            |
                   +--------v---------+
                   |      Order       |
                   +------------------+
                   | _id              |
                   | clientId (FK)    |
                   | providerId (FK)  |
                   | serviceId (FK)   |
                   | status           |
                   +--------+---------+
                            |
                            |
                   +--------v---------+
                   |      Review      |
                   +------------------+
                   | _id              |
                   | orderId (FK)     |
                   | reviewerId (FK)  | --> Client
                   | providerId (FK)  | --> Consultant/Translator
                   | rating (1-5)     |
                   | comment          |
                   | createdAt        |
                   +------------------+

                   */