// const Book = require("../../models/Book");

// const postAddBook = async (req, res) => {
//   try {
//     const {
//       name,
//       category,
//       author,
//       noOfPages: numberOfPages,
//       description,
//     } = req.body;

//     const book = await Book.create({
//       name,
//       category,
//       author,
//       numberOfPages: numberOfPages,
//       description,
//     });
//     res.status(201).json({ message: "Book adddes successfully", book });
//   } catch (err) {
//     console.log("Error adding book", err);
//     res
//       .status(500)
//       .json({
//         message:
//           "An error occurred while adding the book. Please try again later.",
//       });
//   }
// };

// module.exports = postAddBook;
