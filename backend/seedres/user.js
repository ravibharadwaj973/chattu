import { faker } from "@faker-js/faker";
import UserModel from "../Models/user.js";

const createUser = async (numUsers) => {
  try {
    const userPromises = [];
    for (let i = 0; i < numUsers; i++) {
      const tempUser = UserModel.create({
        name: faker.person.fullName(),
        username: faker.internet.username(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      userPromises.push(tempUser);
    }
    await Promise.all(userPromises);
    console.log("User Created", numUsers);
    process.exit(1);
  } catch (error) {
    console.error("Error creating users:", error);
    process.exit(1);
  }
};
export { createUser };
