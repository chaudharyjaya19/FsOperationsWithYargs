const fs = require('fs');
const yargs = require('yargs');

// Define the path to save filenames
const filenamesPath = 'filenames.txt';

// Define the command and options
yargs.command({
  command: 'write',
  describe: 'Write to a file',
  builder: {
    filename: {
      describe: 'File name',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    writeFile(argv.filename);
  }
});

yargs.parse();

function writeFile(filename) {
  // Check if the filenames file exists
  if (!fs.existsSync(filenamesPath)) {
    fs.writeFileSync(filenamesPath, '[]');
  }

  // Read the filenames from the file
  const filenames = JSON.parse(fs.readFileSync(filenamesPath, 'utf-8'));

  // Check if the filename already exists
  if (filenames.includes(filename)) {
    console.log('File already exists. Please provide a new filename.');
    return;
  }

  // Write to the new file
  fs.writeFileSync(filename, 'You are awesome');

  // Save the filename to the filenames file
  filenames.push(filename);
  fs.writeFileSync(filenamesPath, JSON.stringify(filenames));

  console.log(`File ${filename} has been created and written to.`);
}
