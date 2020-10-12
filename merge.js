const fs = require("fs");
const glob = require("glob");
const { sortObj } = require("jsonabc");

glob("window-properties/{*,!(all)}.json", (err, files) => {
  if (err) {
    console.err("Error globin'");
  }

  let output = {};
  files.forEach((file) => {
    try {
      const buffer = fs.readFileSync(file);
      const data = JSON.parse(buffer);
      output = { ...output, ...data };
    } catch (err) {
      console.error(`Error parsing ${file}`, err);
    }
  });

  try {
    fs.writeFileSync(
      "window-properties/all.json",
      JSON.stringify(sortObj(output))
    );
  } catch (err) {
    console.error("Error writing file", err);
  }
});
