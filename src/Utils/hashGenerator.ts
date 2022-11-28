import { hashSync } from "bcrypt";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("token to hashed? ", (token) => {
  if (!token || token.trim() === "") {
    token = "default-token";
    console.warn("Using defualt token: default-token.");
  }

  rl.question("rounds to hash? ", (rounds) => {
    let finalRound = +rounds;
    if (!rounds || rounds.trim() === "") {
      finalRound = 10;
      console.warn("Using defualt rounds: 10.");
    }

    const generatedHash = hashSync(token, finalRound);
    console.log("Hash: " + generatedHash);
    rl.close();
  });
});
