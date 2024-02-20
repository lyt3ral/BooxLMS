import { faker } from "@faker-js/faker";

import { db as prisma } from "@/server/db";

async function main() {
  const data = [
    {
      "title": "The Catcher in the Rye",
      "author": "J.D. Salinger",
      "genre": "Fiction"
    },
    {
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "genre": "Classic"
    },
    {
      "title": "1984",
      "author": "George Orwell",
      "genre": "Dystopian"
    },
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "genre": "Classic"
    },
    {
      "title": "Harry Potter and the Sorcerer's Stone",
      "author": "J.K. Rowling",
      "genre": "Fantasy"
    },
    {
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "genre": "Fantasy"
    },
    {
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "genre": "Classic"
    },
    {
      "title": "The Lord of the Rings",
      "author": "J.R.R. Tolkien",
      "genre": "Fantasy"
    },
    {
      "title": "The Hunger Games",
      "author": "Suzanne Collins",
      "genre": "Dystopian"
    },
    {
      "title": "The Da Vinci Code",
      "author": "Dan Brown",
      "genre": "Mystery"
    }
  ]
  

  // const books = Array.from({ length: 10 }).map(() => ({
  //   title: faker.word.words(3),
  //   author: faker.person.fullName(),
  //   genre: "comedy",
    // publishedAt: faker.date.past(),
    // count: Math.floor(Math.random() * 10),
  // }));

  const books = data.map((book) => ({
    publishedAt: faker.date.past(),
    count: Math.floor(Math.random() * 10),
    ...book,
  }));

  await prisma.book.createMany({
    data: books,
  });
}

main()
  .then(() => {
    console.log("Seeding complete ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
