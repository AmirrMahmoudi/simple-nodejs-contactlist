import readLine from "readline/promises";
import { stdin as input, stdout as output } from "process";
import fs from "fs/promises";

const CONTACTS_LIST_FILE_PATH = "./data/contacts-list.json";

const rl = readLine.createInterface({ input, output });

const contactsList = [];

console.log("--- ContactList ---");

async function loadContacts() {
  try {
    const contactsListJSON = await fs.readFile(
      CONTACTS_LIST_FILE_PATH,
      "utf-8"
    );
    contactsList.push(...JSON.parse(contactsListJSON));
  } catch (error) {
    throw error;
  }
}
async function saveContacts() {
  try {
    const contactsListJSON = JSON.stringify(contactsList);
    await fs.writeFile(CONTACTS_LIST_FILE_PATH, contactsListJSON);
  } catch (error) {
    throw error;
  }
}

async function addNewContact() {
  const firstName = await rl.question("First Name: ");
  const lastName = await rl.question("Last Name: ");

  const lastContact = contactsList[contactsList.length - 1];
  const id = lastContact ? lastContact.id + 1 : 1;

  const newContact = {
    id,
    firstName,
    lastName,
  };

  contactsList.push(newContact);
  saveContacts();
}

async function deleteContact() {
  if (contactsList.length < 1) {
    console.error("There is no contact on the list");
    return;
  }

  showContactsList();

  const contactID = await rl.question("Delete ID: ");
  const contactIndex = contactsList.findIndex(
    ({ id }) => id === Number(contactID)
  );

  if (contactIndex < 0) {
    console.error("Invalid ID");
    return;
  }

  contactsList.splice(contactIndex, 1);
  saveContacts();
}

function showContactsList() {
  const formatedContactsList = contactsList
    .map(({ id, firstName, lastName }) => `#${id} ${firstName} ${lastName}`)
    .join("\n");

  console.log("Contacts List:");
  console.log(formatedContactsList);
}

function quit() {
  rl.close();
}

async function help() {
  console.log(
    "n: add new contact\nd: delete acontact\nl: show contacts list\nq: quit"
  );

  console.log("----------");
  const action = await rl.question("Enter your action:");

  if (action === "n") {
    await addNewContact();
  } else if (action === "d") {
    await deleteContact();
  } else if (action === "l") {
    showContactsList();
  } else {
    quit();
    return;
  }
  console.log("----------");
  help();
}

async function main() {
  await loadContacts();
  help();
}

await main();
