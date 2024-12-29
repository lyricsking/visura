import readline from "readline";
import fs from "fs";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { Writable, WritableOptions } from "stream";
import User from "~/backend/models/user.model";
import { OptionModel } from "~/backend/models/option.server";
import { APP_NAME } from "~/app";
import { installPlugin } from "~/shared/utils/plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility for secure prompts
const askQuestion = (question: string, isPassword = false) => {
  const stdin = process.stdin;
  // let stdout: any = process.stdout;

  // if (isPassword) {
  const stdout = new Writable({
    write(
      chunk: Buffer | string,
      encoding: BufferEncoding,
      callback: () => void
    ): void {
      // Dont print anything if its password
      if (!isPassword) {
        process.stdout.write(chunk, encoding);
      }
      callback();
    },
  } as WritableOptions);
  // }

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    terminal: true,
  });

  return new Promise((resolve) => {
    process.stdout.write(question);

    rl.question(question, (answer: unknown) => {
      if (isPassword) {
        // rl.h = rl.history.slice(1);
        process.stdout.write("\n");
      }

      rl.close();
      resolve(answer);
    });
  });
};

const runSetup = async () => {
  console.log("Welcome to the Setup Wizard!\n");

  // Step 1: Gather inputs
  const dbUrl = await askQuestion("Enter Database URL: ");
  const appName = await askQuestion("Enter App Name: ");
  const firstName = await askQuestion("Enter First Name: ");
  const lastName = await askQuestion("Enter Last Name: ");
  const adminEmail = await askQuestion("Enter Admin email: ");
  const adminPassword = await askQuestion("Enter Admin password: ", true);

  console.log("\nValidating inputs...\n");

  // Step 2: Validate inputs
  if (
    !dbUrl ||
    !appName ||
    !firstName ||
    !lastName ||
    !adminEmail ||
    !adminPassword
  ) {
    console.error("All fields are required. Please restart the setup.");
    process.exit(1);
  }
  // Step 3: Validate database
  const isDbValid = await validateDatabase(dbUrl as string);
  if (!isDbValid) {
    process.exit(1);
  }

  // Step 4: Write Configuration
  updateEnvFile({
    DATABASE_URL: `"${String(dbUrl).replace(/"/g, '\\"')}"`,
    SETUP_COMPLETE: true,
  });

  // Step 5: Create default Admin User and Default App Options
  await User.deleteMany({});
  const user = await User.create({
    firstName,
    lastName,
    email: adminEmail,
    password: adminPassword,
  });

  // Clean options collection
  await OptionModel.deleteMany({});
  // Create default options
  await OptionModel.create({ name: APP_NAME, value: appName, autoload: true });

  // Step 6: Install default plugins
  const installedPath = await installPlugin(
    "http://localhost:3000/pluginTemp/blog.zip"
  );

  // Step 7: Finalize, Prevent running the setup again by locking it
  fs.renameSync("scripts/setup/setup.ts", "scripts/setup/setup.lock");
  console.log("Setup complete! You can now start your app.");
  process.exit(1);
};

const envFilePath = path.join(__dirname, "../../.env");

const updateEnvFile = (newEnvVars: {
  DATABASE_URL: string;
  SETUP_COMPLETE: boolean;
}) => {
  try {
    let existingContent = "";

    // Read existing .env file it exists
    if (fs.existsSync(envFilePath)) {
      existingContent = fs.readFileSync(envFilePath, "utf8");
    }

    // Parse existing variables
    const existingVars = existingContent
      .split("\n")
      .filter((line) => line.trim() && !line.startsWith("#"))
      .reduce((acc, line) => {
        const [key, value] = line.split("=");
        acc[key] = value;
        return acc;
      }, {} as any);

    // Merge new variables
    const mergedVars = { ...existingVars, ...newEnvVars };

    // Build updated content
    const updatedContent = Object.entries(mergedVars)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    // Write back to .env file
    fs.writeFileSync(envFilePath, updatedContent, "utf8");

    // Append the content
    console.log("Configuration saved to .env file.");
  } catch (error: any) {
    console.error("Failed to update .env file:", error.message);
    process.exit(1);
  }
};

const validateDatabase = async (dbUrl: string) => {
  console.log("Validating database connection...");

  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(dbUrl);
      console.log("Successfully connected to the database");
    }
    // await mongoose.disconnect();
    return true;
  } catch (error: any) {
    console.error("Database connection failed:", error.message);

    return false;
  }
};

runSetup();
