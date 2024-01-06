import * as fs from "fs";

const configFilePath = "./dist/db/config.js";

fs.readFile(configFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("ERROR READ FOLDER DIST `./dist/db/config.js`", err);
    return;
  }

  const updatedData = data.replace(
    'entities: ["src/models/*.model.ts"]',
    'entities: ["dist/models/*.model.js"]'
  );

  fs.writeFile(configFilePath, updatedData, "utf8", (err) => {
    if (err) {
      console.error("ERROR WRITE DIST `./dist/db/config.js`", err);
      return;
    }
    console.log("SUCCESS WRITE DIST `./dist/db/config.js`");
  });
});
