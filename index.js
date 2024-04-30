import readLine from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { join } from "path";

const rl = readLine.createInterface({ input, output });

const contactsList = [];

console.log("--- ContactList ---");

const firstName = await rl.question("First Name: ");
const lastName = await rl.question("Last Name: ");

const newContact = {
  id: contactsList.length,
  firstName,
  lastName,
};

contactsList.push(newContact);

console.log("Contacts List:");

const formatedContactsList = contactsList
  .map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`)
  .join("\n");
console.log(formatedContactsList);

rl.close();
