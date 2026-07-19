import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const USERS = [
  {
    email: "alice@example.com",
    username: "alice_wonder",
    displayName: "Alice Chen",
    bio: "Coffee lover, hiker, and amateur photographer. Always down for an adventure!",
    location: "San Francisco, CA",
    interests: ["hiking", "photography", "coffee", "board games", "cooking"],
    lookingFor: ["friends", "hiking buddies", "book club"],
  },
  {
    email: "bob@example.com",
    username: "bob_builder",
    displayName: "Bob Martinez",
    bio: "Software engineer by day, D&D dungeon master by night. Let's roll some dice!",
    location: "Austin, TX",
    interests: ["gaming", "D&D", "coding", "tacos", "sci-fi"],
    lookingFor: ["gaming friends", "D&D group", "study partners"],
  },
  {
    email: "carol@example.com",
    username: "carol_sings",
    displayName: "Carol Johnson",
    bio: "Music teacher and vocalist. I sing in the shower and sometimes on stage.",
    location: "Nashville, TN",
    interests: ["music", "singing", "piano", "jazz", "yoga"],
    lookingFor: ["jam session friends", "music lovers", "yoga partners"],
  },
  {
    email: "dave@example.com",
    username: "dave_runs",
    displayName: "Dave Kim",
    bio: "Marathon runner and foodie. I run so I can eat more pasta.",
    location: "Portland, OR",
    interests: ["running", "cooking", "travel", "photography", "craft beer"],
    lookingFor: ["running partners", "foodie friends", "travel companions"],
  },
  {
    email: "eve@example.com",
    username: "eve_paints",
    displayName: "Eve Nakamura",
    bio: "Digital artist and cat mom. Creating one pixel at a time.",
    location: "Seattle, WA",
    interests: ["digital art", "cats", "anime", "gaming", "plant care"],
    lookingFor: ["art friends", "gaming buddies", "anime club"],
  },
];

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("Password123!", 10);

  for (const userData of USERS) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        username: userData.username,
        passwordHash,
        displayName: userData.displayName,
        bio: userData.bio,
        location: userData.location,
        isActive: true,
        profile: {
          create: {
            interests: userData.interests,
            lookingFor: userData.lookingFor,
            isDiscoverable: true,
          },
        },
      },
      include: { profile: true },
    });
    console.log(`  Upserted user: ${user.username} (${user.email})`);
  }

  // Create a sample friendship between alice and bob
  const alice = await prisma.user.findUnique({ where: { email: "alice@example.com" } });
  const bob = await prisma.user.findUnique({ where: { email: "bob@example.com" } });

  if (alice && bob) {
    await prisma.friendship.upsert({
      where: {
        userAId_userBId: { userAId: alice.id, userBId: bob.id },
      },
      update: {},
      create: {
        userAId: alice.id,
        userBId: bob.id,
      },
    });
    console.log("  Created friendship: alice <-> bob");
  }

  // Create a sample chat room
  if (alice && bob) {
    const chatRoom = await prisma.chatRoom.create({
      data: {
        name: "Alice & Bob",
        isGroup: false,
        members: {
          create: [
            { userId: alice.id },
            { userId: bob.id },
          ],
        },
        messages: {
          create: [
            {
              senderId: alice.id,
              content: "Hey Bob! Ready for some D&D this weekend?",
              type: "TEXT",
            },
            {
              senderId: bob.id,
              content: "Absolutely! I've got a great one-shot planned.",
              type: "TEXT",
            },
          ],
        },
      },
    });
    console.log(`  Created chat room: ${chatRoom.id}`);
  }

  // Create a sample group
  const group = await prisma.group.create({
    data: {
      name: "SF Hikers",
      description: "A group for hiking enthusiasts in the Bay Area",
      isPublic: true,
      creatorId: alice.id,
      members: {
        create: [
          { userId: alice.id, role: "OWNER" },
          { userId: bob.id, role: "MEMBER" },
        ],
      },
    },
  });
  console.log(`  Created group: ${group.name}`);

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
